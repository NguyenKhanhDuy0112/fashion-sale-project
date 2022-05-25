import { Modal, Spinner } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi"

interface Props {
    show: boolean,
    onHide: () => void,
    onDelete: () => void,
    isLoading: boolean
}

function ModalAdDelete(props: Props) {
    const { show, onHide, onDelete, isLoading } = props

    const handle = ()=>{}

    return (
        <Modal show={show} centered onHide={onHide}>
            <Modal.Body>
                <p className="text-center text-danger fs-3"><FiTrash2 /></p>
                <h5 className="text-center modal__text-head mb-1">Bạn có chắc là muốn xóa mục này?</h5>
                <p className="text-center modal__text-sub mb-0">Bạn có thực sự muốn xóa mục này? Bạn không thể xem mục này trong danh sách của mình nữa nếu bạn xóa!</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-center align-items-center w-100">
                    <button
                        className="btn modal__btn-cancel me-1"
                        onClick={onHide}
                    >
                        Đóng
                    </button>
                    <button
                        type="button"
                        className="btn btn-ad-primary modal__btn-delete ms-1 text-white"
                        onClick={!isLoading ? onDelete : handle}
                    >
                        {isLoading ? <Spinner size="sm" animation="border" variant="light" />  : 'Xóa'}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAdDelete;