import { AiFillHome, AiOutlineBars } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import ModalCustom from "../../../shared/components/ModalCustom";

interface Nav{
    show: boolean,
    toggleNav: () => void
}

function NavAccount(props :  Nav) {
    
    const { show, toggleNav } = props

    return (
        <ModalCustom 
            className="navAccount" 
            position="left" 
            show={show} 
            onHandleShow={toggleNav} 
        >
            <div className="modalCustom__header position-fixed d-flex align-items-center justify-content-between">
                <Link to="/" className="navAccount__avatar d-flex w-100 align-items-center">
                    <span className="navAccount__avatar-char">NG</span>
                    <div className="navAccount__avatar-content">
                        <h5 className="navAccount__avatar-name mb-0">Nguyễn Khánh Duy</h5>
                        <p className="navAccount__avatar-email mb-0">duynguyen.011202@gmail.com</p>
                    </div>
                    <span className="ms-auto">
                        <IoIosArrowForward color="#fff" size={18}/>
                    </span>
                </Link>
            </div>
            <div className="modalCustom__body mt-5 pt-2">
                <ul className="navAccount__list my-2">
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <AiFillHome size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Trang chủ</span>
                        </Link>
                    </li>
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <AiOutlineBars size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Danh sách ngành hàng</span>
                        </Link>
                    </li>
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <FaUserCircle size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Quản lý tài khoản</span>
                        </Link>
                    </li>
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <BsFillBellFill size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Thông báo</span>
                        </Link>
                    </li>
                </ul>
                <div className="navAccount__discount">
                    <h5 className="navAccount__title">Khuyến mãi hot</h5>
                    <Link to="/" className="navAccount__text">Tiki Deal</Link>
                    <Link to="/" className="navAccount__text">Phiếu quà tặng</Link>
                    <Link to="/" className="navAccount__text">Ưu đãi cho chủ thẻ ngân hàng</Link>
                </div>
                <div className="navAccount__help">
                    <h5 className="navAccount__title">Hỗ trợ</h5>
                    <div className="d-flex align-items-center navAccount__text">
                        <span className="me-1">HOTLINE: </span>
                        <span className="text-success">
                            1900 - 6035<span className="text-dark ms-1">(1000đ/phút)</span>
                        </span>
                    </div>
                    <span className="navAccount__text d-flex align-items-center justify-content-between">
                        Hỗ trợ khách hàng
                        <span><IoIosArrowForward/></span>
                    </span>
                </div>
            </div>
        </ModalCustom>
    );
}

export default NavAccount;