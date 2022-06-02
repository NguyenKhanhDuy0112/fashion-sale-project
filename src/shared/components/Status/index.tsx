import { useEffect, useState } from "react";

interface Props{
    status: number,
}

interface Status{
    text: string,
    type: string
}

function Status(props: Props) {
    const { status } = props
    const [type, setType] = useState<Status>({text: 'Chờ xử lý', type: "pending"})
    
    useEffect(() => {
        if(status === 1){
            setType({text: 'Chờ xử lý', type: "pending"})
        }
        else if(status === 2){
            setType({text: 'Đang giao', type: "processing"})
        }
        else if(status === 3){
            setType({text: 'Giao hàng thành công', type: "delivered"})
        }
        else{
            setType({text: 'Đã hủy', type: "cancel"})
        }
    },[status])
    
    return (
        <>
            <small className={`status status-${type.type}`}>{type.text}</small>
        </>
    );
}

export default Status;