import ModalCustom from "../../../shared/components/ModalCustom";
import useShowLogin from "../../../shared/hooks/useShowLogin";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import LoginMain from "./LoginMain";
import { useState } from "react";
import LoginSms from "./LoginSms";
import LoginCreateAccount from "./LoginCreateAccount";
import usersService from "../../../services/usersService";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";
import { showToast } from "../../../modules/toast/toastSlice";
import { User } from "../../../shared/interfaces";
import { authentication } from "../../../firebase-config";
import { updateUser } from "../../../modules/user/useSlice";
import { IoIosArrowBack } from "react-icons/io";
import LoginSocialPhone from "./LoginSocialPhone";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";

function Login() {
    const [showSms, setShowSms] = useState(false)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showSocial, setShowSocial] = useState(false)
    const showLogin = useShowLogin()
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const handleToggle = () => {
        setShowSms(false)
        dispatch(toggleFormLogin())
    }

    const handleBackSms = () => {
        setShowCreateAccount(!showCreateAccount)
        setShowSms(true)
    }

    const handleChangePageCreateAccount = () => {
        dispatch(showLoading())
        usersService.findByPhoneNumber(phoneNumber)
            .then((res: User) => {
                if (res) {
                    dispatch(updateUser(res))
                    dispatch(hideLoading())
                    dispatch(toggleFormLogin())
                    setShowSms(false)
                    setShowCreateAccount(false)
                    dispatch(showToast({ show: true, text: `Chào mừng ${res.name} đã quay trở lại, hãy vui vẻ mua sắm cùng Tiki nhé`, type: 'success', delay: 2500 }))
                }
                else {
                    usersService.add({ id: (authentication.currentUser && authentication.currentUser.uid) ? authentication.currentUser.uid : '', address: '', avatar: '', email: '', name: '', password: '', phone: phoneNumber, isAdmin: 0, isCustomer: 1, isProvider: 0 })
                        .then(resU => {
                            setShowCreateAccount(!showCreateAccount)
                            setShowSms(!showSms)
                            dispatch(hideLoading())
                        })
                }
            })
    }

    return (
        <ModalCustom
            className="login__account-modal"
            position={`${window.innerWidth <= 1200 ? 'full' : 'center'}`}
            close={window.innerWidth <= 1200 ? false : true}
            show={showLogin}
            onHandleShow={handleToggle}
        >
            <div className="row g-0">
                <div className="col-lg-8 col-12 order-lg-first order-last">
                    <div className="login__account-left p-xl-5 p-3">
                        {
                            showSms
                            &&
                            <LoginSms
                                phoneNumber={phoneNumber}
                                onShowCreateAccount={handleChangePageCreateAccount}
                                onShowSms={() => setShowSms(!showSms)}
                            />
                        }

                        {showSocial && <LoginSocialPhone onShowSms={() => setShowSms(!showSms)} onShowSocial={() => setShowSocial(!showSocial)} />}

                        {showCreateAccount && <LoginCreateAccount onShowSms={handleBackSms} />}

                        {!showSms && !showCreateAccount && !showSocial &&
                            <LoginMain
                                onShowSocialPhone={() => setShowSocial(!showSocial)}
                                onPhoneNumber={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                showSms={() => setShowSms(!showSms)}
                            />}
                    </div>
                </div>
                <div className="col order-lg-last order-first">
                    <div className="login__account-ad h-100">
                        <div className="py-xl-2 p-0 position-relative">
                            <img className="login__account-ad-img d-xl-block d-none" src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" alt="" />
                            <p className="login__account-ad-text mb-0 mt-3 d-xl-block d-none">Mua sắm tại Tiki</p>
                            <small className="login__account-ad-text login__account-ad-text-sub d-xl-block d-none">Siêu ưu đãi mỗi ngày</small>
                            <img className="login__account-ad-img d-xl-none d-block" src="https://salt.tikicdn.com/ts/upload/1c/5a/ca/676e3133ef73cd4215edab2f16a96063.png" alt="" />
                            <span onClick={handleToggle} className="login__account-ad-close d-xl-none d-block">
                                <IoIosArrowBack size={25} color="#fff" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ModalCustom>
    );
}

export default Login;