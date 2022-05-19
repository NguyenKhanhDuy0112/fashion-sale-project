import { useState } from "react";
import Select from 'react-select'
import ModalCustom from "../../../../../shared/components/ModalCustom";

function ShopAddress() {
    const [showAddress, setShowAddress] = useState(false)

    return (
        <article className="shop__address p-3 border-b-f7">
            <h5 className="shop__sidebar-title pb-2">Địa chỉ nhận hàng</h5>
            <p className="shop__sidebar-address mb-0">H.Hóc Môn, X.Xuân Thới Thượng, Thành Phố Hồ Chí Minh</p>
            <div className="shop__sidebar-address-change text-uppercase d-xl-block d-none" onClick={() => setShowAddress(true)}>
                Đổi địa chỉ
            </div>

            <ModalCustom className="shop__address-modal" position="center" show={showAddress} onHandleShow={() => setShowAddress(!showAddress)} close={true}>
                <div className="shop__address-modal-header py-2">
                    Địa chỉ giao hàng
                </div>
                <div className="shop__address-modal-body px-4 py-3">
                    <p className="mb-2">Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính xác nhất.</p>
                    <div className="d-flex justify-content-center">
                        <button className="shop__address-modal-body-btn py-2 px-4">
                            Đăng nhập để chọn địa chỉ giao hàng
                        </button>
                    </div>
                    <div className="shop__address-modal-body-or my-3">
                        <p className="shop__address-modal-body-or-text mb-0">hoặc</p>
                    </div>
                    <div className="shop__address-modal-body-choose">
                        <div className="d-flex align-items-center mb-2">
                            <input id="address1" type="radio" name="address" />
                            <label htmlFor="address1" className="ms-2 shop__address-modal-body-choose-label">Phường Bến Nghé, Quận 1, Hồ Chí Minh</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <input id="addressOther" type="radio" name="address" />
                            <label htmlFor="address1" className="ms-2 shop__address-modal-body-choose-label">Chọn khu vực giao hàng khác</label>
                        </div>
                        <div className="w-100 d-flex flex-column mt-3 px-3">
                            <div className="row align-items-center mb-3 w-100">
                                <span className="col-4">Tỉnh/Thành Phố</span>
                                <div className="col">
                                    <Select placeholder="Vui lòng chọn tỉnh/thành phố" options={[]} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 w-100">
                                <span className="col-4">Quận Huyện</span>
                                <div className="col">
                                    <Select placeholder="Vui lòng chọn quận/huyện" options={[]} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3 w-100">
                                <span className="col-4">Phường Xã</span>
                                <div className="col">
                                    <Select placeholder="Vui lòng chọn phường/xã" options={[]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shop__address-modal-footer d-flex justify-content-center">
                    <button className="shop__address-modal-footer-btn py-2 px-5">
                        Giao đến địa chỉ này
                    </button>
                </div>
            </ModalCustom>
        </article>
    );
}

export default ShopAddress;