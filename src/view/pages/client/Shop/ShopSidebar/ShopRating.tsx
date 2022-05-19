import { AiFillStar } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import Rating from "../../../../../shared/components/Rating";


function ShopRating() {
    const [searchParams, setSearchParams] = useSearchParams()
    const handleQueryRating = (stars: number) => {
        const rating = searchParams.get('rating')
        if (rating) {
            searchParams.set('rating', String(stars))
        }
        else {
            searchParams.append('rating', String(stars))
        }
        setSearchParams(searchParams)
    }

    return (
        <article className="shop__sidebar-rating p-3 border-b-f7">
            <h5 className="shop__sidebar-title pb-2">Đánh giá</h5>
            <div className="row g-xl-2 g-4">
                <div className="col-xl-12 col-4 d-flex align-items-xl-end align-items-center">
                    <span 
                        onClick={() => handleQueryRating(5)} 
                        className="d-flex align-items-xl-end align-items-center cursor-pointer shop__sidebar-item"
                    >
                        <small className="d-xl-inline d-none">
                            <Rating color="#FDD835" distance={1} size={13} stars={5} />
                        </small>
                        <small className="d-xl-none d-inline">
                            <AiFillStar color="#FDD835" size={15} />
                        </small>
                        <small className="ms-2 shop__title-sub">từ 5 sao</small>
                    </span>
                </div>
                <div className="col-xl-12 col-4 d-flex align-items-xl-end align-items-center">
                    <span 
                        onClick={() => handleQueryRating(4)} 
                        className="d-flex align-items-xl-end align-items-center cursor-pointer shop__sidebar-item"
                    >
                        <small className="d-xl-inline d-none">
                            <Rating color="#FDD835" distance={1} size={13} stars={4} />
                        </small>
                        <small className="d-xl-none d-inline">
                            <AiFillStar color="#FDD835" size={15} />
                        </small>
                        <small className="ms-2 shop__title-sub">từ 4 sao</small>
                    </span>
                </div>
                <div className="col-xl-12 col-4 d-flex align-items-xl-end align-items-center">
                    <span 
                        onClick={() => handleQueryRating(3)} 
                        className="d-flex align-items-xl-end align-items-center cursor-pointer shop__sidebar-item"
                    >
                        <small className="d-xl-inline d-none">
                            <Rating color="#FDD835" distance={1} size={13} stars={3} />
                        </small>
                        <small className="d-xl-none d-inline">
                            <AiFillStar color="#FDD835" size={15} />
                        </small>
                        <small className="ms-2 shop__title-sub">từ 3 sao</small>
                    </span>
                </div>
            </div>
        </article>
    );
}

export default ShopRating;