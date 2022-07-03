import ChatReceive from "./ChatReceive";
import ChatSend from "./ChatSend";
import { AiOutlinePicture } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import { Message, User } from "../../../shared/interfaces";
import { useEffect, useRef, useState } from "react";
import Moment from "react-moment";

interface ChatContentProps {
    user?: User,
    messages?: any,
    conversationId: any
    socket: any,
    receiverId: any,
    onlineUsers: any,
    onMessage: (message: Message) => void
}

function ChatContent(props: ChatContentProps) {
    const { user, messages, socket, receiverId, conversationId, onMessage, onlineUsers } = props
    const currentUser = useCurrentUser()
    const [value, setValue] = useState<string>("")
    const scrollBottom = useRef<any>(null)
    const [messagesData, setMessagesData] = useState<Message[]>()
    const [isOnline, setIsOnline] = useState<boolean>(false)

    useEffect(() => {
        if (onlineUsers) {
            const find = onlineUsers.find((u: any) =>  u.user._id === receiverId)
            setIsOnline(find)
        }

    }, [onlineUsers])

    useEffect(() => {
        setMessagesData(messages)
    }, [messages])

    const handleSendMessage = () => {
        if (socket) {
            const message = {
                conversationId: conversationId,
                sender: currentUser._id ? currentUser._id : "",
                receiver: receiverId,
                text: value
            }

            socket.emit("sendMessage", message)
            onMessage(
                {
                    conversationId: message.conversationId,
                    sender: message.sender,
                    text: message.text,
                    createdAt: Date.now()
                }
            )

        }
        setValue("")

    }

    useEffect(() => {
        scrollBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesData])

    return (
        <div className={`chat__box-content w-100 position-relative ${currentUser.isAdmin === 0 ? '' : 'admin'}`}>
            <div className="chat__box-content-header px-3 py-2">
                <div className="position-relative">
                    <div
                        style={{ backgroundImage: `url(${user?.avatar})` }}
                        className="chat__box-content-header-avatar"
                    >
                    </div>
                    {isOnline && <span className="chat__box-content-header-online"></span>}
                </div>
                <div className="ms-2">
                    <h5 className="chat__box-content-header-name">
                        {user?.name}
                    </h5>
                    <small className="chat__box-content-header-status">
                        {!isOnline
                            ?
                            <Moment fromNow>
                                {(user && user.updatedAt) ? new Date(user.updatedAt) : new Date()}
                            </Moment>
                            : 'online'
                        }
                    </small>
                </div>
            </div>
            <div className="chat__box-content-body px-2 py-2">
                <div className="d-flex flex-column justify-content-end" style={{ minHeight: "100%" }}>
                    {messagesData && messagesData.map((message: Message, index: number) => {
                        const valid = message.sender === currentUser._id

                        return valid
                            ?
                            <ChatSend key={index} message={message} />
                            :
                            <ChatReceive key={index} user={user} message={message} />

                    })}
                </div>
                <div ref={scrollBottom} className="scroll-bottom"></div>
            </div>

            <div className="chat__box-content-footer px-3 py-2">
                <label className="chat__box-content-footer-file me-2">
                    <span className="chat__box-content-footer-file-icon">
                        <AiOutlinePicture color="#0B74E5" size={22} />
                    </span>
                    <input multiple accept="image/*" type="file" className="chat__box-content-footer-file-input" />
                </label>
                <div className="chat__box-content-footer-send">
                    <textarea
                        className="chat__box-content-footer-send-input"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    >

                    </textarea>
                    <span onClick={handleSendMessage} className="chat__box-content-footer-send-icon">
                        <IoPaperPlaneOutline
                            size={20}
                            color={`${value !== "" ? "#0B74E5" : "#C4C4CF"}`}
                            style={{ transform: `rotate(45deg)` }}
                        />
                    </span>
                </div>
            </div>

        </div>
    );
}

export default ChatContent;