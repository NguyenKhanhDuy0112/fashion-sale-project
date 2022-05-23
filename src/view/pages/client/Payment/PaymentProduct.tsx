function PaymentProduct() {
    return (
        <div className="payment__product d-flex">
            <div className="payment__product-background">
                <div className="payment__product-img" style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/96x96/ts/product/b9/98/bd/57eff889aae74c2d21ea379c8d63eda2.jpg.webp)` }}></div>
            </div>
            <div className="payment__product-info ms-2">
                <h5 className="payment__product-info-name">
                    Áo Thun Nam Polo Ngắn Tay 5S (APC21013) Chất Liêu 100% Coolmax Phối Viền Năng Động, Trẻ Trung, Nam Tính - TRẮNG - SIZE 40 (L)
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="payment__product-info-quantity">SL: x1</span>
                    <span className="payment__product-info-price">168.000 ₫</span>
                </div>
            </div>
        </div>
    );
}

export default PaymentProduct;