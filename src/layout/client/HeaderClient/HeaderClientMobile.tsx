import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FaBars } from "react-icons/fa"
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import NavAccount from "../NavAccount";
import HeaderClientSearch from "./HeaderClientSearch";

function HeaderClientMobile() {
    const [showNavAccount, setShowNavAccount] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const navigate = useNavigate()

    return (
        <>
            <header className="headerClient__mobile d-flex justify-content-between align-items-center container-client py-2">
                <span className="py-2 pe-2" onClick={() => navigate(-1)}>
                    <IoIosArrowBack size={22} fontWeight="700" color="#fff" />
                </span>
                <span className="p-2" onClick={() => setShowNavAccount(!showNavAccount)}>
                    <FaBars size={22} color="#fff" />
                </span>
                <div className="flex-grow-1 mx-1">
                    <HeaderClientSearch 
                        setShow={() => setShowSearch(!showSearch)} 
                        show={showSearch}
                        onShowNavAccount = {() => setShowNavAccount(!showNavAccount)}
                     />
                </div>
                <Link to="/" className="p-2">
                    <FiShoppingCart size={22} color="#fff" />
                </Link>
            </header>
            <NavAccount show={showNavAccount} toggleNav={() => setShowNavAccount(!showNavAccount)} />
        </>
    );
}

export default HeaderClientMobile;