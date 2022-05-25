import { BiNotepad } from "react-icons/bi";
import { BsBellFill, BsFillSuitHeartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function Account() {
    const { pathname } = useLocation()

    return (
        <article className="account">
            <div className="account__avatar d-flex ps-2">
                <img className="account__avatar-img" src = "https://salt.tikicdn.com/desktop/img/avatar.png" alt = ""/>
                <div className="d-flex flex-column ms-2">
                    <span className="account__avatar-title">Tài khoản của</span>
                    <span className="account__avatar-name">Nguyễn Khánh Duy</span>
                </div>
            </div>

            <ul className="account__list mt-2">
                <li className="account__item">
                    <Link to = "/account/edit" className={`account__item-link px-3 py-2 ${pathname === '/account/edit' ? 'active' : ''}`}>
                        <span className="account__item-link-icon me-3">
                            <FaUser size={17}/>
                        </span>
                        <span className="account__item-link-text">
                            Thông tin tài khoản
                        </span>
                    </Link>
                </li>
                <li className="account__item">
                    <Link to = "/account/notify" className={`account__item-link px-3 py-2 ${pathname === '/account/notify' ? 'active' : ''}`}>
                        <span className="account__item-link-icon me-3">
                            <BsBellFill size={17}/>
                        </span>
                        <span className="account__item-link-text">
                            Thông báo của tôi
                        </span>
                    </Link>
                </li>
                <li className="account__item">
                    <Link to = "/order/history" className={`account__item-link px-3 py-2 ${pathname === '/order/history' ? 'active' : ''}`}>
                        <span className="account__item-link-icon me-3">
                            <RiBillFill size={17}/>
                        </span>
                        <span className="account__item-link-text">
                            Quản lý đơn hàng
                        </span>
                    </Link>
                </li>
                <li className="account__item">
                    <Link to = "/customer/address" className={`account__item-link px-3 py-2 ${pathname === '/customer/address' ? 'active' : ''}`}>
                        <span className="account__item-link-icon me-3">
                            <MdPlace size={17}/>
                        </span>
                        <span className="account__item-link-text">
                            Sổ địa chỉ
                        </span>
                    </Link>
                </li>
                <li className="account__item">
                    <Link to = "/nhan-xet-san-pham-da-mua" className={`account__item-link px-3 py-2 ${pathname === '/nhan-xet-san-pham-da-mua' ? 'active' : ''}`}>
                        <span className="account__item-link-icon me-3">
                            <BiNotepad size={17}/>
                        </span>
                        <span className="account__item-link-text">
                            Nhận xét sản phẩm đã mua
                        </span>
                    </Link>
                </li>
                <li className="account__item">
                    <Link to = "/customer/wishlist" className={`account__item-link px-3 py-2 ${pathname === '/customer/wishlist' ? 'active' : ''}`}>
                        <span className="account__item-link-icon me-3">
                            <BsFillSuitHeartFill size={17}/>
                        </span>
                        <span className="account__item-link-text">
                            Sản phẩm yêu thích
                        </span>
                    </Link>
                </li>
            </ul>
        </article>
    );
}

export default Account;