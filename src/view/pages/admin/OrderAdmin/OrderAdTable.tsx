import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showToast } from "../../../../modules/toast/toastSlice";
import billsService from "../../../../services/billsService";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatCashVND, formatDate } from "../../../../shared/helpers";
import { Bill } from "../../../../shared/interfaces";

interface Props {
    data: Bill[],
    loading: boolean,
    onLoadData: () => void
}
function OrderAdTable(props: Props) {
    const { data, loading, onLoadData } = props
    const [bills, setBills] = useState<Bill[]>()
    const dispatch = useDispatch()

    useEffect(() => {
        setBills(data)
    }, [data])

    const handleChangeStatus = async (bill: Bill, value: string) => {
        await billsService.update(bill._id ? bill._id : '', {...bill, status: +value})
        await dispatch(showToast({ show: true, text: "Cập nhật trạng thái thành công", type: "success", delay: 1500 }))
        await onLoadData()
    }

    return (
        <>
            <TableCustom headers={["#", "Ngày tạo", "Số điện thoại", "HTTT", "Tổng tiền", "Trạng thái", "Xem chi tiết"]}>
                {loading
                    ?
                    Array.from({ length: 8 }).map((ite: any, index: number) => (
                        <tr key = {index}>
                            {Array.from({ length: 7 }).map((ite: any, index: number) => (
                                <td key = {index}><Skeleton /></td>
                            ))}
                        </tr>
                    ))
                    :
                    (bills && bills.length > 0) ?
                        bills.map((bill, index) => {
                            return (
                                <tr key={bill._id}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(bill.createdAt ? new Date(bill.createdAt) : new Date(), "dd/MM/yyyy")}</td>
                                    <td>{bill.user?.phone}</td>
                                    <td>COD</td>
                                    <td className="text-end">{formatCashVND(bill.totalPrice+"", ",")}</td>
                                    <td>
                                        <select
                                            className="tableCustom__select"
                                            onChange = {(e) => handleChangeStatus(bill, e.target.value)}
                                            value={bill.status}
                                        >
                                            <option hidden>Status</option>
                                            <option value="3">Đã giao</option>
                                            <option value="2">Đang giao</option>
                                            <option value="0">Hủy</option>
                                            <option value="1">Chờ xử lý</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/admin/orders/${bill._id}`} className="cursor-pointer btn-edit">
                                                <AiOutlineEye size={20} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) :
                        <tr>
                            <td className="text-center" colSpan={7}>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <img style={{ width: "200px", height: "200px" }} src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" alt="" />
                                    <p className="mt-2 mb-0">Không có dữ liệu.</p>
                                </div>
                            </td>
                        </tr>

                }
            </TableCustom>
        </>
    );
}

export default OrderAdTable;