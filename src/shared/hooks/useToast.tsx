import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useToast() {
    const toast = useSelector((state:RootState) => state.toast)
    return toast;
}

export default useToast;