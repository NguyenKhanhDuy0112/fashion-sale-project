import Skeleton from "react-loading-skeleton";
import { formatCashVND } from "../../helpers";


interface Props {
    img: string,
    title: string,
    price: number,
    trademark: string,
    isLoading: boolean,
}

function ProductItemAdSearch(props: Props) {
    const { img, title, trademark, price, isLoading } = props

    return (
        <div className="px-2">
            <div className="productItemAdSearch d-flex align-items-center p-2">
                {isLoading ?
                    <div className="productItemAdSearch__img">
                        <Skeleton height="60px" width="60px" circle={true} />
                    </div>
                    :
                    <div className="productItemAdSearch__img">
                        <div className="productItemAdSearch__img-child" style={{ backgroundImage: `url(${img})` }}></div>
                    </div>

                }

                <div className="productItemAdSearch__content ms-2 w-100">
                    <div className="row">
                        <div className="col">
                            <p className="productItemAdSearch__content-title mb-2">{isLoading ? <Skeleton /> : title}</p>
                            <p className="productItemAdSearch__content-quantity mb-1">{isLoading ? <Skeleton /> : `Thương hiệu: ${trademark}`}</p>
                        </div>
                        <div className="col-auto">
                            <p className="productItemAdSearch__content-price">{isLoading ? <Skeleton /> : `${formatCashVND(String(price), ",")} đ`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItemAdSearch;