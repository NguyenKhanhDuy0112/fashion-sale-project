import { SyntheticEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { ProductDetailOrder, User } from "../../../../shared/interfaces";
import SearchProduct from "./SearchProduct";
import SellAdminCheckout from "./SellAdminCheckout"
import SellAdminTable from "./SellAdminTable";
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

interface Order {
    id?: number,
    title?: string,
    method: string,
    customer?: User,
    products: ProductOrder[],
}

function SellAdmin() {
    const [orders, setOrders] = useState<Order[]>([{ id: 1, title: 'Đặt hàng 1', products: [], method: "COD" }])
    const [selected, setSelected] = useState<number>(0)
    const [loading, setLoading] = useState(false)

    const handleChangeSelected = (idx: number) => {
        setSelected(idx)
    }

    const handleDeleteTab = (e: SyntheticEvent, idx: number) => {
        e.stopPropagation()

        if (orders.length > 1) {
            const newOrders = orders
            newOrders.splice(idx, 1)
            setOrders(newOrders)
            setSelected(idx > 0 ? idx - 1 : 0)
        }
    }

    const handleCreateTab = () => {
        const lastOrder = orders[orders.length - 1]
        const numberOrder = lastOrder.id && lastOrder.id + 1

        const order = {
            id: numberOrder,
            method: "COD",
            title: `Đặt hàng ${numberOrder}`,
            products: []
        }
        setOrders(prev => [...prev, order])
    }

    const handleAddProduct = (product: ProductOrder) => {
        setLoading(!loading)
        const newOrders = orders
        newOrders[selected].products = [...newOrders[selected].products, product]
        setOrders(newOrders)
    }

    const handleChangeMainProduct = (indexProduct: number, color: string, size: string) => {
        setLoading(!loading)
        const newOrders = orders
        const product = orders[selected].products.find((pro, index) => index === indexProduct)
        const productDetail = product?.productDetails.find(pro => pro.color === color && pro.size === size)

        if (product && product.mainProduct) {
            product.mainProduct = productDetail ? productDetail : { _id: '', color: '', images: [''], quantity: 1, size: '' }
        }

        if (newOrders[selected].products[indexProduct]) {
            newOrders[selected].products[indexProduct] = product ? product : { _id: '', amount: 0, description: '', mainProduct: { _id: '', color: '', images: [''], quantity: 1, size: '' }, material: '', name: '', origin: '', price: 0, productDetails: [], unit: '' }
        }
        console.log(newOrders[selected].products)
        setOrders(newOrders)
    }

    const handleDeleteProduct = (idx: number) => {
        setLoading(!loading)
        const newOrders = orders
        newOrders[selected].products.splice(idx, 1)
        setOrders(newOrders)
    }

    const handleChangeQuantity = (idx: number, quantity: number) => {
        setLoading(!loading)
        const newOrders = orders
        newOrders[selected].products[idx].mainProduct.quantity = quantity
        console.log(newOrders[selected].products)
        setOrders(orders)
    }

    return (
        <>
            <h5 className="title-admin mb-0">Đặt hàng</h5>
            <div className="sellAdmin__header">
                <div className="row align-items-center p-2 g-3 g-lg-1">
                    <div className="col-lg-4">
                        <SearchProduct onAddProduct={(product) => handleAddProduct(product)} />
                    </div>
                </div>
            </div>

            <ul className="m-0 p-0 d-flex align-items-center bg-white">
                {orders.map((order: Order, index: number) => {
                    let style = index === selected ? 'active' : ''
                    return (
                        <li
                            key={order.id}
                            className={`sellAdmin__header-list-item ${style}`}
                            onClick={() => handleChangeSelected(index)}
                        >

                            {order.title}
                            <span
                                onClick={(e: SyntheticEvent) => handleDeleteTab(e, index)}
                                className="sellAdmin__header-list-item-icon ms-2"
                            >
                                <IoClose />
                            </span>
                        </li>
                    )
                })}
                <li>
                    <button
                        onClick={handleCreateTab}
                        className="imageUploading__add ms-2"
                    >
                        <AiOutlinePlus />
                    </button>
                </li>
            </ul>
            <div>
                <div className="bg-white" style={{ minHeight: "80vh" }}>
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <SellAdminTable
                                onChangeQuantity={(idxProduct, quantity) => handleChangeQuantity(idxProduct, quantity)}
                                onDeleteProduct={(idxProduct) => handleDeleteProduct(idxProduct)}
                                onChangeMainProduct={(idxProduct, color, size) => handleChangeMainProduct(idxProduct, color, size)} data={orders[selected].products} />
                        </div>
                        <div className="col">
                            <div>
                                <SellAdminCheckout data={orders[selected].products} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <TabCustom>
                {orders.map(order => (
                    <PaneCustom key={order.id} title={order.title ? order.title : ''}>
                        <div className="bg-white">
                            <div className="row">
                                <div className="col-8">
                                    <SellAdminTable data={order.products} />
                                </div>
                                <div className="col">
                                    <SellAdminCheckout />
                                </div>
                            </div>
                        </div>
                    </PaneCustom>
                ))}
            </TabCustom> */}

        </>
    );
}

export default SellAdmin;