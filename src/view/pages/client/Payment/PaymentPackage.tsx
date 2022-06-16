import PaymentProduct from "./PaymentProduct";
import { GoPackage } from "react-icons/go";
import { formatDate, getDayInWeek } from "../../../../shared/helpers";
import useCart from "../../../../shared/hooks/useCart";

function PaymentPackage() {
    const today = new Date(new Date().setDate(new Date().getDate() + 3))
    const cart = useCart()

    return (
        <div className="payment__package px-xl-3 px-2 pb-3 pt-5">
            <div className="payment__package-card d-flex align-items-center">
                <div className="payment__package-title">
                    <GoPackage />
                    <span className="ms-1">
                        Gói
                    </span>
                </div>
                <span className="payment__package-leadTime ms-2">
                    Giao vào {getDayInWeek(today)}, {formatDate(today, "dd/MM/yyyy")}
                </span>
            </div>
            {cart.productsChecking.length > 0  && cart.productsChecking.map((pro, index) => (
                <PaymentProduct key={index} product = {pro}/>
            ))}
            
        </div>
    );
}

export default PaymentPackage;