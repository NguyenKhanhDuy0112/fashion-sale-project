import ModalCustom from "../../../../../shared/components/ModalCustom";
import { IoCloseSharp } from "react-icons/io5";
import ShopAddress from "./ShopAddress";
import ShopRating from "./ShopRating";
import ShopBrand from "./ShopBrand";
import ShopMaterial from "./ShopMaterial";
import ShopPrice from "./ShopPrice";

interface Props{
    show: boolean,
    onShow: () => void,
}

function ShopSidebarModal(props: Props) {
    const { show, onShow} = props
    return ( 
        <ModalCustom className="shop__sidebar-modal" zIndexOverlay={21} show = {show} onHandleShow={onShow} position="right">
            <div className="modalCustom__header shop__sidebar-modal-header p-2 position-fixed d-flex align-items-center justify-content-center">
                <span 
                    onClick={() => onShow()} 
                    className="position-absolute start-0 text-white p-2"
                >
                        <IoCloseSharp size={18}/>
                </span>
                <p className="text-center text-white mb-0 shop__sidebar-modal-header-title">Lọc Sản Phẩm</p>
            </div>
            <div className="modalCustom__body mt-4 pt-3">
                <ShopAddress/>
                <ShopRating />
                <ShopPrice />
                <ShopBrand/>
                <ShopMaterial/>
            </div>
            <div className="modalCustom__footer"></div>
        </ModalCustom>
     );
}

export default ShopSidebarModal;