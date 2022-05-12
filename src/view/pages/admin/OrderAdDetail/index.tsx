import { AiOutlinePrinter } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import Status from "../../../../shared/components/Status";
import TableCustom from "../../../../shared/components/TableCustom";

function OrderAdDetail() {
    return (
        <div className="">
            <h6 className="fw-bold py-4 mb-0 dashboard__title margin-top-3">Hóa Đơn</h6>
            <div className="invoiceAdmin p-3">
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <h5 className="text-uppercase">Hóa Đơn</h5>
                        <p className="invoiceAdmin__title-text">
                            Trạng thái: <Status status="Chờ xử lý" type="pending" />
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-5 text-md-end text-start">
                        <h5 className="d-flex justify-content-md-end justify-content-start align-items-center">
                            <FaShoppingBag className="text-success" /> Công ty TNHH Fashion
                        </h5>
                        <p className="invoiceAdmin__text">
                            Quận 12, TPHCM
                        </p>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <h6 className="invoiceAdmin__title">DATE</h6>
                        <p className="invoiceAdmin__text">1/1/2022</p>
                    </div>
                    <div className="col-xl-3 col-lg-5 col-md-4 text-md-end text-start">
                        <h6 className="invoiceAdmin__title">Khách hàng</h6>
                        <p className="invoiceAdmin__text">
                            Nguyễn Nhựt Quốc
                        </p>
                    </div>
                </div>
                <TableCustom headers={["#", "sản phẩm", "Số lượng", "Giá tiền", "Giảm giá", "Tổng tiền"]}>
                    <tr  className="tableAdmin__tr">
                        <td className="tableAdmin__td">1</td>
                        <td className="tableAdmin__td">Áo thun nam</td>
                        <td className="tableAdmin__td">2</td>
                        <td className="tableAdmin__td">200,000</td>
                        <td className="tableAdmin__td">0%</td>
                        <td className="tableAdmin__td">200,000</td>
                    </tr>

                </TableCustom>
                <div className="invoiceAdmin__total p-4 mt-5">
                    <div className="row align-items-center g-4">
                        <div className="col-lg">
                            <h6 className="invoiceAdmin__title">PHƯƠNG THỨC THANH TOÁN</h6>
                            <p className="invoiceAdmin__title-text mb-0">COD</p>
                        </div>
                        <div className="col-lg">
                            <h6 className="invoiceAdmin__title">PHÍ GIAO HÀNG</h6>
                            <p className="invoiceAdmin__title-text mb-0">10,00</p>
                        </div>
                        <div className="col-lg">
                            <h6 className="invoiceAdmin__title">GIẢM GIÁ</h6>
                            <p className="invoiceAdmin__title-text mb-0">0%</p>
                        </div>
                        <div className="col-lg-auto">
                            <h6 className="invoiceAdmin__title">TỔNG TIỀN</h6>
                            <p className="invoiceAdmin__title-text invoiceAdmin__title-text-danger mb-0">210,000</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 d-flex justify-content-end">
                <button className="btn btn-ad-primary text-white" onClick={() => window.print()}>
                    In Hóa Đơn <AiOutlinePrinter />
                </button>
            </div>
        </div>
    );
}

export default OrderAdDetail;