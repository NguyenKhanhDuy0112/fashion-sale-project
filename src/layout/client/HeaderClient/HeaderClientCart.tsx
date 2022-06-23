import { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import { hideCartNotify } from "../../../modules/notifyCart/notifyCartSlice";
import useCart from "../../../shared/hooks/useCart";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import useNotifyCart from "../../../shared/hooks/useNotifyCart";

function HeaderClientCart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useCart()
    const currentUser = useCurrentUser()
    const notifyCart = useNotifyCart()

    useEffect(() => {
        setTimeout(() => {
            dispatch(hideCartNotify())
        }, notifyCart.delay)
    }, [notifyCart])

    const handleChangePageCart = () =>{
        dispatch(hideCartNotify())
        navigate("/checkout/cart")
    }

    return (
        <span onClick={() => currentUser._id !== '' ? navigate('/checkout/cart') : dispatch(toggleFormLogin())} className="headerClient__cart" >
            <span className="headerClient__cart-icon">
                <span className="d-xl-none d-block">
                    <FiShoppingCart size={25} />
                </span>
                <span className="d-xl-block d-none">
                    <FiShoppingCart size={30} />
                </span>
                <span className="headerClient__cart-icon-notify d-xl-flex d-none">{cart.products.length}</span>
            </span>
            <span className="headerClient__cart-text ms-2 d-xl-block d-none">
                Giỏ hàng
            </span>
            <div className={`headerClient__cart-notify ${notifyCart.show ? 'active' : ''}`}>
                <span onClick={() => dispatch(hideCartNotify())} className="headerClient__cart-notify-close">
                    <IoClose color="#9B9B9B" size = {20}/>
                </span>
                <div className="d-flex align-items-center">
                    <span>
                        <IoMdCheckmarkCircle color = "#4CAF50" size={20}/>
                    </span>
                    <p className="mb-0 headerClient__cart-notify-text">
                        Thêm vào giỏ hàng thành công!
                    </p>
                </div>
                <button onClick={handleChangePageCart} className="headerClient__cart-notify-btn">
                    Xem giỏ hàng và thanh toán
                </button>
            </div>
        </span>
    );
}

export default HeaderClientCart;