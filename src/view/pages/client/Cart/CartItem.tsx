import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProducts, updateProduct } from "../../../../modules/cart/cartSlice";
import InputQuantity from "../../../../shared/components/InputQuantity";
import ModalCustomDelete from "../../../../shared/components/ModalCustomDelete";
import { formatCashVND } from "../../../../shared/helpers";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { ProductCart } from "../../../../shared/interfaces";

interface CartItemProps {
    product: ProductCart,
    index: number,
}

function CartItem(props: CartItemProps) {
    const { product, index } = props
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()

    const handleDeleteProduct = () => {
        
    }

    const handleChangeQuantity = (quantity: number) => {
        dispatch(updateProduct({
            key: currentUser._id ? currentUser._id : '',
            product: { ...product, quantity: quantity }
        }))
    }

    const handleCheckingProduct = () => {
        dispatch(updateProduct({
            key: currentUser._id ? currentUser._id : '',
            product: { ...product, isChecking: !product.isChecking }
        }))
    }

    return (
        <>
            <article className="cart__item">
                <div className="row align-items-center">
                    <div className="col-xl-5 col">
                        <div className="d-flex align-items-center">
                            <label className="cart__cartHead-checkbox d-flex align-items-center">
                                <input
                                    checked={product.isChecking}
                                    onChange={handleCheckingProduct}
                                    type="checkbox"
                                    className="cart__cartHead-checkbox-input"
                                />
                                <span className="cart__cartHead-checkbox-fake"></span>
                            </label>
                            <div className="cart__item-card row align-items-xl-center align-items-start g-2">
                                <div className="col-auto">
                                    <div
                                        className="cart__item-card-img"
                                        style={{ backgroundImage: `url(${product.images[0]})` }}>
                                    </div>
                                </div>
                                <div className="col">
                                    <Link
                                        to={`/products/${product.product?.slug}?spId=${product._id}`}
                                        className="cart__item-card-title"
                                    >
                                        {product?.product?.name}-{product.color.toUpperCase()}-{product.size.toUpperCase()}
                                    </Link>
                                    <div className="cart__item-card-price d-xl-none d-flex my-2 align-items-center">
                                        <span className="cart__item-card-price-current">
                                            {formatCashVND(((product && product.product && product.product.price) ? product.product?.price : 0) - (((product && product.product && product.product.price) ? product.product?.price : 0) * ((product && product.product && product.product.discount) ? product.product.discount : 0) / 100) + "", ".")} ₫
                                        </span>
                                        {
                                            (product.product?.discount && product.product.discount > 0)
                                                ?
                                                <span className="cart__item-card-price-old ms-1">
                                                    {formatCashVND(product.product?.price + "", ".")} ₫
                                                </span>
                                                :
                                                ''
                                        }
                                    </div>
                                    <div className="cart__item-quantity d-xl-none d-block">
                                        <InputQuantity
                                            value={product.quantity}
                                            max={100}
                                            onQuantity={(value) => handleChangeQuantity(value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-xl-block d-none">
                        <div className="cart__item-card-price d-flex align-items-center">
                            <span className="cart__item-card-price-current">
                                {formatCashVND(((product && product.product && product.product.price) ? product.product?.price : 0) - (((product && product.product && product.product.price) ? product.product?.price : 0) * ((product && product.product && product.product.discount) ? product.product.discount : 0) / 100) + "", ".")} ₫
                            </span>
                            {
                                (product.product?.discount && product.product.discount > 0)
                                    ?
                                    <span className="cart__item-card-price-old ms-1">
                                        {formatCashVND(product.product?.price + "", ".")} ₫
                                    </span>
                                    :
                                    ''
                            }
                        </div>
                    </div>
                    <div className="col d-xl-block d-none">
                        <InputQuantity
                            value={product.quantity}
                            max={100}
                            onQuantity={(value) => handleChangeQuantity(value)}
                        />
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__item-card-price-total">
                            {formatCashVND(((product.product && product.product.price) ? (product.product.price  - (product.product.discount ? product.product.price * product.product.discount/100 : 0)) : 0) * product.quantity + "", ".")} ₫
                        </span>
                    </div>
                    <div className="col-auto">
                        <span
                            onClick={() => setShowModal(!showModal)}
                            className="cart__cartHead-title cursor-pointer"
                        >
                            <FiTrash2 color="#787878" size={18} />
                        </span>
                    </div>
                </div>
            </article>
            <ModalCustomDelete
                onShow={() => setShowModal(!showModal)}
                show={showModal}
                onDelete={() => dispatch(deleteProducts({ key: currentUser.id ? currentUser.id : '', index }))}
            />
        </>
    );
}

export default CartItem;