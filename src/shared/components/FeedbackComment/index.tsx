import Moment from "react-moment";

interface Props {
    name?: string,
    avatar?: string,
    content?: string,
    createdAt?: Date,
}

function FeedbackComment(props: Props) {
    const { name, avatar, content, createdAt } = props
    return (
        <div className="feedbackComment d-flex align-items-start mt-3">
            <div
                className="feedbackComment__img"
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>
            <div className="feedbackComment__content">
                <div className="d-flex align-items-center">
                    <h6 className="feedbackComment__content-name mb-0 me-2">
                        {name}
                    </h6>
                    <small className="feedbackComment__content-date">
                        <Moment fromNow>{createdAt}</Moment>
                    </small>
                </div>
                <p className="feedbackComment__content-text mb-0">
                    {content}
                </p>
            </div>
        </div>
    );
}

export default FeedbackComment;