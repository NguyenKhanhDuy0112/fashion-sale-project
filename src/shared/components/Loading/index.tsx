import { Spinner } from "react-bootstrap";

interface LoadingProps{
    show: boolean
}
function Loading(props: LoadingProps) {
    const { show } = props
    return (
        <div className={`loading ${show ? 'active' : ''}`}>
            <div className="loading__overlay"></div>
            <div className="loading__content">
                <Spinner animation="border" variant="secondary" />
            </div>
        </div>
    );
}

export default Loading;