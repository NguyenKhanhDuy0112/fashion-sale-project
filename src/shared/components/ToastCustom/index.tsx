import { useEffect } from "react";
import { FiCheck } from "react-icons/fi"
import { useDispatch } from "react-redux";
import { hideToast } from "../../../modules/toast/toastSlice";
import useToast from "../../hooks/useToast";
import { CgDanger } from "react-icons/cg"

interface ToastProps {
    text: string,
    show: boolean,
    type: "success" | "error" | "warning",
}

function ToastCustom(props: ToastProps) {
    const { text, type, show } = props
    const toast = useToast()
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(hideToast())
        },toast.delay)
    },[toast])

    return (
        <div className={`toastCustom ${show ? 'active' : ''}`}>
            <div className={`toastCustom__${type} p-3`}>
                <span className={`toastCustom__${type}-icon p-1`}>
                    {type === "success" && <FiCheck color="#fff" size={25} />}
                    {type === "error" && <CgDanger color = "#fff" size = {25}/>}
                </span>
                <p className={`toastCustom__${type}-text mb-0 mt-2`}>
                    {text}
                </p>
            </div>
        </div>
    );
}

export default ToastCustom;