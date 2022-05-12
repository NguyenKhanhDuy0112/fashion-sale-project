import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

function useOrders() {
    const orders = useSelector((state:RootState) => state.orders.orders)
    return orders;
}

export default useOrders;