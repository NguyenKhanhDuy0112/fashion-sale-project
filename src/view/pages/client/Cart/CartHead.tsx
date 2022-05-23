import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../modules/snackbar/snackbarSlice";
import ModalCustomDelete from "../../../../shared/components/ModalCustomDelete";

function CartHead() {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteCartItem = () => {

    }

    return (
        <>
            <div className="cart__cartHead bg-white border-radius-4 py-2 px-3">
                <div className="row align-items-center">
                    <div className="col-xl-5 col">
                        <label className="cart__cartHead-checkbox d-flex align-items-center cursor-pointer">
                            <input type="checkbox" className="cart__cartHead-checkbox-input" />
                            <span className="cart__cartHead-checkbox-fake"></span>
                            <span className="cart__cartHead-checkbox-label">Tất cả (2 sản phẩm)</span>
                        </label>
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__cartHead-title">Đơn giá</span>
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__cartHead-title">Số lượng</span>
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__cartHead-title">Thành tiền</span>
                    </div>
                    <div className="col-auto">
                        <span onClick={() => dispatch(showSnackbar({show : true, text : "Vui lòng chọn sản phẩm để xóa", delay: 3000}))} className="cart__cartHead-title cursor-pointer">
                            <FiTrash2 color="#787878" size={18} />
                        </span>
                    </div>
                </div>
            </div>
            <ModalCustomDelete 
                onShow={() => setShowModal(!showModal)} 
                show = {showModal}
                onDelete = {handleDeleteCartItem}
            />
        </>
    );
}

export default CartHead;