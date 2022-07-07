import { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { HiOutlineTruck } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import billsService from "../../../services/billsService";
import productDetailsService from "../../../services/productDetailsService";
import productsService from "../../../services/productService";
import { formatCashVND, formatDate, getDayInWeek } from "../../helpers";
import { Bill, BillDetail } from "../../interfaces";

interface OrderItemProps {
    bill?: Bill,
    status: number,
    shipedDate?: any,
    statusDetails?: { status: number, date: any }[]
    loading?: boolean,
    totalPrice?: number,
}

function OrderItem(props: OrderItemProps) {
    const { loading, status, bill, totalPrice, statusDetails, shipedDate } = props
    const navigate = useNavigate()
    const [loadingItem, setLoadingItem] = useState(true)
    const [billDetails, setBillDetails] = useState<BillDetail[]>()

    useEffect(() => {
        handleLoadBillDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLoadBillDetail = async () => {
        if (bill && bill._id) {
            const billDetails = await billsService.getBillDetailsByBillId(bill?._id ? bill._id : '')
            const billDetailsData: any = await []
            if (billDetails && billDetails.length > 0) {
                await billDetails.forEach(async (bdt: any, index: number) => {
                    const productDetail = await productDetailsService.findById(bdt.productDetail)

                    const product = await productsService.findById(productDetail.product)

                    productDetail.images = await [productDetail.images[0].image, ...productDetail.images[0].imagesSub]
                    productDetail.color = await productDetail.color.color
                    productDetail.size = await productDetail.size.size
                    productDetail.product = await product

                    await billDetailsData.push({ ...bdt, productDetail: productDetail })

                    if (await index === billDetails.length - 1) {
                        await setBillDetails(billDetailsData)
                        setLoadingItem(false)
                    }
                })
            }
        }

    }


    return (
        <div className="orderItem p-3 border-radius-4">
            <div className="orderItem__header pb-2">
                {!loading && !loadingItem && (status === 0 || status === 3) && <div className="d-flex align-items-center">
                    <span className="orderItem__header-status">
                        {status === 0 && <AiOutlineStop />}
                        {status === 3 && <HiOutlineTruck size={17} />}
                    </span>
                    <span className="orderItem__header-status ms-2">
                        {status === 0 ? 'Đã hủy' : 'Giao hành thành công'}
                    </span>
                </div>}
                {status !== 0 && status !== 3 && shipedDate &&
                    <div>
                        <div className="d-flex align-items-center">
                            <span className="orderItem__header-status-date">
                                <HiOutlineTruck size={17} />
                            </span>
                            <span className="orderItem__header-status-date ms-2">
                                Giao vào {getDayInWeek(shipedDate ? new Date(shipedDate) : new Date())}, {formatDate(new Date(shipedDate), "dd/MM/yyyy")}
                            </span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="orderItem__header-status-sub">
                                {status === 1 && 'Chờ xác nhận'}
                                {status === 2 && 'Đang giao'}
                            </span>
                            <span className="orderItem__header-status-sub-state ms-2">
                                TIKI {status === 1 && 'đã tiếp nhận đơn hàng'}
                                {status === 2 && 'đang giao hàng'} | {statusDetails ? `${new Date(statusDetails[statusDetails.length - 1].date).getHours()}:${new Date(statusDetails[statusDetails.length - 1].date).getMinutes()}, ` : ''}
                                {statusDetails ? `${getDayInWeek(new Date(statusDetails[statusDetails.length - 1].date))} ${formatDate(new Date(statusDetails[statusDetails.length - 1].date), "dd/MM/yyyy")}` : ''}
                            </span>
                        </div>
                    </div>
                }

            </div>
            <div className="orderItem__body py-2">
                {
                    (loadingItem) ?
                        <div className="row">
                            <div className="col-3">
                                <Skeleton height={80} />
                            </div>
                            <div className="col">
                                <Skeleton height={80} />
                            </div>
                        </div>
                        :
                        billDetails && billDetails.map((bdDt: any, index: number) => {

                            return (
                                <div key={bdDt._id} className="d-flex">
                                    <div
                                        className="orderItem__body-img"
                                        style={{ backgroundImage: `url(${bdDt.productDetail.images[0]})` }}
                                    ></div>
                                    <div className="ms-2">
                                        <Link to={`/products/${bdDt.productDetail.product.slug}`} className="orderItem__body-title">
                                            {bdDt.productDetail?.product && bdDt.productDetail?.product.name}
                                        </Link>
                                        <div className="d-flex align-item-center">
                                            <span className="orderItem__body-quantity">
                                                {bdDt.quantity} sản phẩm
                                            </span>
                                            <div className="orderItem__body-separate"></div>
                                            <span className="orderItem__body-price">
                                                {formatCashVND(bdDt.price + "", ".")}đ
                                            </span>
                                        </div>
                                        <div className="d-flex orderItem__body-trademark align-items-center">
                                            <FiHome size={13} color="#808089" />
                                            <span className="orderItem__body-trademark-text ms-1">
                                                {bdDt.productDetail.product?.trademark.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            {!loadingItem &&

                <div className="orderItem__footer d-flex justify-content-end pt-2">
                    <div className="d-flex flex-column">
                        <p className="orderItem__footer-total text-end mb-1">
                            Tổng tiền: {formatCashVND(totalPrice + "", ".")}đ
                        </p>
                        <div className="d-flex align-item-center">
                            <button className="orderItem__footer-btn me-1">
                                Mua lại
                            </button>
                            <button
                                onClick={() => navigate(`/order/history/${bill ? bill._id : ''}`)}
                                className="orderItem__footer-btn ms-1"
                            >
                                Xem chi tiết
                            </button>
                            {status !== 0 && status !== 3 &&
                                <button
                                    onClick={() => navigate(`/order/tracking/${bill ? bill._id : ''}}`)}
                                    className="orderItem__footer-btn ms-1"
                                >
                                    Theo dõi đơn
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default OrderItem;