import { getTime } from "../../../shared/helpers";
import { Message, User } from "../../../shared/interfaces";

interface ChatReceiveProps {
    message: Message,
    user?: User
}

function ChatReceive(props: ChatReceiveProps) {
    const { message, user } = props

    return (
        <div className="chat__box-content-body-receive">
            <div
                className="chat__box-content-body-receive-avatar"
                style={{ backgroundImage: `url(${user?.avatar})` }}
            >

            </div>
            <div className="ms-2 me-4" style={{ flex: 1 }}>
                <div className="chat__box-content-body-receive-text">
                    {message.text}
                </div>
                <small className="chat__box-content-body-receive-time">
                    {getTime(new Date(message.createdAt))}
                </small>
            </div>
        </div>
    );
}

export default ChatReceive;