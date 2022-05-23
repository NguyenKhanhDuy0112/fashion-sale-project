function PaymentOption() {
    return (
        <div className="payment__option bg-white mt-xl-3 mt-2 border-radius-4 p-3">
            <p className="payment__option-title mb-3">
                Chọn hình thức thanh toán
            </p>
            <div className="row g-4">
                <div className="col-12">
                    <label className="payment__radio">
                        <input name = "method-payment" type="radio" className="payment__radio-input" />
                        <span className="payment__radio-fake"></span>
                        <span className="payment__radio-label d-flex align-items-center">
                            <img className="payment__option-img mx-2" style={{height: "32px", width: "32px"}} src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" alt="" />
                            <p className="payment__option-text mb-0">Thanh toán tiền mặt khi nhận hàng</p>
                        </span>
                    </label>
                </div>
                <div className="col-12">
                    <label className="payment__radio">
                        <input name = "method-payment" type="radio" className="payment__radio-input" />
                        <span className="payment__radio-fake"></span>
                        <span className="payment__radio-label d-flex align-items-center">
                            <img className="payment__option-img mx-2" style={{height: "32px", width: "32px"}} src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-viettelmoney.png" alt="" />
                            <p className="payment__option-text mb-0">Thanh toán bằng Viettel Money</p>
                        </span>
                    </label>
                </div>
                <div className="col-12">
                    <label className="payment__radio">
                        <input name = "method-payment" type="radio" className="payment__radio-input" />
                        <span className="payment__radio-fake"></span>
                        <span className="payment__radio-label d-flex align-items-center">
                            <img className="payment__option-img mx-2" style={{height: "32px", width: "32px"}} src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg" alt="" />
                            <p className="payment__option-text mb-0">Thanh toán bằng ví MoMo</p>
                        </span>
                    </label>
                </div>
                <div className="col-12">
                    <label className="payment__radio">
                        <input name = "method-payment" type="radio" className="payment__radio-input" />
                        <span className="payment__radio-fake"></span>
                        <span className="payment__radio-label d-flex align-items-center">
                            <img className="payment__option-img mx-2" style={{height: "32px", width: "32px"}} src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg" alt="" />
                            <p className="payment__option-text mb-0">Thanh toán bằng ví ZaloPay</p>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default PaymentOption;