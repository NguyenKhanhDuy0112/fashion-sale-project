import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import Account from "../Account";

function CommentSelled() {
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
                            <li className="breadcrumbCustom__list-item none">
                                <span className="breadcrumbCustom__list-item-link">
                                    Nhận xét sản phẩm đã mua
                                </span>
                            </li>
                        </ul>
                    </article>
                    <div className="row">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <div className="col">
                                <h5 className="editAccount__title mb-4">Nhận xét sản phẩm đã mua</h5>
                                <div className="bg-white border-radius-4 p-3">
                                    <div className="d-flex justify-content-center ">
                                        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg" alt="" />
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <button className="shop__address-modal-body-btn py-2 px-4">Tiếp tục mua sắm</button>
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

export default CommentSelled;