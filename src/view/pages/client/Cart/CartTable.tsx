import useCart from "../../../../shared/hooks/useCart";
import { ProductCart } from "../../../../shared/interfaces";
import CartHead from "./CartHead";
import CartItem from "./CartItem";

function CartTable() {
    const cart = useCart()
    
    return (
        <article className="cart__table">
            <CartHead />
            <div className="cart__table-body bg-white border-radius-4 p-3">
                <div className="row g-4">
                    {cart &&cart.products && cart.products.length > 0 && cart.products.map((pro: ProductCart, index: number) => (
                        <div key={pro._id} className="col-12">
                            <CartItem index={index} product={pro}/>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default CartTable;