import { Link } from "react-router-dom";

function HeaderPayment() {
    return (
        <header className="headerClient__payment py-4 bg-white">
            <div className="container-client">
                <div className="row">
                    <div className="col">
                        <Link to = "/" className="d-flex align-items-end">
                            <img className="headerClient__payment-logo" src="https://salt.tikicdn.com/ts/upload/1c/11/e6/d8211526b5bdc67aaaef2af9e8cf7dc8.png" alt="" />
                            <div className="headerClient__payment-divider"></div>
                            <p className="mb-0 headerClient__payment-text">Thanh toán</p>
                        </Link>
                    </div>
                    <div className="col-auto">
                        <img className="headerClient__payment-img" src="https://salt.tikicdn.com/ts/upload/ae/b1/ea/65e64a529e4ff888c875129d3b11ff29.png" alt="" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderPayment;