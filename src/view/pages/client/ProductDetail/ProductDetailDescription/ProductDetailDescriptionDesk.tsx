import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductDetailDescriptionMobile from "./ProductDetailDescriptionMobile";

interface Props{
    description?: string,
}

function ProductDetailDescriptionDesk(props: Props) {
    const { description } = props
    const [showDescription, setShowDescription] = useState(true)
    const [showDescriptionModal, setShowDescriptionModal] = useState(false)

    const handleToggleDescription = () => {
        if(window.innerWidth <= 1200){
            setShowDescriptionModal(!showDescriptionModal)
            setShowDescription(true)
        }
        else{
            setShowDescriptionModal(false)
            setShowDescription(!showDescription)
        }
    }

    return (
        <>
            <article className="productDetail__description mt-xl-3 mt-2">
                <div className="container-client none">
                    <div className="border-radius-4 p-3 bg-white position-relative">
                        <h4 className="productDetail__title mb-3">Mô tả sản phẩm</h4>

                        <div className={`productDetail__description-container position-relative ${(showDescription || showDescriptionModal) ? 'active' : ''}`}>
                            <div dangerouslySetInnerHTML={{__html: description ? description : ''}}/>
                            
                            <div className={`productDetail__description-gradient ${(showDescription || showDescriptionModal) ? 'active' : ''}`}></div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button onClick={handleToggleDescription} className="productDetail__description-btn d-xl-flex d-none px-3 py-2">
                                {(showDescription || showDescriptionModal) ? 'Xem thêm' : 'Thu gọn'} nội dung
                            </button>

                            <button onClick={handleToggleDescription} className="productDetail__description-btn d-xl-none d-flex align-items-center px-3 py-2">
                                Xem tất cả <MdOutlineKeyboardArrowRight/>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
            <ProductDetailDescriptionMobile 
                description = {description}
                show = {showDescriptionModal} 
                onShow={handleToggleDescription}
            />
        </>
    );
}

export default ProductDetailDescriptionDesk;