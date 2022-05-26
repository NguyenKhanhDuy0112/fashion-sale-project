import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import OrderItem from "../../../../shared/components/OrderItem";
import Account from "../Account";

const orders = ["Tất cả đơn", "Đang xử lý", "Đang vận chuyển", "Đã giao", "Đã hủy"]

function OrderManage() {

    const [tab, setTab] = useState("Tất cả đơn")

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
                            <ul className="orderManage__list p-0 m-0">
                                {orders.map(item => (
                                    <li onClick={() => setTab(item)} className={`orderManage__list-item ${item === tab ? 'active' : ''}`}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <OrderItem/>
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