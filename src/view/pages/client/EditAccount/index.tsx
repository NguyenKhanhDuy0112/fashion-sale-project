import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import Account from "../Account";
import EditAccountDesk from "./EditAccountDesk";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";

function EditAccount() {
    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Thông Tin Tài Khoản" />
            </div>
            <section className="editAccount bg-outside-client pb-3">
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
                                    Thông tin tài khoản
                                </span>
                            </li>
                        </ul>
                    </article>
                    <div className="row">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <EditAccountDesk />
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

export default EditAccount;