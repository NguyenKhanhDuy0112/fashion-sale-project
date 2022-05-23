import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useSnackbar() {
    const snackbar = useSelector((state:RootState) => state.snackbar)
    return snackbar;
}

export default useSnackbar;