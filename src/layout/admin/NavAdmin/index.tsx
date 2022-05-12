import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleNav } from "../../../modules/toggleNav/toggleNavSlice";
import images from "../../../shared/assets";
import useToggleNav from "../../../shared/hooks/useToggleNav";
import NavAdminLink from "./NavAdminLink";

function NavAdmin() {
    const isToggleNav = useToggleNav()
    const dispatch = useDispatch()
    return (
        <nav className={`navAdmin ${isToggleNav ? 'active': ''}`}>
            <div className="">
                <div className="navAdmin__head d-flex align-items-center px-3">
                    <span className="navAdmin__head-icon">
                        <images.LogoAdminIcon />
                    </span>
                    <span className={`navAdmin__head-text ${isToggleNav ? 'active': ''}`}>
                        <images.LogoAdminText />
                    </span>
                    <span onClick={() => dispatch(toggleNav(!isToggleNav))} className="text-ad d-lg-none ms-auto d-block">
                        <BsArrowLeft size={25}/>
                    </span>
                </div>
                <div className="navAmin__body px-2">
                    <NavAdminLink/>
                </div>
            </div>
        </nav>
    );
}

export default NavAdmin;