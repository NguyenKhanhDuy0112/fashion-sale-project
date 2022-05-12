import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import TableCustom from "../../../../shared/components/TableCustom";
import { Category, Coupon } from "../../../../shared/interfaces";

interface Props {
    data: Category[],
    onEditCoupon: (slug: string) => void,
    onDeleteCoupon: (id: string) => void,
}

function CouponAdTable(props: Props) {

    const { data, onEditCoupon, onDeleteCoupon } = props
    const [categories, setCategories] = useState<Category[]>()

    useEffect(() => {
        setCategories(data)
    }, [data])

    return (
        <TableCustom headers={["#", "Mã", "Ngày bắt đầu", "Ngày kết thúc", "Số tiền tối thiểu","Hành Động"]}>
            <tr>
                <td>1</td>
                <td>HUYS09033</td>
                <td>20/2/2022</td>
                <td>20/5/2022</td>
                <td className = "text-end">200,000</td>
                <td >
                    <div className="d-flex justify-content-center">
                        <span onClick={() => onEditCoupon('')} className="btn-edit cursor-pointer me-1">
                            <BiEdit size={20} />
                        </span>
                        <span onClick={() => onDeleteCoupon('')} className="btn-delete cursor-pointer ms-1">
                            <FiTrash2 size={20} />
                        </span>
                    </div>
                </td>
            </tr>
        </TableCustom>
    );
}

export default CouponAdTable;