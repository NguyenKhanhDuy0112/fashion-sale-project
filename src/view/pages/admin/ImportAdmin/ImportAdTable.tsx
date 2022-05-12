import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import TableCustom from "../../../../shared/components/TableCustom";
import { Bill } from "../../../../shared/interfaces";

interface Props {
    data: Bill[]
}
function ImportAdTable(props: Props) {
    const { data } = props
    const [bills, setBills] = useState<Bill[]>()

    useEffect(() => {
        setBills(data)
    }, [data])

    return (
        <>
            <TableCustom headers={["#", "Ngày tạo", "Số điện thoại", "Địa chỉ","HTTT", "Tổng tiền", "Hóa đơn"]}>
                {bills && bills.map((bill, index) => {
                    const dateJoin = bill.date ? new Date(bill?.date) : new Date()
                    return (
                        <tr key={bill._id}>
                            <td>{index + 1}</td>
                            <td>{bill.date ? `${dateJoin.getDate()}/${dateJoin.getMonth() + 1}/${dateJoin.getFullYear()}` : ''}</td>
                            <td>{bill.user?.phone}</td>
                            <td>{bill.user?.address}</td>
                            <td>Chuyển khoản</td>
                            <td>200,000</td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/admin/orders/${bill._id}`} className="cursor-pointer btn-edit">
                                        <AiOutlineEye size={20} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </TableCustom>
        </>
    );
}

export default ImportAdTable;