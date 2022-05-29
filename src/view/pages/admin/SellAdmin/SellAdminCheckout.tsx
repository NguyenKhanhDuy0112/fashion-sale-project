
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../../../shared/helpers";
import { ProductDetailOrder } from "../../../../shared/interfaces";
import SearchUser from "./searchUser";

interface ProductOrder {
    _id: string,
    name: string,
    material: string,
    origin: string,
    description: string,
    unit: string,
    slug?: string,
    trademark?: any,
    price?: number,
    rating?: number,
    category?: any,
    createdAt?: any,
    updatedAt?: any,
    amount: number,
    productDetails: ProductDetailOrder[],
    mainProduct: ProductDetailOrder
}
interface Props {
    data: ProductOrder[]
}

function SaleAdminCheckout(props: Props) {
    const { data } = props
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <>
            <div className="sellAdmin__content-calc p-3 h-100" style={{minHeight: "50vh", maxHeight: "500px"}}>
                <div>
                    <div className="row mb-3 align-items-center">
                        <div className="col">
                            <div className="position-relative d-flex align-items-center justify-content-center sellAdmin__content-calc-customer">
                                <SearchUser/>
                            </div>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0 sellAdmin__content-calc-date">{`${formatDate(new Date(), "dd/MM/yyyy")}`}</p>
                        </div>
                    </div>
                    {searchParams.get('type') === 'export' &&
                        <div>
                            <div className="d-flex mb-3 justify-content-between align-items-center">
                                <p className="mb-0 sellAdmin__content-calc-title">Tạm tính</p>
                                <p className="mb-0 sellAdmin__content-calc-price">10,000</p>
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <p className="mb-0 sellAdmin__content-calc-title">Phí vận chuyển</p>
                                <p className="mb-0 sellAdmin__content-calc-price">10,000</p>
                            </div>
                            <div className="d-flex justify-content-between mb-3 align-items-center">
                                <p className="mb-0 sellAdmin__content-calc-title">Tiền khách trả</p>
                                <input className="sellAdmin__content-calc-input-bt d-inline-block" />
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <p className="mb-0 sellAdmin__content-calc-title">Tiền thừa trả khách</p>
                                <p className="mb-0 text-end sellAdmin__content-calc-price sellAdmin__content-calc-price-primary">0</p>
                            </div>
                        </div>
                    }
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0 sellAdmin__content-calc-title">Tổng tiền</p>
                        <h4 className="mb-0 text-end text-danger">20,000</h4>
                    </div>
                    {searchParams.get('type') === 'export' &&
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="paying" id="cash" />
                                    <img className="mx-2" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" alt="" />
                                    <label className="form-check-label cursor-pointer" htmlFor="cash"><small>Thanh toán tiền mặt sau khi nhận hàng</small></label>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-ad-primary w-100 p-3 me-1">
                        <h6 className="mb-0">{searchParams.get('type') === 'import' ? 'Nhập' : 'Mua'} Hàng</h6>
                    </button>

                </div>
            </div>
        </>
    );
}

export default SaleAdminCheckout;