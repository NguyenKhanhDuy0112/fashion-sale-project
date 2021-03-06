import { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderAddress from "../../../../layout/client/HeaderAddress";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";
import billsService from "../../../../services/billsService";
import productDetailsService from "../../../../services/productDetailsService";
import productsService from "../../../../services/productService";
import { formatCashVND, formatDate, getDayInWeek } from "../../../../shared/helpers";
import { Bill } from "../../../../shared/interfaces";

function OrderSuccess() {
    const [bill, setBill] = useState<Bill>()
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        
        handleLoadBill()
    }, [searchParams.get('id')])

    const handleLoadBill = async () => {
        dispatch(showLoading())
        try {
            if (searchParams.get('orderId')) {
                const id = searchParams.get('orderId')
                const billData = await billsService.findById(id ? id : '')
                if (billData) {
                    const bill: any = await billData
                    const billDetail: any = await []
                    await bill.billDetails?.forEach(async (bd: any, index: number) => {
                        const productDetail = await productDetailsService.findById(bd.productDetail)
                        productDetail.color = await productDetail.color.color
                        productDetail.size = await productDetail.size.size
                        productDetail.images = await [productDetail.images[0].image, ...productDetail.images[0].imagesSub]

                        const product = await productsService.findById(productDetail.product)
                        productDetail.product = await product
                        await billDetail.push({ ...bd, productDetail })

                        if (index === await bill.billDetails.length - 1) {
                            bill.billDetails = await billDetail
                            await setBill(bill)
                            dispatch(hideLoading())
                        }
                    })
                }
            }
        }
        catch (err) {
            console.log('Error: ', err)
        }
    }

    return (
        <>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="?????t H??ng Th??nh C??ng" />
            </div>
            <div className="d-xl-block d-none">
                <HeaderAddress noneProgress={true} />
            </div>
            <section className="orderSuccess bg-outside-client">
                <div className="container-client none">
                    <div className="row g-0 justify-content-center">
                        <div className="col-xl-11 col-12">
                            <div className="row py-xl-4 py-0 g-xl-3 g-0">
                                <div className="col-xl-8 col-12">
                                    <div className="orderSuccess__notify p-xl-5 p-3">
                                        <div className="d-flex h-100">
                                            <div className="orderSuccess__img d-xl-block d-none me-xl-3 me-0">
                                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/tiki-mascot-congrat.svg" alt="" />
                                            </div>
                                            <div className="orderSuccess__background"></div>
                                            <div className="orderSuccess__content">
                                                <div className="d-flex">
                                                    <span className="d-xl-none d-block">
                                                        <IoMdCheckmarkCircle color="#fff" />
                                                    </span>
                                                    <div className="orderSuccess__content-header mb-4">
                                                        <h1 className="orderSuccess__content-header-title">
                                                            Yay, ?????t h??ng th??nh c??ng!
                                                        </h1>
                                                        <h3 className="orderSuccess__content-header-title-sub">
                                                            Chu???n b??? ti???n m???t {formatCashVND(bill?.totalPrice + "", ".")} ???
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="orderSuccess__content-summary d-xl-block d-none">
                                                    <div className="py-2 orderSuccess__content-summary-item border-b-f7 d-flex justify-content-between align-items-center">
                                                        <span className="orderSuccess__content-summary-item-label">
                                                            Ph????ng th???c thanh to??n
                                                        </span>
                                                        <span className="orderSuccess__content-summary-item-value">
                                                            Thanh to??n ti???n m???t
                                                        </span>
                                                    </div>
                                                    <div className="py-2 orderSuccess__content-summary-item d-flex justify-content-between align-items-center">
                                                        <span className="orderSuccess__content-summary-item-label">
                                                            T???ng c???ng
                                                        </span>
                                                        <span className="orderSuccess__content-summary-item-value orderSuccess__content-summary-item-value--large">
                                                            {formatCashVND(bill?.totalPrice + "", ".")} ???
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-end orderSuccess__content-summary-vat">
                                                        (???? bao g???m VAT n???u c??)
                                                    </div>
                                                    <Link to = "/" className="w-100 d-block orderSuccess__btn-back mt-2 text-center">
                                                        Quay v??? trang ch???
                                                    </Link>
                                                </div>

                                                <div className="orderSuccess__content-bottom d-xl-none d-block d-flex">
                                                    <Link to="/" className="orderSuccess__content-bottom-btn text-center w-100 me-1">
                                                        Xem ????n h??ng
                                                    </Link>
                                                    <Link to="/" className="orderSuccess__content-bottom-btn text-center w-100 ms-1">
                                                        V??? trang ch???
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="orderSuccess__img-mobile d-xl-none d-block me-xl-3 me-0">
                                                <img width={125} height={125} src="https://frontend.tikicdn.com/_mobile-next/static/img/icons/checkout/mascot-success-celebrate.svg" alt="" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="orderSuccess__bill">
                                        <div className="orderSuccess__bill-main">
                                            <div className="orderSuccess__bill-header p-3 d-flex justify-content-between align-items-center">
                                                <p className="mb-0 orderSuccess__bill-header-code">
                                                    M?? ????n h??ng
                                                </p>
                                                <Link to={`/order/history/${bill?._id}`} className="orderSuccess__bill-header-view">
                                                    Xem ????n h??ng
                                                </Link>
                                            </div>
                                            <div className="orderSuccess__bill-body p-3">
                                                <p className="orderSuccess__bill-body-date mb-0">
                                                    Giao v??o {getDayInWeek(new Date(bill?.shippedDate))}, {formatDate(new Date(bill?.shippedDate), "dd/MM/yyyy")}
                                                </p>
                                                {
                                                    bill?.billDetails?.map(billDt => (
                                                        <div key = {billDt._id} className="orderSuccess__bill-body-product mt-1">
                                                            <div>
                                                                <div
                                                                    style={{ backgroundImage: `url(${billDt.productDetail.images[0]})` }}
                                                                    className="orderSuccess__bill-body-product-img"
                                                                >

                                                                </div>
                                                            </div>
                                                            <p className="orderSuccess__bill-body-product-name mb-0 ms-2">
                                                                {billDt.productDetail.product ? billDt.productDetail.product.name : ''}
                                                            </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="orderSuccess__bill-body-download p-3 mt-3">
                                            <p className="mb-3 orderSuccess__bill-body-download-title text-center">
                                                Mua s???m ti???t ki???m h??n tr??n ???ng d???ng Tiki!
                                            </p>
                                            <div className="orderSuccess__bill-body-download-app d-flex justify-content-center align-items-center">
                                                <img className="me-1" src="https://salt.tikicdn.com/ts/upload/49/a6/6a/48e5b9307942215d3754a0162e8694f1.png" alt="" />
                                                <img className="ms-1" src="https://salt.tikicdn.com/ts/upload/c1/a2/b9/6f367d22657f94dcca9d798274687b42.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default OrderSuccess;