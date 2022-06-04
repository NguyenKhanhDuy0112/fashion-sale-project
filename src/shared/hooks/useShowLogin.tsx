import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useShowLogin() {
    const show = useSelector((state:RootState) => state.loginForm.show)
    return show;
}

export default useShowLogin;