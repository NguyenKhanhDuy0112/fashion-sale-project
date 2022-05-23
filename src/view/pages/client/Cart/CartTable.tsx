import CartHead from "./CartHead";
import CartItem from "./CartItem";

function CartTable() {
    return (
        <article className="cart__table">
            <CartHead />
            <div className="cart__table-body bg-white border-radius-4 p-3">
                <div className="row g-4">
                    <div className="col-12">
                        <CartItem />
                    </div>
                    <div className="col-12">
                        <CartItem />
                    </div>
                </div>
            </div>
        </article>
    );
}

export default CartTable;