
interface Props{
    status: string,
    type: string
}
function Status(props: Props) {
    const {type, status} = props
    return (
        <>
            <small className={`status status-${type}`}>{status}</small>
        </>
    );
}

export default Status;