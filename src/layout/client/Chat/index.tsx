import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { hideChat, showChat } from "../../../modules/chat/chatSlice";
import useChat from "../../../shared/hooks/useChat";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import ChatAdmin from "./ChatAdmin";
import ChatClient from "./ChatClient";

function Chat() {
    const currentUser = useCurrentUser()
    const [expand, setExpand] = useState<boolean>(false)
    const toggleChat = useChat()
    const dispatch = useDispatch()

    const handleCloseChat = () => {
        dispatch(hideChat())
        setExpand(false)
    }

    return (
        <div className="chat">
            <button onClick={() => dispatch(showChat())} className="chat__btn">
                <span className="chat__btn-icon me-1">
                    <FaRegComment />
                </span>
                Chat
            </button>
            {currentUser.isAdmin === 1 ?
                <ChatAdmin
                    onCloseChat={handleCloseChat}
                    
                    expand={expand}
                    onExpand={() => setExpand(!expand)}
                />
                :
                <ChatClient/>
            }
        </div>
    );
}

export default Chat;