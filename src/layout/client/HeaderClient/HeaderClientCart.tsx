import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import useCart from "../../../shared/hooks/useCart";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";

function HeaderClientCart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useCart()
    const currentUser = useCurrentUser()

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
        </span>
    );
}

export default HeaderClientCart;