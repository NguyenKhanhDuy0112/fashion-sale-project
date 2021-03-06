import { AiFillHome, AiOutlineBars } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import ModalCustom from "../../../shared/components/ModalCustom";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";

interface Nav{
    show: boolean,
    toggleNav: () => void
}

function NavAccount(props :  Nav) {
    
    const { show, toggleNav } = props
    const currentUser = useCurrentUser()


    return (
        <ModalCustom 
            className="navAccount" 
            position="left" 
            show={show} 
            onHandleShow={toggleNav} 
        >
            <div className="modalCustom__header position-fixed d-flex align-items-center justify-content-between">
                <Link to="/" className="navAccount__avatar d-flex w-100 align-items-center">
                   
                    {currentUser.avatar ? 
                         <img className="navAccount__avatar-img" src = {currentUser.avatar} alt = ""/>
                         :
                        <span className="navAccount__avatar-char">{currentUser.name}</span>

                    }
                    
                    <div className="navAccount__avatar-content">
                        <h5 className="navAccount__avatar-name mb-0">
                            {currentUser.name}
                        </h5>
                        <p className="navAccount__avatar-email mb-0">
                            {currentUser.email}
                        </p>
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
                            <span className="navAccount__item-link-text">Trang ch???</span>
                        </Link>
                    </li>
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <AiOutlineBars size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Danh s??ch ng??nh h??ng</span>
                        </Link>
                    </li>
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <FaUserCircle size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Qu???n l?? t??i kho???n</span>
                        </Link>
                    </li>
                    <li className="navAccount__item">
                        <Link to="/" className="navAccount__item-link d-flex align-items-center">
                            <span className="navAccount__item-link-icon">
                                <BsFillBellFill size={20} color = "#757575"/>
                            </span>
                            <span className="navAccount__item-link-text">Th??ng b??o</span>
                        </Link>
                    </li>
                </ul>
                <div className="navAccount__discount">
                    <h5 className="navAccount__title">Khuy???n m??i hot</h5>
                    <Link to="/" className="navAccount__text">Tiki Deal</Link>
                    <Link to="/" className="navAccount__text">Phi???u qu?? t???ng</Link>
                    <Link to="/" className="navAccount__text">??u ????i cho ch??? th??? ng??n h??ng</Link>
                </div>
                <div className="navAccount__help">
                    <h5 className="navAccount__title">H??? tr???</h5>
                    <div className="d-flex align-items-center navAccount__text">
                        <span className="me-1">HOTLINE: </span>
                        <span className="text-success">
                            1900 - 6035<span className="text-dark ms-1">(1000??/ph??t)</span>
                        </span>
                    </div>
                    <span className="navAccount__text d-flex align-items-center justify-content-between">
                        H??? tr??? kh??ch h??ng
                        <span><IoIosArrowForward/></span>
                    </span>
                </div>
            </div>
        </ModalCustom>
    );
}

export default NavAccount;