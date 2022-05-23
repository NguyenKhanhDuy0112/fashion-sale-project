import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { RiCoupon3Line } from "react-icons/ri";
import CouponModal from "./CouponModal";

function Coupon() {
    const [show, setShow] = useState(false)

    return (
        <>
            <article className="coupon bg-white border-radius-4 p-3">
                <div className="d-flex align-items-center justify-content-between mb-xl-4 mb-0">
                    <p className="coupon__title mb-0">Tiki Khuyến Mãi</p>
                    <div className="d-xl-flex d-none align-items-center">
                        <p className="coupon__text mb-0">Có thể chọn 2</p>
                        <span className="coupon__text ms-1">
                            <CgDanger size={15} />
                        </span>
                    </div>
                   <div onClick={() => setShow(!show)} className="d-xl-none d-flex align-items-center">
                       <p className="coupon__text mb-0">Nhập hoặc chọn mã</p>
                       <IoIosArrowForward color="#8E8BA3"/>
                   </div>
                </div>
                <div onClick={() => setShow(!show)} className="d-xl-flex d-none align-items-center cursor-pointer">
                    <span className="coupon__icon">
                        <RiCoupon3Line size={19} />
                    </span>
                    <span className="coupon__apply ms-2">
                        Chọn hoặc nhập khuyến mãi khác
                    </span>
                </div>
            </article>

            <CouponModal onShow={() => setShow(!show)} show = {show}/>
        </>
    );
}

export default Coupon;