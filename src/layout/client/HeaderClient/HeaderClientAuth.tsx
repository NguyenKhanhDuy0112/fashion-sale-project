import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import { authentication } from "../../../firebase-config";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";

function HeaderClientAuth() {
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const handleShowFormLogin = () => {
        if(currentUser._id === ''){
            dispatch(toggleFormLogin())
        }
    }

    const handleSignOut = () => {
        dispatch(showLoading())
        authentication.signOut()
            .then(res => {
                dispatch(hideLoading())
            })
    }

    return (
        <>
            <div className="headerClient__account">
                <img className="headerClient__account-img" src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" alt="" />
                <div className={`position-relative ${currentUser._id !== '' ? 'headerClient__account-auth' : ''}`}>
                    <p onClick={handleShowFormLogin} className="headerClient__account-content mb-0 ms-2">
                        <small className="headerClient__account-content-action">{currentUser._id !== '' ? 'Tài khoản' : 'Đăng Nhập / Đăng Ký'}</small>
                        <span className="headerClient__account-content-text">{currentUser._id !== '' ? currentUser.name : 'Tài khoản'} <IoMdArrowDropdown /></span>
                    </p>
                    <ul className="headerClient__account-list">
                        <li className="headerClient__account-list-item">
                            <Link to="" className="headerClient__account-list-item-link">
                                Đơn hàng của tôi
                            </Link>
                        </li>
                        <li className="headerClient__account-list-item">
                            <Link to="" className="headerClient__account-list-item-link">
                                Tài khoản của tôi
                            </Link>
                        </li>
                        <li className="headerClient__account-list-item">
                            <Link to="" className="headerClient__account-list-item-link">
                                Nhận xét sản phẩm đã mua
                            </Link>
                        </li>
                        <li className="headerClient__account-list-item">
                            <span onClick={handleSignOut} className="headerClient__account-list-item-link">
                                Thoát tài khoản
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default HeaderClientAuth;