import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatCashVND, formatDate } from "../../../../shared/helpers"
import { Bill } from "../../../../shared/interfaces";

interface Props {
    data: Bill[],
    loading: boolean
}
function ImportAdTable(props: Props) {
    const { data, loading } = props
    const [bills, setBills] = useState<Bill[]>()

    useEffect(() => {
        setBills(data)
    }, [data])

    return (
        <>
            <TableCustom headers={["#", "Ngày tạo", "Số điện thoại", "Địa chỉ", "HTTT", "Tổng tiền", "Hóa đơn"]}>
                {loading ?
                    Array.from({ length: 8 }).map((ite: any, index: number) => (
                        <tr key = {index}>
                            {Array.from({ length: 7 }).map((ite: any, index: number) => (
                                <td key = {index}><Skeleton /></td>
                            ))}
                        </tr>
                    ))
                    :
                    (bills && bills.length > 0) ?
                        bills && bills.map((bill, index) => {
                            return (
                                <tr key={bill._id}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(new Date(bill.createdAt ? bill.createdAt : ''), "dd/MM/yyyy")}</td>
                                    <td>{bill.user?.phone}</td>
                                    <td>{bill.user?.address}</td>
                                    <td>Chuyển khoản</td>
                                    <td className="text-end">{formatCashVND(String(bill.totalPrice), ".")}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/admin/imports/${bill._id}`} className="cursor-pointer btn-edit">
                                                <AiOutlineEye size={20} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        :
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

export default ImportAdTable;