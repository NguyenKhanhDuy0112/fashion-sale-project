import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import InputQuantity from "../../../../shared/components/InputQuantity";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatCashVND } from "../../../../shared/helpers";
import { ProductDetailOrder } from "../../../../shared/interfaces";

interface ProductOrder {
    _id: string,
    name: string,
    material: string,
    origin: string,
    description: string,
    unit: string,
    slug?: string,
    trademark?: any,
    price: number,
    rating?: number,
    category?: any,
    createdAt?: any,
    updatedAt?: any,
    amount: number,
    productDetails: ProductDetailOrder[],
    mainProduct: ProductDetailOrder
}
interface SellTable {
    data: ProductOrder[],
    onChangeMainProduct: (indexProduct: number, color: string, size: string) => void,
    onChangeQuantity: (indexProduct: number, quantity: number) => void,
    onDeleteProduct: (indexProduct: number) => void
}

function SellAdminTable(props: SellTable) {
    const { data, onChangeMainProduct, onChangeQuantity, onDeleteProduct } = props
    const [products, setProducts] = useState<ProductOrder[]>(data)
    const [searchPrams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setProducts(data)
    }, [data])

    return (
        <div style={{ minHeight: "60vh" }}>
            <TableCustom headers={["#", "Hình", "Tên", "Màu", "Kích cỡ", "Số lượng", "Đơn giá", "Tổng tiền", "Hành động"]}>
                {products && products.length > 0 && products.map((pro, index) => {
                    let colors: Set<string> = new Set()
                    let sizes: Set<string> = new Set()
                    pro.productDetails.forEach((proItem) => {
                        colors.add(proItem.color)
                        sizes.add(proItem.size)
                    })

                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img style={{ width: "50px", height: "50px" }} src={pro.mainProduct.images[0]} alt="" />
                            </td>
                            <td>{pro.name}</td>
                            <td>
                                <select
                                    onChange={(e) => onChangeMainProduct(index, e.target.value, pro.mainProduct.size)}
                                    className="tableCustom__select" value={pro.mainProduct.color}
                                >
                                    {Array.from(colors).map((color) => <option value={color}>{color.toUpperCase()}</option>)}
                                </select>
                            </td>
                            <td>
                                <select
                                    onChange={(e) => onChangeMainProduct(index, pro.mainProduct.color, e.target.value)}
                                    className="tableCustom__select" value={pro.mainProduct.size}
                                >
                                    {Array.from(sizes).map((size) => <option value={size}>{size.toUpperCase()}</option>)}
                                </select>
                            </td>
                            <td className="text-end">
                                <div className="d-flex justify-content-center">
                                    <InputQuantity max={searchPrams.get('type') === 'import' ? 10000000 : 100} onQuantity={(number) => onChangeQuantity(index, number)} value={pro.mainProduct.quantity} />
                                </div>
                            </td>
                            <td className="text-end">{formatCashVND(pro.price + "", ".")}</td>
                            <td className="text-end">{formatCashVND(pro.mainProduct.quantity * pro.price + "", ".")}</td>
                            <td className="">
                                <div className="d-flex justify-content-center">
                                    <span className="btn-delete cursor-pointer" onClick={() => onDeleteProduct(index)}>
                                        <FiTrash2 size={20} />
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </TableCustom>
        </div>
    );
}

export default SellAdminTable;