import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import PinInput from "react-pin-input";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import { showToast } from "../../../modules/toast/toastSlice";
import { updateUser } from "../../../modules/user/useSlice";
import usersService from "../../../services/usersService";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";

interface ILoginSms {
    onShowSms: () => void,
    phoneNumber: string,
    onShowCreateAccount: () => void
}

declare global {
    interface Window {
        recaptchaVerifier: any,
        confirmationResult: any,
    }
}

function LoginSms(props: ILoginSms) {
    const { onShowSms, onShowCreateAccount, phoneNumber } = props
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()

    const handleSubmitOtp = () => {
        dispatch(showLoading())
        window.confirmationResult.confirm(otp).then((result: any) => {
            const user = result.user;
            // User signed in successfully.
            if (currentUser.email !== '') {
                usersService.add({
                    address: '',
                    avatar: currentUser.avatar,
                    email: currentUser.email,
                    name: currentUser.name,
                    password: '',
                    phone: currentUser.phone,
                    isAdmin: 0,
                    isCustomer: 1,
                    isProvider: 0,
                    id: user.uid
                })
                    .then(res => {
                        if (res) {
                            dispatch(updateUser(res))
                            dispatch(showToast({ show: true, text: `Chào mừng ${res.name} đã đến với Tiki, hãy vui vẻ mua sắm cùng Tiki nhé`, type: 'success', delay: 2500 }))
                        }
                        dispatch(toggleFormLogin())
                        dispatch(hideLoading())
                    })
            }
            else {
                dispatch(hideLoading())
                onShowCreateAccount()
            }

            // ...
        }).catch((error: any) => {
            console.log("Sign in faile")
            dispatch(hideLoading())
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
            <p className="login__account-title-sub">Bạn đang đăng nhập thiết bị mới, vui lòng nhập mã gồm 6 chữ số vừa được gửi đến <strong>{phoneNumber}</strong></p>
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