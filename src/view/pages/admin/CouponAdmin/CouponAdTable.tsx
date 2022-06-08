import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatDate } from "../../../../shared/helpers";
import { Coupon } from "../../../../shared/interfaces";

interface Props {
    data: Coupon[],
    loading: boolean,
    onEditCoupon: (slug: string) => void,
    onDeleteCoupon: (id: string) => void,
}

function CouponAdTable(props: Props) {
    const { data, onEditCoupon, onDeleteCoupon, loading } = props
    const [coupons, setCoupons] = useState<Coupon[]>()

    useEffect(() => {
        setCoupons(data)
    }, [data])

    return (
        <TableCustom headers={["#", "Mã", "Ngày bắt đầu", "Ngày kết thúc", "Số tiền tối thiểu", "Hành Động"]}>
            {loading ?
                Array.from({ length: 8 }).map((ite: any, index: number) => (
                    <tr key = {index}>
                        {Array.from({ length: 6 }).map((ite: any, index: number) => (
                            <td key = {index}><Skeleton /></td>
                        ))}
                    </tr>
                ))
                :
                (coupons && coupons.length > 0) ?

                    coupons.map((coupon: Coupon, index: number) => {
                        const dateStart = coupon.dateStart ? new Date(coupon.dateStart) : new Date()
                        const endDate = coupon.dateEnd ? new Date(coupon.dateEnd) : new Date()
                        
                        return (
                            <tr key = {coupon._id}>
                                <td>{index + 1}</td>
                                <td>{coupon.code}</td>
                                <td>{`${formatDate(dateStart, "dd/MM/yyyy")}`}</td>
                                <td>{`${formatDate(endDate, "dd/MM/yyyy")}`}</td>
                                <td className="text-end">{coupon.discount}</td>
                                <td >
                                    <div className="d-flex justify-content-center">
                                        <span onClick={() => onEditCoupon(coupon._id ? coupon._id : '')} className="btn-edit cursor-pointer me-1">
                                            <BiEdit size={20} />
                                        </span>
                                        <span onClick={() => onDeleteCoupon(coupon._id ? coupon._id  : '')} className="btn-delete cursor-pointer ms-1">
                                            <FiTrash2 size={20} />
                                        </span>
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
    );
}

export default CouponAdTable;