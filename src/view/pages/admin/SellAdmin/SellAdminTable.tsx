import { FiTrash2 } from "react-icons/fi";
import { ProductOrder } from "../../../../modules/orderAd/orderInterface";
import TableCustom from "../../../../shared/components/TableCustom";

interface SellTable {
    data: ProductOrder[]
}

function SellAdminTable(props: SellTable) {

    const { data } = props

    return (
        <TableCustom headers={["#", "Tên", "Số lượng", "Đơn giá", "Hành động"]}>
            {data.map((pro, index) => (
                <tr>
                    <td>{index}</td>
                    <td>{pro.name}</td>
                    <th>{pro.quantity}</th>
                    <th>{pro.price}</th>
                    <th>
                        <span className="btn-delete">
                            <FiTrash2 size={20} />
                        </span>
                    </th>
                </tr>
            ))}
        </TableCustom>
    );
}

export default SellAdminTable;