import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
import ModalCustom from "../ModalCustom";

interface Props {
    show: boolean,
    onShow: () => void
}

function CouponModal(props: Props) {
    const { show, onShow } = props
    const [valueInput, setValueInput] = useState('')

    return (
        <ModalCustom zIndexOverlay={50} className="coupon__modal" show={show} onHandleShow={onShow} position={`${window.innerWidth <= 1200 ? 'full' : 'center'}`} >
            <div className="modalCustom__header d-xl-none d-flex px-2">
                <span onClick={onShow} className="modalCustom__header-icon p-1">
                    <IoCloseSharp size={30} color="#fff" />
                </span>
                <h5 className="modalCustom__header-title">TiKi Khuyến mãi</h5>
            </div>

            <div className="d-xl-flex d-none align-items-center justify-content-between align-items-center">
                <p className="coupon__modal-title mb-0">Tiki Khuyến mãi</p>
                <span className="coupon__modal-close cursor-pointer" onClick={onShow}>
                    <IoCloseSharp size={22} />
                </span>
            </div>
            <div className="p-xl-0 p-3 mt-xl-0 mt-4">
                <div className="row g-2 mt-3">
                    <div className="col">
                        <div className="coupon__modal-group align-items-center">
                            <span className="coupon__modal-group-icon py-1 px-2">
                                <RiCoupon3Line size={18} color="#C4C4CF" />
                            </span>
                            <input value={valueInput} onChange={(e) => setValueInput(e.target.value)} className="coupon__modal-group-input py-1 px-2" placeholder="Nhập mã giảm giá" />
                        </div>
                    </div>
                    <div className="col-auto">
                        <button className={`coupon__modal-btn px-3 py-1 ${valueInput !== '' ? '' : 'disabled'}`}>
                            Áp dụng
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="coupon__modal-title mb-0 fw-normal">Mã giảm giá</p>
                    <span className="coupon__modal-title-sub">Áp dụng tối đa: 1</span>
                </div>
            </div>
            <div className="modalCustom__footer d-xl-none d-block p-3">
                <button onClick={onShow} className="coupon__modal-btn-done px-3 py-2">Xong</button>
            </div>
        </ModalCustom>
    );
}

export default CouponModal;