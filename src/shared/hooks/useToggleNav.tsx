import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useToggleNav() {
    const toggleNav = useSelector((state:RootState) => state.toggleNav.current)
    return toggleNav;
}

export default useToggleNav;