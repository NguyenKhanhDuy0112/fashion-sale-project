import PaymentProduct from "./PaymentProduct";
import { GoPackage } from "react-icons/go";

function PaymentPackage() {
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
                    Giao vào chủ nhật, 29/5
                </span>
            </div>
            <PaymentProduct />
        </div>
    );
}

export default PaymentPackage;