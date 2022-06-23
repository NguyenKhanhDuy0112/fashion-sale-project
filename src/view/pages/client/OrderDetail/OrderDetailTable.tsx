import { Link } from "react-router-dom";
import { formatCashVND } from "../../../../shared/helpers";
import { BillDetail } from "../../../../shared/interfaces";

interface OrderDetailTableProps {
    billDetails?: BillDetail[]
}

function OrderDetailTable(props: OrderDetailTableProps) {
    const { billDetails } = props

    return (
        <table className="orderDetail__table">
            <thead className="">
                <tr className="d-xl-table-row d-none">
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Giảm giá</th>
                    <th>Tạm tính</th>
                </tr>
            </thead>

            <tbody>
                {billDetails && billDetails.map(bdt => (
                    <tr key={bdt._id}>
                        <td>
                            <div className="orderDetail__table-item d-flex">
                                <div
                                    className="orderItem__body-img"
                                    style={{ backgroundImage: `url(${bdt.productDetail.images[0]})` }}
                                >

                                </div>
                                <div className="d-flex flex-column ms-2">
                                    <Link to="/" className="orderDetail__table-item-title">
                                        {bdt.productDetail && bdt.productDetail.product && bdt.productDetail.product.name} -
                                        <span className="text-uppercase">
                                            {bdt.productDetail.size}
                                        </span> -
                                        <span className="text-uppercase">
                                            {bdt.productDetail.color}
                                        </span>
                                    </Link>
                                    <div className="d-xl-none d-block">
                                        {formatCashVND(bdt.productDetail.product ? (bdt.productDetail.product.price ? bdt.productDetail.product.price - (bdt.productDetail.product.price * (bdt.productDetail.product.discount ? bdt.productDetail.product.discount / 100 : 0)) : 0) + "" : '', ".")}s
                                        x {bdt.quantity}
                                    </div>
                                    <button className="orderDetail__table-item-btn mt-2">
                                        Mua lại
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td className="d-xl-table-cell d-none">
                            {formatCashVND(bdt.price + "", ".")}đ
                        </td>
                        <td className="d-xl-table-cell d-none">
                            {bdt.quantity}
                        </td>
                        <td className="d-xl-table-cell d-none">
                            {bdt.discount ? bdt.discount : 0}đ
                        </td>
                        <td className="d-xl-table-cell d-none">
                            {formatCashVND(bdt.price + "", ".")}đ
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
}

export default OrderDetailTable;