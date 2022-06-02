import { MdAccountBalance } from "react-icons/md";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import { IoIosArrowForward } from "react-icons/io";
import Account from "../Account";

function Wishlist() {
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
                                    Sản phẩm yêu thích
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
                                <h5 className="editAccount__title mb-4">Sản phẩm yêu thích</h5>
                                <div className="bg-white border-radius-4 p-3">
                                    <div className="d-flex justify-content-center ">
                                        <img src = "https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg" alt = ""/>
                                    </div>
                                    <small className="d-block text-center">Hãy <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="#ff3945" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{color: "rgb(255, 57, 69)"}}><path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"></path></svg> sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất</small>
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

export default Wishlist;