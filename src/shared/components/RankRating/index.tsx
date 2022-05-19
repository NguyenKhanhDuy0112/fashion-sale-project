import Rating from "../Rating";

function RankRating() {
    return (
        <article className="rankRating">
            <div className="rankRating__general">
                <h2 className="rankRating__general-average mb-0">4.9</h2>
                <div className="ms-2">
                    <Rating color="#FFD52E" distance={1} size={17} stars={5} colorSub="#DDDDE3" />
                    <p className="rankRating__general-number mb-0 mt-1">7 nhận xét</p>
                </div>
            </div>
            <div className="rankRating__data">
                <div className="d-flex flex-column justify-content-start">
                    <div className="rankRating__data-item">
                        <Rating color="#FFD52E" distance={1} size={13} stars={5} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child" style={{width: "86%"}}></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">6</p>
                    </div>
                    <div className="rankRating__data-item">
                        <Rating color="#FFD52E" distance={1} size={13} stars={4} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child" style={{width: "14%"}}></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">1</p>
                    </div>
                    <div className="rankRating__data-item">
                        <Rating color="#FFD52E" distance={1} size={13} stars={3} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child"></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">0</p>
                    </div>
                    <div className="rankRating__data-item">
                        <Rating color="#FFD52E" distance={1} size={13} stars={2} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child"></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">0</p>
                    </div>
                    <div className="rankRating__data-item">
                        <Rating color="#FFD52E" distance={1} size={13} stars={1} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child"></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">0</p>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default RankRating;