import { FiShoppingCart } from "react-icons/fi";

function HeaderClientCart() {

    return (
        <div className="headerClient__cart" >
            <span className="headerClient__cart-icon">
                <span className="d-xl-none d-block">
                    <FiShoppingCart size={25} />
                </span>
                <span className="d-xl-block d-none">
                    <FiShoppingCart size={30} />
                </span>
                <span className="headerClient__cart-icon-notify d-xl-flex d-none">5</span>
            </span>
            <span className="headerClient__cart-text ms-2 d-xl-block d-none">
                Giỏ hàng
            </span>
        </div>
    );
}

export default HeaderClientCart;