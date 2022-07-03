import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import ModalCustom from "../../../../shared/components/ModalCustom";
import WriteComment from "../../../../shared/components/WriteComment";
import { ProductDetail } from "../../../../shared/interfaces";

interface CommentSelledItemProps {
    productDetail?: ProductDetail,
    loading: boolean,
    onLoadProducts:() => void
}

function CommentSelledItem(props: CommentSelledItemProps) {
    const { productDetail, loading, onLoadProducts } = props
    const [show, setShow] = useState<boolean>(false)
    console.log("Product detail: ",productDetail)

    const handleCloseModal = () => {
        setShow(!show)
        onLoadProducts()
    }
    return (
        <>
            <div className="commentSelled__item">
                {loading ?
                    <Skeleton height={180} />
                    :
                    <div
                        className="commentSelled__item-img"
                        style={{ backgroundImage: `url(${productDetail?.images[0].image})` }}
                    >

                    </div>
                }
                <h5 className="commentSelled__item-title my-2">
                    {
                        loading ? <Skeleton />
                            :
                            productDetail?.product?.name
                    }
                </h5>
                <div>
                    {loading ?
                        <Skeleton height={10} />
                        :
                        <button
                            onClick={() => setShow(!show)}
                            className="commentSelled__item-btn"
                        >
                            Viết nhận xét
                        </button>
                    }
                </div>
            </div>
            <ModalCustom
                onHandleShow={() => setShow(!show)}
                show={show}
                className="commentSelled__item-modal"
                position="center"
            >
                <div className="p-3">
                    <WriteComment onCloseModal={handleCloseModal} productDetail={productDetail} />
                </div>
            </ModalCustom>
        </>

    );
}

export default CommentSelledItem;