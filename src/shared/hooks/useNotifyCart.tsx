import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useNotifyCart() {
    const show = useSelector((state:RootState) => state.notifyCart)
    return show;
}

export default useNotifyCart;