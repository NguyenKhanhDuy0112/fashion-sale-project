import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSnackbar from "../../hooks/useSnackbar";
import { hideSnackbar } from "../../../modules/snackbar/snackbarSlice";

interface SnackbarProps {
    text: string,
    show: boolean,
}

function Snackbar(props: SnackbarProps) {
    const { text, show } = props
    const snackbar = useSnackbar()
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(hideSnackbar())
        }, snackbar.delay)
    }, [snackbar])

    return (
        <div className={`snackbar ${show ? 'active' : ''}`}>
            <p className="snackbar__text mb-0">
                {text}
            </p>
        </div>
    );
}

export default Snackbar;