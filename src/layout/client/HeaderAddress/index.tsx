import { Link } from "react-router-dom";

interface HeaderAddressProps {
    noneProgress?: boolean
}

function HeaderAddress(props: HeaderAddressProps) {
    const { noneProgress } = props
    
    return (
        <header className="headerClient__payment py-4 bg-white">
            <div className="container-client">
                <div className="row align-items-center">
                    <div className={!noneProgress ? 'col-2' : 'col'}>
                        <Link to="/" className="d-flex align-items-end">
                            <img className="headerClient__payment-logo" src="https://salt.tikicdn.com/ts/upload/1c/11/e6/d8211526b5bdc67aaaef2af9e8cf7dc8.png" alt="" />
                        </Link>
                    </div>
                    {!noneProgress &&
                        <div className="col">
                            <div className="headerClient__payment-progress d-flex align-items-center">
                                <div className="headerClient__payment-progress-step">
                                    <div className="headerClient__payment-progress-step-text">
                                        Đăng nhập
                                    </div>
                                    <div className="headerClient__payment-progress-step-bar">
                                        <div className="headerClient__payment-progress-step-bar-child"></div>
                                    </div>
                                    <div className="headerClient__payment-progress-step-circle">
                                        1
                                    </div>
                                </div>
                                <div className="headerClient__payment-progress-step">
                                    <div className="headerClient__payment-progress-step-text">
                                        Địa chỉ giao hàng
                                    </div>
                                    <div className="headerClient__payment-progress-step-bar">
                                        <div className="headerClient__payment-progress-step-bar-child"></div>
                                    </div>
                                    <div className="headerClient__payment-progress-step-circle">
                                        2
                                    </div>
                                </div>
                                <div className="headerClient__payment-progress-step">
                                    <div className="headerClient__payment-progress-step-text">
                                        Thanh toán & Đặt mua
                                    </div>
                                    <div className="headerClient__payment-progress-step-bar">
                                        <div className="headerClient__payment-progress-step-bar-child"></div>
                                    </div>
                                    <div className="headerClient__payment-progress-step-circle">
                                        3
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="col-auto">
                        <img className="headerClient__payment-img" src="https://salt.tikicdn.com/ts/upload/ae/b1/ea/65e64a529e4ff888c875129d3b11ff29.png" alt="" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAddress;