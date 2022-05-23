import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { ProductOrder } from "../../../../modules/orderAd/orderInterface";
import InputQuantity from "../../../../shared/components/InputQuantity";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatCashVND } from "../../../../shared/helpers";

interface SellTable {
    data: ProductOrder[]
}

function SellAdminTable(props: SellTable) {

    const { data } = props

    const [quantity, setQuantity] = useState(1)

    return (
        <TableCustom headers={["#", "Tên", "Màu", "Kích cỡ", "Số lượng", "Đơn giá", "Tổng tiền", "Hành động"]}>
            {data.map((pro, index) => (
                <tr>
                    <td>{index + 1}</td>
                    <td>{pro.name}</td>
                    <td>Đỏ</td>
                    <td>M</td>
                    <td className="text-end">
                        <div className="d-flex justify-content-center">
                            <InputQuantity max={10} onQuantity={(number) => setQuantity(number)} value={pro.quantity} />
                        </div>
                    </td>
                    <td className="text-end">{formatCashVND(pro.price + "", ".")}</td>
                    <td className="text-end">10.000</td>
                    <td className="">
                        <div className="d-flex justify-content-center">
                            <span className="btn-delete">
                                <FiTrash2 size={20} />
                            </span>
                        </div>
                    </td>
                </tr>
            ))}
        </TableCustom>
    );
}

export default SellAdminTable;