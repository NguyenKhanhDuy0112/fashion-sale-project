import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import billsService from "../../../../services/billsService";
import OrderItem from "../../../../shared/components/OrderItem";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { Bill } from "../../../../shared/interfaces";
import Account from "../Account";
import OrderManageAll from "./OrderManageAll";
import OrderManageCancel from "./OrderManageCancel";
import OrderManageDeal from "./OrderManageDeal";
import OrderManageShipped from "./OrderManageShipped";
import OrderManageShipping from "./OrderManageShipping";

const orders = [
    { status: 5, name: "Tất cả đơn" },
    { status: 1, name: "Đang xử lý" },
    { status: 2, name: "Đang vận chuyển" },
    { status: 3, name: "Đã giao" },
    { status: 0, name: "Đã hủy" }
]

function OrderManage() {
    const [bills, setBills] = useState<Bill>()
    const [tab, setTab] = useState<{ status: number, name: string }>()
    const currentUser = useCurrentUser()
    

    useEffect(() => {
        setTab(orders[0])
    }, [])


    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Đơn Hàng Của Tôi" />
            </div>
            <section className="orderManage bg-outside-client pb-3">
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
                    <div className="row">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <h5 className="editAccount__title mb-4">Đơn hàng của tôi</h5>
                            <ul className="orderManage__list p-0 mb-3">
                                {orders.map((item:any, index: number) => (
                                    <li
                                        key={index}
                                        onClick={() => setTab(item)}
                                        className={`orderManage__list-item ${item.status === tab?.status ? 'active' : ''}`}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                            <div className={`${tab?.status === 5 ? 'd-block' : 'd-none'}`}>
                                <OrderManageAll />
                            </div>
                            <div className={`${tab?.status === 1 ? 'd-block' : 'd-none'}`}>
                                <OrderManageDeal />
                            </div>
                            <div className={`${tab?.status === 2 ? 'd-block' : 'd-none'}`}>
                                <OrderManageShipping />
                            </div>
                            <div className={`${tab?.status === 3 ? 'd-block' : 'd-none'}`}>
                                <OrderManageShipped />
                            </div>
                            <div className={`${tab?.status === 0 ? 'd-block' : 'd-none'}`}>
                                <OrderManageCancel />
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

export default OrderManage;