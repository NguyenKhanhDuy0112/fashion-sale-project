import { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import billsService from "../../../../services/billsService";
import productDetailsService from "../../../../services/productDetailsService";
import productsService from "../../../../services/productService";
import Status from "../../../../shared/components/Status";
import { formatCashVND, formatDate } from "../../../../shared/helpers";
import { Bill, BillDetail } from "../../../../shared/interfaces";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../Invoice";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../modules/snackbar/snackbarSlice";
import ModalCustomDelete from "../../../../shared/components/ModalCustomDelete";

function OrderAdDetail() {
    const { id } = useParams()
    const [bill, setBill] = useState<Bill>()
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [billDetailsChecking, setBillDetailsChecking] = useState<BillDetail[]>([])
    const dispatch = useDispatch()
    const componentRef = useRef<HTMLDivElement>(null)
    const [showModalSingle, setShowModalSingle] = useState<boolean>(false)

    useEffect(() => {
        handleLoadBill()
    }, [id])

    const handleLoadBill = async () => {
        try {
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
                        await setLoading(false)
                    }
                })
            }
        }
        catch (err) {

        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true
    });

    const handleDeleteByChecking = () => {
        dispatch(showSnackbar({ show: true, text: "Vui lòng chọn sản phẩm để xóa", delay: 3000 }))
    }

    const handleChangeCheckbox = (e: any) => {
        if (e.target.checked) {
            if (bill && bill.billDetails) {
                const newBill = bill.billDetails
                setBillDetailsChecking(newBill)
            }
        }
        else {
            setBillDetailsChecking([])
        }
    }

    const handleChangeCheckboxSingle = (e: any, billDetail: BillDetail) => {
        const findBill = billDetailsChecking.find(b => b._id === billDetail._id)
        const findIdx = billDetailsChecking.findIndex(b => b._id === billDetail._id)
        let newBillDetail 
        if(findBill){
            newBillDetail = billDetailsChecking
            newBillDetail.splice(findIdx, 1)
            console.log("Bill find: ", newBillDetail)
            
        }
        else{
            
            newBillDetail = billDetailsChecking
            newBillDetail.push(billDetail)
            console.log("Bill not find: ", newBillDetail)
        }
        console.log("new Bill Detail: ", newBillDetail)
        setBillDetailsChecking(newBillDetail)
    }
    console.log(billDetailsChecking.length)
    console.log(bill && bill.billDetails && bill?.billDetails.length)

    console.log("Bill Detail checking: ", billDetailsChecking)

    return (
        <>
            <div className="invoiceAdmin__container">
                <div className="invoiceAdmin__invoice">
                    {bill &&
                        <div ref={componentRef} className="content-invoice">
                            <Invoice bill={bill} />
                        </div>
                    }
                </div>
                <h6 className="fw-bold py-4 mb-0 dashboard__title margin-top-3">Hóa Đơn</h6>
                <div className="invoiceAdmin p-3">
                    <div className="row g-3 mb-3">
                        <div className="col-md">
                            <h5 className="text-uppercase">Hóa Đơn</h5>
                            <p className="invoiceAdmin__title-text">
                                Trạng thái:
                                {
                                    loading
                                        ?
                                        <Skeleton width={100} />
                                        :
                                        <Status
                                            status={bill ? bill.status : 0}
                                        />
                                }
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-5 text-md-end text-start">
                            <h5 className="d-flex justify-content-md-end justify-content-start align-items-center">
                                <FaShoppingBag
                                    className="text-success"
                                />
                                Công ty TNHH Fashion
                            </h5>
                            <p className="invoiceAdmin__text">
                                Thành Phố Hồ Chí Minh
                            </p>
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md">
                            <h6 className="invoiceAdmin__title">Ngày</h6>
                            <p className="invoiceAdmin__text">
                                {
                                    loading
                                        ?
                                        <Skeleton width={100} />
                                        :
                                        bill
                                            ?
                                            formatDate(bill.createdAt ? new Date(bill.createdAt) : new Date(), "dd/MM/yyyy")
                                            :
                                            ''
                                }
                            </p>
                        </div>
                        <div className="col-xl-3 col-lg-5 col-md-4 text-md-end text-start">
                            <h6 className="invoiceAdmin__title">Khách hàng</h6>
                            <p className="invoiceAdmin__text">
                                {
                                    loading
                                        ?
                                        <Skeleton width={150} />
                                        :
                                        bill
                                            ?
                                            bill.user?.name
                                            :
                                            ''
                                }
                            </p>
                        </div>
                    </div>
                    <table className="tableCustom">
                        <thead>
                            <tr>
                                <th style={{ width: "3rem" }}>
                                    <label className="cart__cartHead-checkbox d-flex align-items-center">
                                        <input
                                            checked={((bill && bill.billDetails && bill?.billDetails.length) ? bill.billDetails.length : 0) === billDetailsChecking.length}
                                            onChange={(e) => handleChangeCheckbox(e)}
                                            type="checkbox"
                                            className="cart__cartHead-checkbox-input"
                                        />
                                        <span className="cart__cartHead-checkbox-fake"></span>
                                    </label>
                                </th>
                                <th>STT</th>
                                <th>SKU</th>
                                <th>Sản phẩm</th>
                                <th>Màu sắc</th>
                                <th>Kích cỡ</th>
                                <th>Số lượng</th>
                                <th>Giá tiền</th>
                                <th>Giảm giá</th>
                                <th>Thành tiền</th>
                                <th>
                                    <span
                                        onClick={handleDeleteByChecking}
                                        className="cart__cartHead-title cursor-pointer"
                                    >
                                        <FiTrash2 color="#787878" size={18} />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ?
                                Array.from({ length: 2 }).map((tr, index) => (
                                    <tr key={index}>
                                        {Array.from({ length: 11 }).map((td, index) => (
                                            <td key={index}><Skeleton /></td>
                                        ))}
                                    </tr>
                                ))
                                :
                                bill && bill.billDetails && bill.billDetails.length > 0 && bill.billDetails.map((bDetail, index) => {

                                    return (
                                        <tr key={bDetail._id}>
                                            <td style={{ width: "3rem" }}>
                                                <label className="cart__cartHead-checkbox d-flex align-items-center">
                                                    <input
                                                        checked = {billDetailsChecking.includes(bDetail)}
                                                        onChange={(e) => handleChangeCheckboxSingle(e, bDetail)}
                                                        type="checkbox"
                                                        className="cart__cartHead-checkbox-input"
                                                    />
                                                    <span className="cart__cartHead-checkbox-fake"></span>
                                                </label>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{bDetail.productDetail.SKU ? bDetail.productDetail.SKU : ''}</td>
                                            <td>{bDetail.productDetail.product ? bDetail.productDetail.product.name : ''}</td>
                                            <td>{(bDetail.productDetail.color).toUpperCase()}</td>
                                            <td>{(bDetail.productDetail.size).toUpperCase()}</td>
                                            <td className="text-end">{bDetail.quantity}</td>
                                            <td className="text-end">
                                                {formatCashVND(bDetail.productDetail.product ? (bDetail.productDetail.product.price ? bDetail.productDetail.product.price - (bDetail.productDetail.product.price * (bDetail.productDetail.product.discount ? bDetail.productDetail.product.discount / 100 : 0)) : 0) + "" : '', ".")}
                                            </td>
                                            <td className="text-end">0</td>
                                            <td className="text-end">{formatCashVND(bDetail.price + "", ".")}</td>
                                            <td>
                                                <span
                                                    onClick={() => setShowModalSingle(!showModalSingle)}
                                                    className="cart__cartHead-title cursor-pointer"
                                                >
                                                    <FiTrash2 color="#787878" size={18} />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <div className="invoiceAdmin__total p-4 mt-5">
                        <div className="row align-items-center g-4">
                            <div className="col-lg">
                                <h6 className="invoiceAdmin__title">PHƯƠNG THỨC THANH TOÁN</h6>
                                <p className="invoiceAdmin__title-text mb-0">{loading ? <Skeleton /> : bill?.method}</p>
                            </div>
                            <div className="col-lg">
                                <h6 className="invoiceAdmin__title">PHÍ GIAO HÀNG</h6>
                                <p className="invoiceAdmin__title-text mb-0">{loading ? <Skeleton /> : bill ? formatCashVND(bill.feeShip + "", ".") : ''}</p>
                            </div>
                            <div className="col-lg">
                                <h6 className="invoiceAdmin__title">GIẢM GIÁ</h6>
                                <p className="invoiceAdmin__title-text mb-0">{loading ? <Skeleton /> : '0%'}</p>
                            </div>
                            <div className="col-lg-auto">
                                <h6 className="invoiceAdmin__title">TỔNG TIỀN</h6>
                                <p className="invoiceAdmin__title-text invoiceAdmin__title-text-danger mb-0">{loading ? <Skeleton /> : formatCashVND(bill ? String(bill.totalPrice) : '', ".")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 d-flex justify-content-end">
                    <button className="btn btn-ad-primary text-white" onClick={handlePrint}>
                        In Hóa Đơn <AiOutlinePrinter />
                    </button>
                </div>
            </div>

            <ModalCustomDelete
                onShow={() => setShowModal(!showModal)}
                show={showModal}
                onDelete={handleDeleteByChecking}
            />

            <ModalCustomDelete
                onShow={() => setShowModalSingle(!showModalSingle)}
                show={showModalSingle}
                onDelete={handleDeleteByChecking}
            />
        </>
    );
}

export default OrderAdDetail;