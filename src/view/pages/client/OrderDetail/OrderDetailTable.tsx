import { Link } from "react-router-dom";

function OrderDetailTable() {
    return (
        <table className="orderDetail__table">
            <thead className="d-xl-block d-none">
                <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Giảm giá</th>
                    <th>Tạm tính</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <div className="orderDetail__table-item d-flex">
                            <div className="orderItem__body-img" style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/200x200/ts/product/0e/bb/92/decfe5388018bc718294a0db45d456dd.png)` }}></div>
                            <div className="d-flex flex-column ms-2">
                                <Link to="/" className="orderDetail__table-item-title">
                                    Áo Thun Nam AMES Có Cổ Trơn 5S ( 8 màu), Vải Coolmax Co Giãn Nhẹ, Phối Logo Thêu Trẻ Trung, Phom Cơ Bản  - TRT - XL
                                </Link>
                                <div className="d-xl-none d-block">
                                    189.000 x 1
                                </div>
                                <button className="orderDetail__table-item-btn mt-2">
                                    Mua lại
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className="d-xl-block d-none">
                        189.000đ
                    </td>
                    <td className="d-xl-block d-none">
                        1
                    </td>
                    <td className="d-xl-block d-none">
                        0đ
                    </td>
                    <td className="d-xl-block d-none">
                        189.000đ
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrderDetailTable;