import ModalCustom from "../../../shared/components/ModalCustom";
import useShowLogin from "../../../shared/hooks/useShowLogin";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import LoginMain from "./LoginMain";
import { useState, useEffect} from "react";
import LoginSms from "./LoginSms";

function Login() {
    const [showSms, setShowSms] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const showLogin = useShowLogin()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setShowSms(false)
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[showLogin === false])

    const handleToggle = () => {
        setShowSms(false)
        dispatch(toggleFormLogin())
    }

    return (
        <ModalCustom
            className="login__account-modal"
            position="center"
            close={true}
            show={showLogin}
            onHandleShow={handleToggle}
        >
            <div className="row g-0">
                <div className="col-lg-8 col-12 order-lg-first order-last">
                    <div className="login__account-left p-5">
                        {showSms ? <LoginSms onShowSms={() => setShowSms(!showSms)} /> : <LoginMain onPhoneNumber={(phoneNumber) => setPhoneNumber(phoneNumber)} showSms={() => setShowSms(!showSms)} />}
                    </div>
                </div>
                <div className="col order-lg-last order-first">
                    <div className="login__account-ad h-100">
                        <div className="py-2">
                            <img className="login__account-ad-img" src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" alt="" />
                            <p className="login__account-ad-text mb-0 mt-3">Mua sắm tại Tiki</p>
                            <small className="login__account-ad-text login__account-ad-text-sub d-block">Siêu ưu đãi mỗi ngày</small>
                        </div>
                    </div>
                </div>
            </div>
        </ModalCustom>
    );
}

export default Login;