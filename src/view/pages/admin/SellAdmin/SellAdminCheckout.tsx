import { useSearchParams } from "react-router-dom";
import { useState } from "react"
import { formatDate, formatCashVND } from "../../../../shared/helpers";
import { ProductDetailOrder, User } from "../../../../shared/interfaces";
import SearchUser from "./searchUser";
import billsService from "../../../../services/billsService";
import { showToast } from "../../../../modules/toast/toastSlice";
import { useDispatch } from "react-redux";
import billDetailsService from "../../../../services/billDetailsService";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";

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
    const [user, setUser] = useState<User>()
    const dispatch = useDispatch()

    const total = data.reduce((prev, cur) => prev + cur.amount, 0)

    const handleSell = async () => {
        dispatch(showLoading())
        try {
            const bill = await billsService.add(
                {
                    feeShip: searchParams.get('type') === 'import' ? 0 : 20000,
                    status: searchParams.get('type') === 'import' ? 3 : 1, 
                    shippedDate: searchParams.get('type') === 'import' ? new Date() : new Date().setDate(new Date().getDate() + 3), 
                    user: user ? user._id : ''
                }
            )
            if(bill){
                await data.forEach(async (pro, index) => {
                    await billDetailsService.add(
                        {
                            bill: bill._id, 
                            quantity: pro.mainProduct.quantity, 
                            productDetail: pro.mainProduct._id
                        }
                    )
                
                    if(index === data.length - 1){
                        dispatch(hideLoading())
                        await dispatch(showToast({ show: true, text: searchParams.get('type') === 'import' ? 'Nh???p h??ng th??nh c??ng' : 'Mua h??ng th??nh c??ng', type: 'success', delay: 1500 }))
                        
                    }
                })
            }
        }
        catch (err) {
            dispatch(hideLoading())
            dispatch(showToast({ show: true, text: searchParams.get('type') === 'import' ? 'Nh???p h??ng th???t b???i' : 'Mua h??ng th???t b???i', type: 'error', delay: 1500 }))
        }
    }

    return (
        <>
            <div className="sellAdmin__content-calc p-3 h-100" style={{ minHeight: "50vh", maxHeight: "500px" }}>
                <div>
                    <div className="row mb-3 align-items-center">
                        <div className="col">
                            <div className="position-relative d-flex align-items-center w-100 sellAdmin__content-calc-customer">
                                <SearchUser onUser={(user) => setUser(user)} />
                            </div>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0 sellAdmin__content-calc-date">{`${formatDate(new Date(), "dd/MM/yyyy")}`}</p>
                        </div>
                    </div>
                    {searchParams.get('type') === 'export' &&
                        <div>
                            <div className="d-flex mb-3 justify-content-between align-items-center">
                                <p className="mb-0 sellAdmin__content-calc-title">T???m t??nh</p>
                                <p className="mb-0 sellAdmin__content-calc-price">{formatCashVND(total + "", ",")}</p>
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <p className="mb-0 sellAdmin__content-calc-title">Ph?? v???n chuy???n</p>
                                <p className="mb-0 sellAdmin__content-calc-price">20,000</p>
                            </div>
                        </div>
                    }
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0 sellAdmin__content-calc-title">T???ng ti???n</p>
                        <h4 className="mb-0 text-end text-danger">{searchParams.get('type') === 'import' ? formatCashVND(total + "", ",") : formatCashVND((total > 0 ? total + 20000 : total) + "", ",")} ??</h4>
                    </div>
                    {searchParams.get('type') === 'export' &&
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="paying" id="cash" />
                                    <img className="mx-2" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" alt="" />
                                    <label className="form-check-label cursor-pointer" htmlFor="cash"><small>Thanh to??n ti???n m???t sau khi nh???n h??ng</small></label>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="d-flex align-items-center">
                    <button onClick={handleSell} className="btn btn-ad-primary w-100 p-3 me-1">
                        <h6 className="mb-0">{searchParams.get('type') === 'import' ? 'Nh???p' : 'Mua'} H??ng</h6>
                    </button>

                </div>
            </div>
        </>
    );
}

export default SaleAdminCheckout;