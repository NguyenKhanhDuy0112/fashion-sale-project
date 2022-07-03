import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgArrowsExpandRight } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import { Message, User } from "../../../shared/interfaces";
import ChatAccount from "./ChatAccount";
import ChatContent from "./ChatContent";
import { io } from "socket.io-client";
import useChat from "../../../shared/hooks/useChat";

interface ChatAdminProps {
    onCloseChat: () => void,
    expand: boolean,
    onExpand: () => void,
}

function ChatAdmin(props: ChatAdminProps) {
    const { onCloseChat, expand, onExpand } = props
    const currentUser = useCurrentUser()
    const [conversations, setConversations] = useState<any>()
    const [currentConversation, setCurrentConversation] = useState<any>()
    const [messages, setMessages] = useState<any>()
    const socket = useRef<any>()
    const [arrivalMessage, setArrivalMessage] = useState<any>()
    const [currentMessage, setCurrentMessage] = useState<Message[]>()
    const [onlineUsers, setOnlineUsers] = useState<{ userId: string, socketId: string }[]>()
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
        setMessages((prev: any) => {

            if (prev && arrivalMessage) {
                const message = messages.find((me: any) => currentConversation && me.conversationId === currentConversation.id)
                const findIdx = messages.findIndex((me: any) => currentConversation && me.conversationId === currentConversation.id)

                const newMessage = {
                    conversationId: arrivalMessage.conversationId,
                    messages: [...message.messages, arrivalMessage]
                }

                const newMessages = messages.splice(findIdx, 1, newMessage)
                return newMessages

            }
            return undefined
        })
    }, [arrivalMessage]);

    useEffect(() => {
        if (currentUser._id !== "") {
            socket.current.emit("addUser", currentUser._id)
        }

    }, [currentUser])

    useEffect(() => {
        if (socket) {
            socket.current.emit("getConversationsByUser", currentUser._id)
        }
    }, [currentUser, onlineUsers])

    useEffect(() => {
        if (socket) {
            socket.current.on("getConversationsByUser", (data: any) => {
                setConversations(data)
            })
        }
    }, [currentUser, currentConversation, onlineUsers])

    useEffect(() => {
        if (messages) {
            const findMessages = messages.find((me: any) => me.conversationId === currentConversation.id)
            setCurrentMessage(findMessages.messages)
        }

    }, [messages])

    const handleGetMessages = async (id: string, user: User) => {
        setCurrentConversation({ id: id, user })
        await socket.current.emit("getConversationsByUser", currentUser._id)
        await socket.current.emit("getMessages", { userId: currentUser._id, conversationId: id })

        await socket.current.on("getMessages",async (data: any) => {
            console.log("Messages: ", data)
            await setMessages((prev: any) => {
                if (data) {
                    if (prev) {
                        return [...prev, { conversationId: data.conversationId, messages: data.messages }]
                    }
                    else {
                        return [{ conversationId: data.conversationId, messages: data.messages }]
                    }
                }
                else {
                    return undefined
                }
            })
        })
    }

    return (
        <div className={`chat__box ${expand ? 'active' : ''} ${!showChat && 'd-none'}`}>
            <div className="chat__box-header p-3">
                <div className="chat__box-header-user">
                    <img src={currentUser.avatar} className="chat__box-header-user-avatar me-2" alt="" />
                    <h5 className="chat__box-header-user-name">
                        {currentUser.name}
                    </h5>
                </div>
                <div className="chat__box-header-action">
                    <span onClick={onExpand} className="chat__box-header-action-btn me-1">
                        <CgArrowsExpandRight size={20} />
                    </span>
                    <span onClick={onCloseChat} className="chat__box-header-action-btn">
                        <IoCloseOutline size={28} />
                    </span>
                </div>
            </div>
            <div className="d-flex" style={{ flex: 1, height: "90%" }}>
                <div className="chat__box-sidebar">
                    <div className="px-3 py-2 chat__box-sidebar-search-wrapper">
                        <div className="chat__box-sidebar-search">
                            <label className="chat__box-sidebar-search-label w-100">
                                <span className="chat__box-sidebar-search-icon">
                                    <BiSearch />
                                </span>
                                <input
                                    placeholder="Tìm theo người dùng..."
                                    className="chat__box-sidebar-search-input"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="chat__box-sidebar-body">
                        {conversations && conversations.map((conversation: any) => {
                            const user: User = conversation.members[0]._id !== currentUser._id ? conversation.members[0] : conversation.members[1]
                            return (
                                <ChatAccount
                                    onlineUsers={onlineUsers}
                                    conversationId={conversation._id}
                                    onConversation={(id) => handleGetMessages(id, user)}
                                    key={conversation._id}
                                    user={user}
                                />
                            )
                        })}
                    </div>
                </div>
                {currentConversation
                    &&
                    <ChatContent
                        onlineUsers = {onlineUsers}
                        onMessage={(message: any) => setArrivalMessage(message)}
                        conversationId={currentConversation.id}
                        receiverId={currentConversation.user._id}
                        socket={socket.current}
                        messages={currentMessage}
                        user={currentConversation.user}
                    />
                }

            </div>
        </div>
    );
}

export default ChatAdmin;