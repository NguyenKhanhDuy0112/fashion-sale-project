import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useChat() {
    const show = useSelector((state:RootState) => state.chat.show)
    return show;
}

export default useChat;