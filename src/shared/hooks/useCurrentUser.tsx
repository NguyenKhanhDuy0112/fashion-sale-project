import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useCurrentUser() {
    const currentUser = useSelector((state:RootState) => state.user.currentUser)
    return currentUser;
}

export default useCurrentUser;