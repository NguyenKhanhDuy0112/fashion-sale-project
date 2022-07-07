import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import billsService from "../../../../services/billsService";
import productDetailsService from "../../../../services/productDetailsService";
import productsService from "../../../../services/productService";
import { formatDate, getDayInWeek, getTime } from "../../../../shared/helpers";
import { Bill, BillDetail } from "../../../../shared/interfaces";
import Account from "../Account";

function FollowOrder() {
    const { id } = useParams()
    const [order, setOrder] = useState<Bill>()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        handleLoadBill()
    }, [])

    const handleLoadBill = async () => {
        if (id) {
            const order = await billsService.findById(id)
            const billDetails: BillDetail[] = await []
            if (order.billDetails.length > 0) {
                await order.billDetails.forEach(async (b: any, index: number) => {
                    const productDetail = await productDetailsService.findById(b.productDetail)
                    const product = await productsService.findById(productDetail.product)
                    productDetail.product = await product
                    await billDetails.push({ ...b, productDetail: productDetail })
                    if (index === await order.billDetails.length - 1) {
                        await setOrder({ ...order, billDetails: billDetails })
                        setLoading(false)
                    }
                })
            }

        }
    }
    console.log("Order: ", order)

    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Theo dõi đơn hàng" />
            </div>
            <div className="followOrder bg-outside-client">
                <div className="container-client none">
                    <article className="breadcrumbCustom py-2 d-xl-block d-none">
                        <ul className="breadcrumbCustom__list align-items-start">
                            <li className="breadcrumbCustom__list-item">
                                <Link to="/" className="breadcrumbCustom__list-item-link">Trang chủ</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item">
                                <span className="breadcrumbCustom__list-item-link">
                                    Theo dõi đơn hàng
                                </span>
                            </li>
                        </ul>
                    </article>
                    <div className="row">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <article className="editAccount__desk">
                                <div className="d-flex justify-content-between mb-3">
                                    <h5 className="editAccount__title mb-4">
                                        Theo dõi đơn hàng #{`${id?.slice(0, 9)}`}
                                    </h5>
                                    <button onClick={() => navigate(`/order/history/${id}`)} className="d-xl-block d-none followOrder__btn-desk">
                                        Xem chi tiết đơn hàng
                                    </button>
                                </div>
                                <div className="row g-xl-3 g-0">
                                    <div className="col-xl-8 col-12 order-xl-first order-last">
                                        <div className="bg-white border-radius-4 p-3">
                                            <h4 className="followOrder-title">
                                                {
                                                    loading ?

                                                        <Skeleton height={20} />
                                                        :
                                                        order?.statusDetails[0].status === 3 ? 'Giao hàng thành công' :
                                                            `Giao vào ${getDayInWeek(order?.shippedDate ? new Date(order.shippedDate) : new Date())}, ${formatDate(order?.shippedDate ? new Date(order.shippedDate) : new Date(), "dd/MM/yyyy").slice(0, 5)}`

                                                }

                                            </h4>
                                            <p className="followOrder-title-sub">
                                                Được giao bởi Tiki
                                            </p>

                                            {
                                                loading ?

                                                    Array.from({ length: 3 }).map((b: any, idx: number) => (
                                                        <div key={idx} className="row g-2">
                                                            <div className="col-3">
                                                                <Skeleton height={50} />
                                                            </div>
                                                            <div className="col">
                                                                <Skeleton height={50} />
                                                            </div>

                                                        </div>
                                                    ))
                                                    :
                                                    order?.statusDetails.sort((a, b) => b.status - a.status).map((status, index: number) => (
                                                        <div key={index} className="followOrder__progress">
                                                            <div className="followOrder__progress-step">
                                                                <span className={`followOrder__progress-step-circle ${index === 0 ? 'active' : ''}`}>

                                                                </span>
                                                                <span className="followOrder__progress-step-line"></span>
                                                            </div>
                                                            <div className="followOrder__progress-info">
                                                                <div className={`followOrder__progress-info-status-text ${index === 0 ? 'active' : ''}`}>
                                                                    {status.status === 1 && 'Chờ xử lý'}
                                                                    {status.status === 2 && 'Đang vận chuyển'}
                                                                    {status.status === 3 && 'Giao thành công'}
                                                                </div>
                                                                <div className="followOrder__progress-info-status-time">
                                                                    {getTime(new Date(status.date))}, {getDayInWeek(new Date(status.date))} {formatDate(new Date(status.date), "dd-MM-yyyy")}
                                                                </div>
                                                                {index !== order.statusDetails.length - 1 && <div className="followOrder__progress-hint">

                                                                </div>
                                                                }
                                                            </div>

                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="bg-white border-radius-4 p-3 mb-xl-0 mb-3">
                                            <h6 className="mb-3 d-xl-block d-none">Kiện hàng gồm</h6>

                                            {
                                                loading ?
                                                    Array.from({ length: 3 }).map((ske: any, index: number) => (
                                                        <div className="row g-2 align-items-center">
                                                            <div className="col-3">
                                                                <Skeleton height={40} />
                                                            </div>
                                                            <div className="col">
                                                                <Skeleton height={20} />
                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    order && order.billDetails && order.billDetails.map((b: any) => {
                                                        return <div key={b._id} className="followOrder__package d-flex align-items-center my-1">
                                                            <div style={{ backgroundImage: `url(${b.productDetail.images[0].image})` }} className="followOrder__package-img">
                                                                <span className="followOrder__package-quantity">
                                                                    x{b.quantity}
                                                                </span>
                                                            </div>
                                                            <div className="followOrder__package-content">
                                                                <Link to={`/products/${b.productDetail.product.slug}?spId=${b.productDetail._id}`} className="followOrder__package-content-name">
                                                                    {b.productDetail.product?.name} - <span className="text-uppercase">{b.productDetail.color.color}</span> -  <span className="text-uppercase">{b.productDetail.size.size}</span>

                                                                </Link>
                                                                <p className="mb-0 followOrder__package-content-text">
                                                                    Được giao bởi Tiki
                                                                </p>
                                                            </div>
                                                        </div>
                                                    })

                                            }

                                        </div>

                                    </div>

                                </div>
                                <div className="px-3 d-xl-none d-flex justify-content-center align-items-center mt-3">
                                    <button onClick={() => navigate(`/order/history/${id}`)} className="followOrder__btn-detail w-100">Xem chi tiết đơn hàng</button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FollowOrder;