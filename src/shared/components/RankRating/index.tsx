import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Product } from "../../interfaces";
import Rating from "../Rating";

interface RankRatingProps {
    product?: Product
}

function RankRating(props: RankRatingProps) {
    const { product } = props
    const [showRating, setShowRating] = useState(true)

    useEffect(() => {
        if (window.innerWidth <= 1200) {
            setShowRating(false)
        }
        else {
            setShowRating(true)
        }
    }, [])

    const handleShowRating = () => {
        if (window.innerWidth <= 1200) {
            setShowRating(!showRating)
        } else {
            setShowRating(true)
        }
    }

    return (
        <article className="rankRating">
            <div className="rankRating__general" onClick={handleShowRating}>
                <h2 className="rankRating__general-average mb-0">{product?.rating ? product.rating : 0}</h2>
                <div className="ms-2 d-xl-block d-flex">
                    <Rating
                        color="#FFD52E"
                        distance={1}
                        size={17}
                        stars={product?.rating ? product.rating : 0}
                        colorSub="#DDDDE3"
                    />
                    <div className="d-flex align-items-center">
                        <p className="rankRating__general-number mb-0 mt-1 ms-xl-0 ms-2">
                            {product?.comments?.length} nhận xét
                        </p>
                        <span
                            className="ms-1 d-xl-none d-block"
                        >
                            <IoIosArrowDown
                                size={14}
                                color="#92929a"
                                fontWeight="bold"
                            />
                        </span>
                    </div>
                </div>
            </div>
            <div className={`rankRating__data ${showRating ? 'd-block' : 'd-none'}`}>
                <div className="d-flex flex-column justify-content-xl-start justify-content-center">
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating
                            color="#FFD52E"
                            distance={1}
                            size={11}
                            stars={5}
                            colorSub="#DDDDE3"
                        />
                        <div className="rankRating__data-item-progress">
                            <div
                                className="rankRating__data-item-progress-child"
                                style={{ width: `${((product?.fiveStar ? product.fiveStar : 0) * 100) / (product?.comments ? product.comments.length : 0)}%` }}
                            >
                            </div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">{product?.fiveStar}</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating
                            color="#FFD52E"
                            distance={1}
                            size={11}
                            stars={4}
                            colorSub="#DDDDE3"
                        />
                        <div className="rankRating__data-item-progress">
                            <div
                                className="rankRating__data-item-progress-child"
                                style={{ width: `${((product?.fourStar ? product.fourStar : 0) * 100) / (product?.comments ? product.comments.length : 0)}%` }}
                            >

                            </div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">
                            {product?.fourStar}
                        </p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating
                            color="#FFD52E"
                            distance={1}
                            size={11}
                            stars={3}
                            colorSub="#DDDDE3"
                        />
                        <div className="rankRating__data-item-progress">
                            <div
                                className="rankRating__data-item-progress-child"
                                style={{ width: `${((product?.threeStar ? product.threeStar : 0) * 100) / (product?.comments ? product.comments.length : 0)}%` }}
                            >

                            </div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">{product?.threeStar}</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating
                            color="#FFD52E"
                            distance={1}
                            size={11}
                            stars={2}
                            colorSub="#DDDDE3"
                        />
                        <div className="rankRating__data-item-progress">
                            <div
                                style={{ width: `${((product?.twoStar ? product.twoStar : 0) * 100) / (product?.comments ? product.comments.length : 0)}%` }}
                                className="rankRating__data-item-progress-child"
                            >

                            </div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">{product?.twoStar}</p>
                    </div>
                    <div className="rankRating__data-item justify-content-xl-start justify-content-center">
                        <Rating
                            color="#FFD52E"
                            distance={1}
                            size={11}
                            stars={1}
                            colorSub="#DDDDE3"
                        />
                        <div className="rankRating__data-item-progress">
                            <div
                                className="rankRating__data-item-progress-child"
                                style={{ width: `${((product?.oneStar ? product.oneStar : 0) * 100) / (product?.comments ? product.comments.length : 0)}%` }}
                            >

                            </div>
                        </div>
                        <p className="mb-0 rankRating__data-item-number">
                            {product?.oneStar}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default RankRating;