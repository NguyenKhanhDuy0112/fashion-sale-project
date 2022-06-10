import { IoCloseSharp } from "react-icons/io5";
import ModalCustom from "../../../../../shared/components/ModalCustom";

interface Props {
    show: boolean,
    onShow: () => void,
    description?: string,
}

function ProductDetailDescriptionMobile(props: Props) {
    const { show, onShow, description } = props

    return (
        <ModalCustom show={show} onHandleShow={onShow} position="full" >
            <div className="modalCustom__header px-2">
                <span onClick={onShow} className="modalCustom__header-icon p-1">
                    <IoCloseSharp size={30} color="#fff" />
                </span>
                <h5 className="modalCustom__header-title">Mô tả</h5>
            </div>
            <div className="modalCustom__body mt-5 py-4 px-3">
                <div dangerouslySetInnerHTML={{ __html: description ? description : '' }} />
            </div>
        </ModalCustom>
    );
}

export default ProductDetailDescriptionMobile;