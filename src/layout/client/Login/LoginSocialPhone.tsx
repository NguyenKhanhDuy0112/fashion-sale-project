import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { authentication } from "../../../firebase-config";
import * as Yup from "yup";
import { useFormik } from "formik";
import usersService from "../../../services/usersService";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { updateUser } from "../../../modules/user/useSlice";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";

interface LoginSocialProps {
    onShowSocial: () => void,
    onShowSms: () => void
}

function LoginSocialPhone(props: LoginSocialProps) {
    const { onShowSocial, onShowSms } = props
    const [isValid, setIsValid] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()

    const formik = useFormik({
        initialValues: {
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại.").max(15, "Số điện thoại không đúng định dạng.")
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }

    })

    const handleSubmitForm = (values: any) => {
        dispatch(showLoading())
        usersService.findByPhoneNumber(values.phoneNumber)
            .then(res => {
                if (res) {
                    formik.setFieldError('phoneNumber', 'Số điện thoại đã đăng ký tài khoản.')
                    setIsValid(false)
                }
                else{
                    setIsValid(true)
                }
                dispatch(hideLoading())
            })
    }

    const configureCaptcha = () => {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                handleSendOtp()
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
            }
        }, authentication);
    }

    const handleSendOtp = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        formik.handleSubmit()
        
        if (isValid) {
            dispatch(showLoading())
            configureCaptcha()
            const phoneNumber = `+84${formik.values.phoneNumber.slice(1, formik.values.phoneNumber.length)}`;
            const appVerifier = window.recaptchaVerifier;
            console.log(phoneNumber)
            
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    console.log("OPT sent")
                    dispatch(hideLoading())
                    dispatch(updateUser({...currentUser, phone: formik.values.phoneNumber}))
                    onShowSocial()
                    onShowSms()
                }).catch((error) => {
                    console.log("OTP not sent", error)
                    dispatch(hideLoading())
                    // Error; SMS not sent
                });
        }

    }

    return (
        <>
            <div className="login__sms">
                <span onClick={onShowSocial} className="cursor-pointer">
                    <IoIosArrowBack size={30} color="#787878" />
                </span>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <img
                        src={(authentication.currentUser && authentication.currentUser.photoURL) ? authentication.currentUser.photoURL : ''}
                        alt=""
                        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                    />
                    <h4 className="mt-3"><strong>{authentication.currentUser?.displayName}</strong></h4>
                </div>
                <form onSubmit={handleSendOtp}>
                    <div id="recaptcha-container"></div>
                    <input placeholder="Số điện thoại" {...formik.getFieldProps('phoneNumber')} className={`form-control login__account-form-input ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`} />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="invalid-feedback">{formik.errors.phoneNumber}</div> : ''}
                    <button onClick={() => formik.handleSubmit()} type="submit" className="login__account-form-btn mb-3 mt-3">
                        Gửi mã xác minh
                    </button>
                </form>
            </div>
        </>
    );
}

export default LoginSocialPhone;