import { useEffect, useState } from "react";
import Moment from "react-moment";
import { User } from "../../../shared/interfaces";

interface ChatAccountProps {
    user: User,
    conversationId: string
    onConversation: (id: string, user: User) => void,
    onlineUsers: any,
}

function ChatAccount(props: ChatAccountProps) {
    const { user, onConversation, conversationId, onlineUsers } = props
    const [isOnline, setIsOnline] = useState<boolean>()

    useEffect(() => {
        const find = onlineUsers.find((u:any) => u.user._id === user._id)
        setIsOnline(find)
    },[onlineUsers])
    
    return (
        <div className="chat__account" onClick={() => onConversation(conversationId, user)}>
            <div className="chat__account-wrapper px-3 py-2">
                <div className="d-flex">
                    <div className="chat__account-img me-2">
                        <img src={user.avatar} alt="" />
                        {isOnline && <span className="chat__account-img-online"></span>}
                    </div>
                    <div className="chat__account-body">
                        <h5 className="chat__account-name">
                            {user.name}
                        </h5>
                        <p className="mb-0 chat__account-message">
                            Có bảo hành không shop?
                        </p>
                    </div>
                </div>
                <div className="chat__account-time">
                    <span>
                       {!isOnline &&  <Moment fromNow>{user.updatedAt ? new Date(user.updatedAt) : new Date()}</Moment>}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChatAccount;