import { getTime } from "../../../shared/helpers";
import { Message } from "../../../shared/interfaces";

interface ChatSendProps{
    message: Message
}

function ChatSend(props: ChatSendProps) {
    const { message } = props
    return (
        <div className="chat__box-content-body-send">
            <div>
                <div className="chat__box-content-body-send-text ms-4">
                    {message.text}
                </div>
                <small className="chat__box-content-body-receive-time d-block text-end">
                    {getTime(new Date(message.createdAt))}
                </small>
            </div>
        </div>
    );
}

export default ChatSend;