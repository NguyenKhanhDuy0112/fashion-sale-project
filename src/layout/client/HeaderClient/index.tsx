import { useState } from "react";
import { Link } from "react-router-dom";
import NavAccount from "../NavAccount";
import HeaderClientAuth from "./HeaderClientAuth";
import HeaderClientCart from "./HeaderClientCart";
import HeaderClientSearch from "./HeaderClientSearch";

function HeaderClient() {
    const [showHistory, setShowHistory] = useState(false)
    const [showNavAccount, setShowNavAccount] = useState(false)

    return (
        <>
            <div onClick={() => setShowHistory(!showHistory)} className={`overlay-input ${showHistory ? 'active' : ''}`}></div>
            <header className="headerClient">
                <div className="container-client h-100 py-xl-3 py-2">
                    <div className="row h-100 align-items-center g-3">
                        <div className="col-xl-2 col order-1">
                            <Link to="/" className="d-inline-flex flex-column justify-content-center">
                                <img className="headerClient__logo d-xl-block d-none" src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png" alt="" />
                                <img className="headerClient__logo-sub mt-2" src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png" alt="" />
                            </Link>
                        </div>
                        <div className="col d-xl-none d-block order-2">
                            <Link to="/">
                                <img className="headerClient__logo" src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png" alt="" />
                            </Link>
                        </div>
                        <div className="col-xl col-12 order-xl-3 order-5">
                            <HeaderClientSearch onShowNavAccount={() => setShowNavAccount(!showNavAccount)} setShow={(value) => setShowHistory(value)} show={showHistory} />
                        </div>
                        <div className="col-auto d-xl-block d-none order-4">
                            <HeaderClientAuth />
                        </div>
                        <div className="col-auto order-xl-5 order-3">
                            <HeaderClientCart />
                        </div>
                    </div>
                </div>
            </header>
            <NavAccount show = {showNavAccount} toggleNav = {() => setShowNavAccount(!showNavAccount)}/>

        </>
    );
}

export default HeaderClient;