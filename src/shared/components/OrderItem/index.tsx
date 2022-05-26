import { AiOutlineStop } from "react-icons/ai";
import { useNavigate } from "react-router";

function OrderItem() {
    const navigate = useNavigate()

    return (
        <div className="orderItem p-3 border-radius-4">
            <div className="orderItem__header d-flex align-items-center pb-2">
                <span className="orderItem__header-status">
                    <AiOutlineStop />
                </span>
                <span className="orderItem__header-status ms-2">
                    Đã hủy
                </span>
            </div>
            <div className="orderItem__body py-2">
                <div className="d-flex align-items-center">
                    <div className="orderItem__body-img" style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/200x200/ts/product/0e/bb/92/decfe5388018bc718294a0db45d456dd.png)` }}></div>
                    <div className="ms-2">
                        <h5 className="orderItem__body-title">
                            Áo Thun Nam AMES Có Cổ Trơn 5S ( 8 màu), Vải Coolmax Co Giãn Nhẹ, Phối Logo Thêu Trẻ Trung, Phom Cơ Bản  - TRT - XL
                        </h5>
                        <div className="d-flex align-item-center">
                            <span className="orderItem__body-quantity">
                                1 sản phẩm
                            </span>
                            <div className="orderItem__body-separate"></div>
                            <span className="orderItem__body-price">
                                189.000đ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="orderItem__footer d-flex justify-content-end pt-2">
                <div className="d-flex flex-column">
                    <p className="orderItem__footer-total mb-1">Tổng tiền: 189.000đ</p>
                    <div className="d-flex align-item-center">
                        <button  className="orderItem__footer-btn me-1">
                            Mua lại
                        </button>
                        <button onClick={() => navigate("/order/history/1")} className="orderItem__footer-btn ms-1">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;