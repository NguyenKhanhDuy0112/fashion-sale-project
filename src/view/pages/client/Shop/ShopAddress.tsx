import { useState } from "react";
import ModalCustom from "../../../../shared/components/ModalCustom";

function ShopAddress() {
    const [showAddress, setShowAddress] = useState(false)

    return (
        <article className="shop__address">
            <h5 className="shop__sidebar-title">Địa chỉ giao hàng</h5>
            <div className="shop__sidebar-address-change" onClick={() => setShowAddress(true)}>
                Đổi địa chỉ
            </div>

            <ModalCustom className="shop__address-modal" position="center" show={showAddress} onHandleShow={() => setShowAddress(!showAddress)} close={true}>
                <div className="shop__address-modal-header">
                    Địa chỉ giao hàng
                </div>
                <div className="shop__address-modal-body">
                    Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính xác nhất.
                </div>
                <div className="shop__address-modal-footer">
                    <button className="shop__address-modal-footer-btn">
                        Giao đến địa chỉ này
                    </button>
                </div>
            </ModalCustom>
        </article>
    );
}

export default ShopAddress;