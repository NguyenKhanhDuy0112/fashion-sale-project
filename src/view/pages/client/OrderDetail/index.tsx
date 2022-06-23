import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import billsService from "../../../../services/billsService";
import productDetailsService from "../../../../services/productDetailsService";
import productsService from "../../../../services/productService";
import { formatCashVND, formatDate, getDayInWeek, getTime } from "../../../../shared/helpers";
import { Bill } from "../../../../shared/interfaces";
import Account from "../Account";
import OrderDetailTable from "./OrderDetailTable";

function OrderDetail() {
    const [bill, setBill] = useState<Bill>()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        handleLoadBill()
    }, [])

    const handleLoadBill = async () => {
        const bill = await billsService.findById(id ? id : '')
        const billDetails: any = await []
        if (bill && bill.billDetails && bill.billDetails.length > 0) {
            await bill.billDetails.forEach(async (bdt: any, index: number) => {
                const productDetail = await productDetailsService.findById(bdt.productDetail)

                const product = await productsService.findById(productDetail.product)

                productDetail.images = await [productDetail.images[0].image, ...productDetail.images[0].imagesSub]
                productDetail.color = await productDetail.color.color
                productDetail.size = await productDetail.size.size
                productDetail.product = await product

                await billDetails.push({ ...bdt, productDetail: productDetail })
                if (index === await bill.billDetails.length - 1) {
                    bill.billDetails = await billDetails
                    await setBill(bill)
                    setLoading(false)
                }
            })

        }
    }

    console.log("Bill detail: ", bill)

    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Chi tiết đơn hàng" />
            </div>
            <section className="orderDetail bg-outside-client pb-3">
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
                                    Đơn hàng của tôi
                                </span>
                            </li>
                        </ul>
                    </article>
                    <div className="row g-xl-3 g-0 mt-xl-0 mt-5 pt-xl-0 pt-3">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <h5 className="editAccount__title mb-4">
                                {loading ? <Skeleton /> : `Chi tiết đơn hàng #${id} - ${bill?.status === 0 ? 'Hủy' : bill?.status === 1 ? 'Chờ xử lý' : bill?.status === 2 ? 'Đang giao' : 'Giao thành công'}`}
                            </h5>
                            <div className="d-flex mb-3 justify-content-end">
                                <span className="orderDetail__date">
                                    Ngày đặt hàng: {getTime((bill && bill.createdAt) ? new Date(bill.createdAt) : new Date())} {formatDate(bill?.createdAt ? new Date(bill.createdAt) : new Date(), "dd/MM/yyyy")}
                                </span>
                            </div>
                            <div className="row g-xl-3 g-0 row-cols-xl-3 row-cols-1">
                                <div className="col">
                                    <p className="mb-2 orderDetail__title">Địa chỉ người nhận</p>
                                    {loading ?
                                        <Skeleton height={80} />
                                        :
                                        <div className="orderDetail__info p-2 border-radius-4">
                                            <p className="mb-0 orderDetail__info-name">{bill?.user?.name}</p>
                                            <p className="mb-0 orderDetail__info-title">
                                                Địa chỉ:
                                                {(bill && bill.user) ? ` ${JSON.parse(bill?.user?.address).detail} ,${JSON.parse(bill?.user?.address).village.full_name}` : ''}
                                            </p>
                                            <p className="mb-0 orderDetail__info-title">Điện thoại: {bill?.user?.phone}</p>
                                        </div>
                                    }
                                </div>
                                <div className="col">
                                    <p className="mb-2 orderDetail__title">Hình thức giao hàng</p>
                                    {loading ? <Skeleton height={80} />
                                        :
                                        <div className="orderDetail__info p-2 border-radius-4">
                                            <p className="mb-0 orderDetail__info-title">Giao Tiết Kiệm</p>
                                            <p className="mb-0 orderDetail__info-title">
                                                Giao vào 
                                                {getDayInWeek((bill && bill.shippedDate) ? new Date(bill.shippedDate) : new Date())}, 
                                                {formatDate((bill && bill.shippedDate) ? new Date(bill.shippedDate) : new Date(), "dd/MM/yyyy")}
                                            </p>
                                            <p className="mb-0 orderDetail__info-title">Miễn phí vận chuyển</p>
                                        </div>

                                    }

                                </div>
                                <div className="col d-flex flex-column justify-content-between">
                                    <p className="mb-2 orderDetail__title">Hình thức thanh toán</p>
                                    {loading ?
                                        <Skeleton height={80} />
                                        :
                                        <div className="orderDetail__info p-2 border-radius-4 h-100">
                                            <p className="mb-0 orderDetail__info-title">Thanh toán tiền mặt khi nhận hàng</p>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="bg-white border-radius-4 mt-xl-3 mt-2">
                                <OrderDetailTable billDetails={bill?.billDetails} />
                            </div>
                            <div className="d-flex w-100 justify-content-end bg-white p-3">
                                {loading ? <Skeleton height={40} />

                                    :
                                    <div>
                                        <p className="d-flex justify-content-between mb-2 orderDetail__text">
                                            <span>Tạm tính:</span>
                                            <span className="ms-2">
                                                {formatCashVND((bill && bill.totalPrice && bill.feeShip) ? (bill.totalPrice - bill.feeShip) + "" : "0", ".")}đ
                                            </span>
                                        </p>
                                        <p className="d-flex justify-content-between mb-2 orderDetail__text">
                                            <span>Phí vận chuyển:</span>
                                            <span className="ms-2">{formatCashVND(bill?.feeShip + "", ".")}đ</span>
                                        </p>
                                        <p className="d-flex justify-content-between align-items-center mb-2 orderDetail__text">
                                            <span>Tổng cộng:</span>
                                            <span className="orderDetail__footer-price ms-2">
                                                {formatCashVND(bill?.totalPrice + "", ".")}đ
                                            </span>
                                        </p>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default OrderDetail;