import { RiHome2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { FaRegComment, FaRegUser } from "react-icons/fa";
import { useState } from "react";
import NavCategoryModal from "./NavCategoryModal";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";

function NavClient() {
    const [showCategory, setShowCategory] = useState(false)
    const dispatch = useDispatch()


    return (
        <>
            <section className="navClient d-xl-none d-block">
                <ul className="navClient__list">
                    <li className="navClient__item">
                        <Link to="" className="navClient__item-link active">
                            <span className="navClient__item-link-icon">
                                <RiHome2Fill size={19} />
                            </span>
                            <span className="navClient__item-link-text">Trang chủ</span>
                        </Link>
                    </li>
                    <li className="navClient__item">
                        <Link to="" className="navClient__item-link" onClick={() => setShowCategory(!showCategory)}>
                            <span className="navClient__item-link-icon">
                                <MdOutlineDashboard size={19} />
                            </span>
                            <span className="navClient__item-link-text">Danh mục</span>
                        </Link>
                    </li>
                    <li className="navClient__item">
                        <Link to="" className="navClient__item-link">
                            <span className="navClient__item-link-icon">
                                <AiOutlineFire size={19} />
                            </span>
                            <span className="navClient__item-link-text">Lướt</span>
                        </Link>
                    </li>
                    <li className="navClient__item">
                        <Link to="" className="navClient__item-link">
                            <span className="navClient__item-link-icon">
                                <FaRegComment rotate="90deg" size={19} />
                            </span>
                            <span className="navClient__item-link-text">Chat</span>
                        </Link>
                    </li>
                    <li className="navClient__item">
                        <span onClick={() => dispatch(toggleFormLogin())} className="navClient__item-link">
                            <span className="navClient__item-link-icon">
                                <FaRegUser size={19} />
                            </span>
                            <span className="navClient__item-link-text">Cá nhân</span>
                        </span>
                    </li>
                </ul>
            </section>
            <NavCategoryModal show = {showCategory} handleToggle = {() => setShowCategory(!showCategory)}/>
        </>
    );
}

export default NavClient;