import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import PinInput from "react-pin-input";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import { showToast } from "../../../modules/toast/toastSlice";

interface ILoginSms {
    onShowSms: () => void
}

declare global {
    interface Window {
        recaptchaVerifier: any,
        confirmationResult: any,
    }
}

function LoginSms(props: ILoginSms) {
    const { onShowSms } = props
    const [otp, setOtp] = useState('')
    const dispatch  = useDispatch()

    const handleSubmitOtp = () => {
        window.confirmationResult.confirm(otp).then((result:any) => {
            // User signed in successfully.
            const user = result.user;
            
            dispatch(toggleFormLogin())
            dispatch(showToast({show: true, text: "Chào mừng bạn đã quay trở lại, hãy vui vẻ mua sắm cùng Tiki nhé!", type: "success", delay: 1500}))
            
            // ...
        }).catch((error:any) => {
            console.log("Sign in faile")
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    return (
        <div className="login__sms">
            <span onClick={onShowSms} className="cursor-pointer">
                <IoIosArrowBack size={30} color="#787878" />
            </span>
            <h2 className="login__account-title mt-4">Nhập mã xác minh</h2>
            <p className="login__account-title-sub">Bạn đang đăng nhập thiết bị mới, vui lòng nhập mã gồm 6 chữ số vừa được gửi đến <strong>0798132664</strong></p>
            <div className="d-flex justify-content-center">
                <PinInput
                    length={6}
                    initialValue=""
                    type="numeric"
                    inputMode="number"
                    placeholder="0"
                    style={{ padding: '10px 7px' }}
                    onComplete={(value: any, index: number) => { setOtp(value) }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
            </div>
            <button onClick={handleSubmitOtp} type="button" className="login__account-form-btn mb-3 mt-3">
                Xác Minh
            </button>
        </div>
    );
}

export default LoginSms;