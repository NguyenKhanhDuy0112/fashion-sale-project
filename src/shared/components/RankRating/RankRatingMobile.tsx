import { IoIosArrowDown } from "react-icons/io";
import Rating from "../Rating";

function RankRatingMobile() {
    return (
        <article className="rankRating d-flex align-items-center border-b-f7 pb-3">
            <div className="rankRating__general d-flex flex-column border-r-f7 pe-3">
                <h2 className="rankRating__general-average mb-0">4.9</h2>
                <div className="ms-2">
                    <Rating color="#FFD52E" distance={1} size={13} stars={5} colorSub="#DDDDE3" />
                    <div className="d-flex align-items-center">
                        <p className="rankRating__general-number mb-0">7 đánh giá</p>
                    </div>
                </div>
            </div>
            <div className={`rankRating__data ms-3`}>
                <div className="d-flex flex-column">
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating color="#FFD52E" distance={1} size={11} stars={5} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child" style={{ width: "86%" }}></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">6</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating color="#FFD52E" distance={1} size={11} stars={4} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child" style={{ width: "14%" }}></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">1</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating color="#FFD52E" distance={1} size={11} stars={3} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child"></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">0</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating color="#FFD52E" distance={1} size={11} stars={2} colorSub="#DDDDE3" />
                        <div className="rankRating__data-item-progress">
                            <div className="rankRating__data-item-progress-child"></div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">0</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating color="#FFD52E" distance={1} size={11} stars={1} colorSub="#DDDDE3" />
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

export default RankRatingMobile;