
function SaleAdminCheckout() {
    const today = new Date()

    return (
        <>
            <div className="sellAdmin__content-calc p-3">
                <div>
                    <div className="row mb-3 align-items-center">
                        <div className="col">
                            <div className="position-relative d-flex align-items-center justify-content-center sellAdmin__content-calc-customer">
                                <input
                                    placeholder="Tìm kiếm khách hàng..."
                                    className="form-control sellAdmin__header-search sellAdmin__content-calc-customer-search"
                                    type="search"
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0 sellAdmin__content-calc-date">{`${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <p className="mb-0 sellAdmin__content-calc-title">
                                Tạm tính
                            </p>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0 sellAdmin__content-calc-price">12,000</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <p className="mb-0 sellAdmin__content-calc-title">
                                Phí vận chuyển
                            </p>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0 sellAdmin__content-calc-price">10,000</p>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col">
                            <p className="mb-0 sellAdmin__content-calc-title">
                                Tiền khách trả
                            </p>
                        </div>
                        <div className="col-5">
                            <input className="form-control sellAdmin__content-calc-input-bt" />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col">
                            <p className="mb-0 sellAdmin__content-calc-title">
                                Tiền thừa trả khách
                            </p>
                        </div>
                        <div className="col-5">
                            <p className="mb-0 text-end sellAdmin__content-calc-price sellAdmin__content-calc-price-primary">0</p>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col">
                            <p className="mb-0 sellAdmin__content-calc-title">
                                Tổng tiền
                            </p>
                        </div>
                        <div className="col-5">
                            <h4 className="mb-0 text-end text-danger">22,000</h4>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paying" id="cash" />
                                <img className = "mx-2" src = "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" alt = ""/>
                                <label className="form-check-label cursor-pointer" htmlFor="cash"><small>Thanh toán tiền mặt sau khi nhận hàng</small></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-ad-primary w-100 p-3 me-1">
                        <h6 className="mb-0">Mua Hàng</h6>
                    </button>

                </div>
            </div>
        </>
    );
}

export default SaleAdminCheckout;