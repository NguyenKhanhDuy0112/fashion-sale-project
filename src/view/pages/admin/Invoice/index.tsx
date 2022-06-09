import { formatCashVND } from "../../../../shared/helpers";
import { Bill } from "../../../../shared/interfaces";

interface InvoiceProps {
    bill: Bill
}

function Invoice(props: InvoiceProps) {
    const { bill } = props

    return (
        <section className="invoice">
            <div className="invoice__header p-2">
                <div className="row">
                    <div className="col-auto">
                        <img className="invoice__header-logo" src="https://salt.tikicdn.com/ts/upload/1c/11/e6/d8211526b5bdc67aaaef2af9e8cf7dc8.png" alt="" />
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4 className="invoice__header-title">Hóa Đơn Giá Trị Gia Tăng</h4>
                            <p className="mb-0 invoice__header-date">Ngày 27 tháng 04 năm 2022</p>
                            <p className="mb-0 invoice__header-note">(Bản thể hiện của hóa đơn điện tử)</p>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="d-flex align-items-center">
                            <p className="mb-0 invoice__header-char">Mẫu số:</p>
                            <p className="mb-0 invoice__header-char-child">01GTKT0/003</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="mb-0 invoice__header-char">Ký hiệu:</p>
                            <p className="mb-0 invoice__header-char-child">BC/21E</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="mb-0 invoice__header-char">Số:</p>
                            <p className="mb-0 invoice__header-char-child red">8538370</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="invoice__info p-2 mt-3">
                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title">Đơn vị bán hàng</p>
                        <p className="mb-0 invoice__info-text invoice__info-text-company"><span className="ms-1 me-2 invoice__info-separate">:</span> Công ty TNHH TIKI</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title">Mã số thuế</p>
                        <p className="mb-0 invoice__info-text fw-bold"><span className="ms-1 me-2 invoice__info-separate">:</span> 0309532909</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title">Địa chỉ</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span> Tòa Nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10, TP. Hồ Chí Minh</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title">Điện thoại</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span> (028) 7 305 8454</p>
                    </div>
                </div>
            </div>
            <div className="invoice__info border-black mt-3">
                <div className="d-flex flex-column p-2">
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title w-10">Họ tên người mua hàng</p>
                        <p className="mb-0 invoice__info-text">
                            <span className="ms-1 me-2 invoice__info-separate">:</span>
                        </p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title w-10">Đơn vị mua hàng</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span> {bill.user?.name}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title w-10">Mã số thuế</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span></p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title w-10">Địa chỉ</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span> {bill.user ? bill.user.address : ''}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title w-10">Điện thoại</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span> {bill.user?.phone}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 invoice__info-title w-10">Hình thức thanh toán</p>
                        <p className="mb-0 invoice__info-text"><span className="ms-1 me-2 invoice__info-separate">:</span> {bill.method}</p>
                    </div>
                </div>
            </div>
            <table className="invoice__table my-2">
                <thead>
                    <tr>
                        <th style={{ width: "2rem" }}>STT</th>
                        <th>Tên hàng hóa</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {bill.billDetails?.map((bDetail, index: number) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>{bDetail.productDetail.product?.name}</td>
                            <td>{bDetail.productDetail.product?.unit}</td>
                            <td>{formatCashVND(bDetail.quantity + "", ".")}</td>
                            <td className="text-end">{formatCashVND(bDetail.productDetail.product?.price + "", ".")}</td>
                            <td className="text-end">{formatCashVND((bDetail.productDetail.product?.price ? bDetail.productDetail.product?.price : 0) * bDetail.quantity + "", ".")}</td>
                        </tr>
                    ))}

                    {bill ?
                        <tr>
                            <td>{bill.billDetails?.length}</td>
                        </tr>
                        :
                        ''
                    }

                    <tr className="invoice__table-bd">
                        <td colSpan={4}>Tổng cộng</td>
                        <td className="text-end">
                            {formatCashVND(bill.billDetails?.reduce((prev, cur) => prev + ((cur.productDetail.product && cur.productDetail.product.price) ? cur.productDetail.product.price : 0), 0) + "", ".")}
                        </td>
                        <td className="text-end">
                            {formatCashVND(bill.totalPrice + "", ".")}
                        </td>
                    </tr>
                    <tr className="invoice__table-bb">
                        <td colSpan={6}>Số tiền viết bằng chữ: Hai mươi nghìn đồng</td>
                    </tr>
                </tbody>
            </table>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className="invoice__sign-title mb-0">Người mua hàng</p>
                        <p className="invoice__sign-note">(Ký, ghi rõ họ tên)</p>
                        <div className="invoice__sign-"></div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className="invoice__sign-title mb-0">Người bán hàng</p>
                        <p className="invoice__sign-note">(Ký, ghi rõ họ tên)</p>
                        <div className="invoice__sign-content">
                            <p className="invoice__sign-content-text mb-0">Signature Valid</p>
                            <p className="invoice__sign-content-text mb-0">Ký bởi: Công TY TNHH MTV THƯƠNG MẠI TIKI</p>
                            <p className="invoice__sign-content-text mb-0">Ký ngày: 29 tháng 09 năm 2022</p>
                            <img className="invoice__sign-content-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA4CAYAAACyutuQAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAPQSURBVHja3JppSBVRFMev+TALK4LCQhOJNmiD+tJm2EZoFBUFBVFE0I6W0q5ZWNFGCpFFJZS0SJHQF0uLlg9RWB+LLNrpEWZBUdiq0//geTFcZubNe743c68Hfoze++a+fp2ZO+feMcEwDBFJpNUmCD8jmGvY/bsycejaRXSCgEw2DjnACHQCmXwcskA+shcMaCySgkM5GAPmkgy1BzSVycChCgwF2ZB5F+oLaCgzFoezYBCYApln5n7dhGaCMyAVLIDMffkDOs1yy0AN6AcKIVNj9SFdhFaDk6A7OAGZMrsPqi5ET/FtoAIkgTqwyekE1YV2gH0s9gasQna+6yq0E5Tyzy1gJXgb7iRVhbaC3abfS8ANNyeqKLSRL7NQnAdlbk9WTWg5OMj3DMVTUABadRSaD46bHvbfwFrwMZJBVBGaCE7TesbURpfdnUgHUkFoBDgHepvarkVy36gklMoymaa2JpAHfukmRGVMJRgttW8GL6Id1E+hQ2CW1FbN6xyhm9AansHMQVVAcUcH9kMoh581chR35FLzS2gwlf8gRWq/yhWB0EmoJ8tkSO304CwEbboJ7QJTLdoPgJex+hKvhBZz0SnHA3A0ll/khdBIcMSi/QfYDv7oJNQDHOONDTmoQrgd6y+MtxDtB2RZtDdLCzgthGbb3DcU+0FQJ6H+4DBItuh7xNO30EUokSuBIRZ9tPLcw5se8RFKq02I9RusJTxNW0U9VwUinhkaD6lpMRpvIGcg0aKvRdr8iJsQPaXnQaoMdOvgeHSzp9v00V70vbgLBXMNWiHuBdPBXUhNinKspWChTd9XljW8yBC9iP2AwwowitbzkCoByRGMk86Xml1cAE+8qLH+z3KQahDtO5YpXEjWQWqcy3EowwNs+ugKKPeqApan7QrTumQyqIVUUZhszQGLHPqpxHnuixCy9Fu0v65o5CbaWirly3CCxfl9eOZKshm/mf+ThF8ZCt1PG7gaDkU2Z2uL9PSn0ma4w/j0LvSVr0IsVccLL3P04pmKNgFp64le3q5zGJuyc8rrDQunl8ZUvtAW7QypnbJFrzY+s6RdXPTy3glbyyFLdMnl2VTFfcEwh3G/+JGdsMUppGhyKIjigXgZPFZOiKUu8arTbdCedKXwKdwuH4pAg8vPXuE1j7pCyBLVYuv53nCKvzxVt6qeIZJ6yLs0TkHV9E3hY0S6YqW/5qh26KeldZs2QshSK1cRjRbdVE1fFz5HNHsKTVwhyG/YqlzcY0oKUdySltOf+NkjdBUKlUb1puX1a92FfnJp9J7rNiXinwADAE4w55Whk0mGAAAAAElFTkSuQmCC" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Invoice;