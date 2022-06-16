import { useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteProducts, deleteProductsByChecking, toggleCheckAll } from "../../../../modules/cart/cartSlice";
import { showSnackbar } from "../../../../modules/snackbar/snackbarSlice";
import ModalCustomDelete from "../../../../shared/components/ModalCustomDelete";
import useCart from "../../../../shared/hooks/useCart";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";

function CartHead() {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const cart = useCart()
    const checking = useRef<boolean>(false)

    const handleDeleteByChecking = () => {
        dispatch(deleteProductsByChecking())
        setShowModal(!showModal)
    }

    const handleShowModalDelete = () => {
        if(cart.productsChecking.length === 0){
            dispatch(showSnackbar({show : true, text : "Vui lòng chọn sản phẩm để xóa", delay: 3000}))
        }
        else{
            setShowModal(!showModal)
        }
    }

    const handleCheckAll = () => {
        checking.current = !checking.current
        dispatch(toggleCheckAll({key: currentUser._id ? currentUser._id : '', checking: checking.current}))
    }

    return (
        <>
            <div className="cart__cartHead bg-white border-radius-4 py-2 px-3">
                <div className="row align-items-center">
                    <div className="col-xl-5 col">
                        <label className="cart__cartHead-checkbox d-flex align-items-center cursor-pointer">
                            <input 
                                onChange={handleCheckAll} 
                                checked = {cart.products.length === cart.productsChecking.length} 
                                type="checkbox" 
                                className="cart__cartHead-checkbox-input" 
                            />
                            <span className="cart__cartHead-checkbox-fake"></span>
                            <span 
                                className="cart__cartHead-checkbox-label"
                            >
                                Tất cả ({cart.products.length} sản phẩm)
                            </span>
                        </label>
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__cartHead-title">
                            Đơn giá
                        </span>
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__cartHead-title">
                            Số lượng
                        </span>
                    </div>
                    <div className="col d-xl-block d-none">
                        <span className="cart__cartHead-title">
                            Thành tiền
                        </span>
                    </div>
                    <div className="col-auto">
                        <span 
                            onClick={handleShowModalDelete} 
                            className="cart__cartHead-title cursor-pointer"
                        >
                            <FiTrash2 color="#787878" size={18} />
                        </span>
                    </div>
                </div>
            </div>
            <ModalCustomDelete 
                onShow={() => setShowModal(!showModal)} 
                show = {showModal}
                onDelete = {handleDeleteByChecking}
            />
        </>
    );
}

export default CartHead;