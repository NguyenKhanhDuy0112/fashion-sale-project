import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useLoading() {
    const show = useSelector((state:RootState) => state.loading.show)
    return show;
}

export default useLoading;