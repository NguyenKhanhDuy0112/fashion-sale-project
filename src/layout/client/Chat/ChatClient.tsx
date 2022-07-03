import { useEffect, useRef, useState } from "react";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import { Message, User } from "../../../shared/interfaces";
import ChatContent from "./ChatContent";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import useChat from "../../../shared/hooks/useChat";

function ChatClient() {
    const currentUser = useCurrentUser()
    const [conversation, setConversation] = useState<{ id: string, user: User }>()
    const [messages, setMessages] = useState<any>()
    const socket = useRef<any>()
    const [arrivalMessage, setArrivalMessage] = useState<Message>()
    const [onlineUsers, setOnlineUsers] = useState<{userId:string, socketId: string}[]>()
    const dispatch = useDispatch()
    const showChat = useChat()

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getUsers", (users: { userId: string, socketId: string }[]) => {
            setOnlineUsers(users)
        })
        socket.current.on("getMessage", (message: Message) => {
            if (message) {
                setArrivalMessage(message)
            }
        })
    }, [])

    useEffect(() => {
        console.log("Arrival message: ", arrivalMessage)
        setMessages((prev: any) => {
            if (prev && arrivalMessage) {
                const newMessage = {
                    conversationId: arrivalMessage.conversationId,
                    messages: [...prev.messages, arrivalMessage]
                }

                return newMessage
            }
            return prev
        });
    }, [arrivalMessage]);

    useEffect(() => {
        if (currentUser._id !== "") {
            socket.current.emit("addUser", currentUser._id)
        }

    }, [currentUser])

    useEffect(() => {
        if (currentUser._id !== "") {
            socket.current.emit("getConversationByTwoUser",
                {
                    senderId: currentUser._id,
                    receiverId: "62a04455df9f799146b97357"
                }
            )
            socket.current.on("getConversationByTwoUser", (data: any) => {
                if (!data) {
                    socket.current.on("addConversation",
                        {
                            senderId: currentUser._id,
                            receiverId: "62a04455df9f799146b97357"
                        }
                    )
                }

                socket.current.emit("getMessages",
                    {
                        userId: currentUser._id,
                        conversationId: data._id
                    }
                )

                if (data.members[0]._id === currentUser._id) {
                    setConversation({ id: data._id, user: data.members[1] })
                }
                else {
                    setConversation({ id: data._id, user: data.members[0] })
                }

            })
        }

    }, [currentUser, showChat])

    useEffect(() => {
        socket.current.on("getMessages", (data: any) => {
            setMessages({ conversationId: data.conversationId, messages: data.messages })
        })
    }, [conversation])

    return (
        <>
            <div className={`chat__box ${!showChat && 'd-none'}`}>
                <div className="d-flex h-100" style={{ flex: 1, height: "90%" }}>
                    <ChatContent
                        onlineUsers={onlineUsers}
                        conversationId={conversation?.id}
                        receiverId={conversation?.user._id}
                        messages={messages?.messages}
                        onMessage={(message: any) => setMessages((prev: any) => ({ conversationId: prev.conversationId, messages: [...prev.messages, message] }))}
                        user={conversation?.user}
                        socket={socket.current}
                    />
                </div>
            </div>
        </>
    );
}

export default ChatClient;