import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatCashVND } from "../../../../shared/helpers";
import { Product } from "../../../../shared/interfaces";

interface Props {
    data: Product[],
    isLoading: boolean,
    onEditProduct: (slug: string) => void,
    onDeleteProduct: (id: string) => void,
}

function ProductAdTable(props: Props) {
    const { data, onEditProduct, onDeleteProduct, isLoading } = props
    const [products, setProducts] = useState<Product[]>()

    useEffect(() => {
        setProducts(data)
    }, [data])

    return (
        <>
            <TableCustom headers={["#", "Tên", "Giá tiền", "Đơn vị", "Xuất xứ", "Chất liệu", "Chi tiết", "Hành Động"]}>
                {isLoading ?
                    Array.from({ length: 10 }).map((tr, index) => (
                        <tr key={index}>
                            {Array.from({ length: 8 }).map((td, idx) => <td key={idx}><Skeleton /></td>)}
                        </tr>
                    ))
                    : (
                        (products && products.length > 0) ?
                            products?.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td className="text-end">{formatCashVND(product.price + "", ".")}</td>
                                    <td>{product.unit}</td>
                                    <td>{product.origin}</td>
                                    <td>{product.material}</td>
                                    <td className="">
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/admin/products/${product.slug}`} className="cursor-pointer btn-edit">
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
                            ))
                            :
                            <tr>
                                <td className="text-center" colSpan={8}>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <img style={{ width: "200px", height: "200px" }} src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" alt="" />
                                        <p className="mt-2 mb-0">Không có dữ liệu.</p>
                                    </div>
                                </td>
                            </tr>
                    )}
            </TableCustom>
        </>
    );
}

export default ProductAdTable;