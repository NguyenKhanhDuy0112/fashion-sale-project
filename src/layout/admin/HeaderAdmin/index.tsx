import { RiBarChartHorizontalLine } from "react-icons/ri"
import HeaderAdminNotify from "./HeaderAdminNotify";
import HeaderAdminAvatar from "./HeaderAdminAvatar";
import { useDispatch } from "react-redux";
import useToggleNav from "../../../shared/hooks/useToggleNav";
import { toggleNav } from "../../../modules/toggleNav/toggleNavSlice";
import images from "../../../shared/assets";
import { BsArrowRight } from "react-icons/bs"


function HeaderAdmin() {
    const dispatch = useDispatch()
    const isToggleNav = useToggleNav()

    return (
        <header className={`headerAdmin ${isToggleNav ? 'active' : ''}`}>
            <div className="container-admin h-100">
                <div className="d-flex h-100 align-items-center justify-content-between">
                    <span onClick={() => dispatch(toggleNav(!isToggleNav))} className="headerAdmin__btn-bar cursor-pointer">

                        {isToggleNav ? <span className="d-lg-block d-none"><RiBarChartHorizontalLine size={24} /></span> : <span className="text-ad d-lg-block d-none"><BsArrowRight size={24} /></span>}
                        <span className="d-lg-none d-block">
                            <RiBarChartHorizontalLine size={24} />
                        </span>
                    </span>
                    <span className="d-flex d-lg-none">
                        <images.LogoAdminText />
                    </span>
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <HeaderAdminNotify />
                        </div>
                        <div className="ms-2">
                            <HeaderAdminAvatar />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAdmin;