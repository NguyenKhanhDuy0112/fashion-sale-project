import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import TableCustom from "../../../../shared/components/TableCustom";
import { Trademark } from "../../../../shared/interfaces";

interface Props {
    data: Trademark[],
    loading: boolean,
    onEditTrademark: (slug: string) => void,
    onDeleteTrademark: (id: string) => void,
}


function TrademarkTable(props: Props) {
    const { data, onEditTrademark, onDeleteTrademark, loading } = props
    const [trademarks, setTrademarks] = useState<Trademark[]>()

    useEffect(() => {
        setTrademarks(data)
    }, [data])

    return (
        <TableCustom headers={["#", "Hình", "Tên", "Hành Động"]}>
            {
                loading ?
                    Array.from({ length: 8 }).map((ite, index: number) => (
                        <tr key={index}>
                            <td><Skeleton /></td>
                            <td><Skeleton /></td>
                            <td><Skeleton /></td>
                            <td><Skeleton /></td>
                        </tr>
                    ))
                    :
                    trademarks?.map((trademark, index) => (
                        <tr key={trademark._id}>
                            <td>{index + 1}</td>
                            <td>
                                {<img
                                    src={trademark.image} alt=""
                                    style={{
                                        width: "30px", height: "30px",
                                        objectFit: "cover"
                                    }}
                                />
                                }
                            </td>
                            <td>{trademark.name}</td>
                            <td >
                                {<div className="d-flex justify-content-center">
                                    <span onClick={() => onEditTrademark(trademark._id)} className="btn-edit cursor-pointer me-1">
                                        <BiEdit size={20} />
                                    </span>
                                    <span onClick={() => onDeleteTrademark(trademark._id)} className="btn-delete cursor-pointer ms-1">
                                        <FiTrash2 size={20} />
                                    </span>
                                </div>
                                }
                            </td>
                        </tr>
                    ))

            }

        </TableCustom>
    );
}

export default TrademarkTable;