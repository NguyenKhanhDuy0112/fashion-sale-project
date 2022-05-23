import ModalCustom from "../ModalCustom";
import { IoWarningOutline } from "react-icons/io5";

interface Props {
    show: boolean,
    onShow: () => void,
    onDelete: () => void,
}

function ModalCustomDelete(props: Props) {
    const { show, onShow, onDelete } = props

    return (
        <ModalCustom zIndexOverlay={50} className="modalCustom__delete p-3" show={show} onHandleShow={onShow} position="center" >
            <div className="d-flex">
                <span className="modalCustom__delete-icon me-2">
                    <IoWarningOutline size={18} color="#FC8918" />
                </span>
                <div>
                    <span className="modalCustom__delete-title">
                        Xóa sản phẩm
                    </span>
                    <p className="modalCustom__delete-text mt-2 mb-4">
                        Bạn có muốn xóa sản phẩm đang chọn?
                    </p>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center">
                <button onClick={onDelete} className="modalCustom__delete-btn me-1 modalCustom__delete-btn-verify">
                    Xác nhận
                </button>
                <button onClick={onShow} className="modalCustom__delete-btn ms-1 modalCustom__delete-btn-close">
                    Hủy
                </button>
            </div>
        </ModalCustom>
    );
}

export default ModalCustomDelete;