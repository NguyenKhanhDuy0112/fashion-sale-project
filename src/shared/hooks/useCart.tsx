import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useCart() {
    const products = useSelector((state:RootState) => state.cart.products)
    const productsChecking = useSelector((state:RootState) => state.cart.productsChecking)
    return { products, productsChecking };
}

export default useCart;