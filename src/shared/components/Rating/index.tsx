import { BsFillStarFill, BsStar } from "react-icons/bs";

interface Star{
    stars: number,
    size: number,
    color: string,
    distance: number,
}
function Rating(props: Star) {
    const { stars, size, color, distance } = props

    return ( 
        <div className="rating d-flex">
            {Array.from({ length : 5}).map((item,index) => (
                index < stars 
                ? 
                    <span 
                        key={index} 
                        className = {`${index === stars ? 'me-0' : 'me-'+distance}`}
                    >
                        <BsFillStarFill size={size} color={color}/>
                    </span> 
                : 
                    <span 
                        key={index} 
                        className = {`${index === stars ? 'me-0' : 'me-'+distance}`}
                    >
                        <BsStar size={size} color={color}/>
                    </span>
            ))}
        </div>
     );
}

export default Rating;