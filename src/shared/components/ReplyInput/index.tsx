import React, { KeyboardEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";

interface Props {
    show: boolean,
    onChangeReply: (value: string) => void
}

function ReplyInput(props: Props) {
    const { show, onChangeReply } = props;
    const [valueInput, setValueInput] = useState('')

    const handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueInput(e.target.value)
    }

    return (
        <div className={`comment__content-reply ${show ? 'active' : ''}`}>
            <div 
                className="comment__content-reply-img" 
                style={{ backgroundImage: `url(https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png)` }}
            ></div>
            <div className="comment__content-reply-input mt-2">
                <textarea 
                    onChange={(e) => handleChangeReply(e)} 
                    value={valueInput} 
                    placeholder="Viết câu trả lời" 
                    className="comment__content-reply-input-child px-3 py-2" 
                    rows={1}
                   
                >
                </textarea>
                <span onClick={() => onChangeReply(valueInput)}className="comment__content-reply-input-icon cursor-pointer">
                    <IoMdSend 
                        size={18} 
                        color={`${valueInput !== '' ? '#0D5CB6' : '#C7C7C7'}`} 
                    />
                </span>
            </div>
        </div>
    );
}

export default ReplyInput;