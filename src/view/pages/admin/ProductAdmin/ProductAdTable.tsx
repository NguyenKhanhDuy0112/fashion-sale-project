import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import TableCustom from "../../../../shared/components/TableCustom";
import { Product } from "../../../../shared/interfaces";

interface Props {
    data: Product[],
    onEditProduct: (slug: string) => void,
    onDeleteProduct: (id: string) => void,
}

function ProductAdTable(props: Props) {
    const { data, onEditProduct, onDeleteProduct } = props
    const [products, setProducts] = useState<Product[]>()

    useEffect(() => {
        setProducts(data)
    }, [data])

    return (
        <>
            <TableCustom headers={["#", "Tên", "Giá tiền","Đơn vị", "Xuất xứ", "Chất liệu", "Chi tiết", "Hành Động"]}>
                {products && products.map((product, index) => (
                    <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td className = "text-end">{product.price}</td>
                        <td>{product.unit}</td>
                        <td>{product.origin}</td>
                        <td>{product.material}</td>
                        <td className="">
                            <div className="d-flex justify-content-center">
                                <Link to = {`/admin/products/${product.slug}`} className="cursor-pointer btn-edit">
                                    <AiOutlineEye size={20} />
                                </Link>
                            </div>
                        </td>
                        <td >
                            <div className="d-flex justify-content-center">
                                <span
                                    onClick={() => onEditProduct(product._id ? product._id : '')}
                                    className="btn-edit cursor-pointer me-1"
                                >
                                    <BiEdit size={20} />
                                </span>
                                <span
                                    onClick={() => onDeleteProduct(product._id)}
                                    className="btn-delete cursor-pointer ms-1"
                                >
                                    <FiTrash2 size={20} />
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
            </TableCustom>
        </>
    );
}

export default ProductAdTable;