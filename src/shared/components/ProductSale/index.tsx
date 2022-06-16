import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { formatCashVND } from "../../helpers";

interface ProductDeal {
    loading: boolean,
    url: string,
    image: string,
    title: string,
    discount: number,
    price: number,
    quantity: number,
    intro: boolean
    sold: number
}

function ProductSale(props: ProductDeal) {
    const { url, image, title, discount, price, quantity, sold, intro, loading } = props
    const [percentProgress, setPercentProgess] = useState(0)

    useEffect(() => {
        setPercentProgess(sold > 0 ? Math.floor((sold / quantity) * 100) : 0)
    }, [sold, quantity])


    return (
        <>
            {
                loading
                    ?
                    <span className="card productSale h-100 p-lg-3 p-1">
                        <Skeleton height={200} />
                        <div className="card-body productSale__body p-xl-0 p-1">
                            <Skeleton height={15} />
                        </div>
                    </span>
                    :
                    <Link to={url} className="card productSale h-100 p-lg-3 p-1">
                        <div className="productSale__img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="card-body productSale__body p-xl-0 p-1">
                            {!intro && <h5 className="card-title productSale__title mb-1">{title}</h5>}
                            <div className="d-flex align-items-center mb-1">
                                <p className="productSale__price-current mb-0">
                                    {formatCashVND(price - (price * (discount / 100)) + "", ".")} ₫
                                </p>
                                <span className="productSale__discount mb-0">
                                    {discount}%
                                </span>
                            </div>
                            {
                                !intro &&
                                <p className="productSale__price-old mb-1">
                                    {formatCashVND(price + "", ".")} ₫
                                </p>
                            }
                            <div className="productSale__progress mt-2">
                                {
                                    percentProgress >= 50 &&
                                    <img
                                        className="productSale__progress-fire"
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
                                        alt="" />
                                }
                                <div
                                    className="productSale__progress-percent"
                                    style={{ width: `${percentProgress}%` }}
                                >

                                </div>

                                <p className="productSale__progress-data">
                                    {percentProgress !== 0 ? `Đã bán ${percentProgress}` : 'Vừa mở bán'}
                                </p>
                            </div>
                        </div>
                    </Link>
            }
        </>
    );
}

export default ProductSale;