import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface RatingStarProps{
    onChangeRating: (value: number) => void
}

function RatingStar(props: RatingStarProps) {
    const { onChangeRating } = props

    const [rating, setRating] = useState<number>(0)
    const [hover, setHover] = useState<number>(0)

    const handleChangeRating = (value: number) => {
        setRating(value)
        onChangeRating(value)
    }

    const handleChangeRatingHover = (value: number) => {
        setHover(value)
        if(value !== 0){
            onChangeRating(value)
        }
       
    }

    return (
        <div>
            {[...Array(5)].map((star: any, index: number) => {
                const ratingValue = index + 1
                return (
                    <label key={index} className="ratingStar__label mx-1">
                        <input className="d-none" type="radio" onClick={() => handleChangeRating(ratingValue)} name="rating" value={ratingValue}/>
                        <AiFillStar
                            className="rating__star-icon"
                            size={30}
                            onMouseOut = {() => handleChangeRatingHover(ratingValue)}
                            onMouseLeave = {() => handleChangeRatingHover(0)}
                            color = {ratingValue  <= (hover || rating) ? '#ffc107' : 'e4e5e9'}
                        />
                    </label>
                )
            })}
        </div>
    );
}

export default RatingStar;