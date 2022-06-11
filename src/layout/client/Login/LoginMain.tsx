import { FormikProps, useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FacebookAuthProvider, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { authentication } from "../../../firebase-config"
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";
import usersService from "../../../services/usersService";
import { updateUser } from "../../../modules/user/useSlice";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import { showToast } from "../../../modules/toast/toastSlice";

interface Account {
    phoneNumber: string
}

interface ILoginMain {
    showSms: () => void,
    onShowSocialPhone: () => void,
    onPhoneNumber: (phoneNumber: string) => void
}

function LoginMain(props: ILoginMain) {
    const { showSms, onPhoneNumber, onShowSocialPhone } = props
    const dispatch = useDispatch()

    const formik: FormikProps<Account> = useFormik<Account>({
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

    const handleSubmitForm = (value: any) => {
        showSms()

    }

    const handleSignInSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        dispatch(showLoading())
        e?.preventDefault()
        configureCaptcha()
        const phoneNumber = `+84${formik.values.phoneNumber.slice(1, formik.values.phoneNumber.length)}`;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OTP sent")
                dispatch(hideLoading())
                onPhoneNumber(formik.values.phoneNumber)
                showSms()
            }).catch((error) => {
                console.log("OTP not sent", error)
                dispatch(hideLoading())
                // Error; SMS not sent
            });
    }

    const configureCaptcha = () => {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {

                handleSignInSubmit()
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
            }
        }, authentication);
    }

    const handleSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(authentication, provider)
            .then((result) => {
                const user = result.user;
                if (user.email) {
                    usersService.findByEmail(user.email)
                        .then(res => {
                            if (res) {
                                dispatch(updateUser(res))
                                dispatch(toggleFormLogin())
                                dispatch(showToast({ show: true, text: `Chào mừng ${res.name} đã quay trở lại, hãy vui vẻ mua sắm cùng Tiki nhé`, type: 'success', delay: 2500 }))
                            }
                            else {
                                dispatch(updateUser({
                                    address: '',
                                    avatar: user.photoURL,
                                    email: user.email ? user.email : '',
                                    name: user.displayName ? user.displayName : '',
                                    password: '',
                                    phone: ''
                                }))
                                onShowSocialPhone()
                            }
                        })
                }

                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log("Login failed google")
                // ...
            });
    }

    const handleSignInWithFacebook = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(authentication, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

            })
            .catch((error) => {
                console.log("Sign in with facebook failed: ", error)
            });

    }


    return (
        <>
            <div>
                <h2 className="login__account-title">Xin chào,</h2>
                <p className="login__account-title-sub">Đăng nhập hoặc Tạo tài khoản</p>
                <form onSubmit={(e) => handleSignInSubmit(e)} className="login__acount-form">
                    <div id="recaptcha-container"></div>
                    <div className="mb-4">
                        <input placeholder="Số điện thoại" {...formik.getFieldProps('phoneNumber')} className={`login__account-form-input ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`} />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="invalid-feedback">{formik.errors.phoneNumber}</div> : ''}
                    </div>
                    <button id="sign-in-button" type="submit" className="login__account-form-btn mb-3">
                        Tiếp Tục
                    </button>
                    <span className="login__account-form-email">Đăng nhập bằng email</span>
                </form>

            </div>
            <div className="login__account-social mt-5">
                <p className="position-relative header__account-social-text">
                    <span className="login__account-social-text-child">Hoặc tiếp tục bằng</span>
                </p>
                <div className="d-flex justify-content-center">
                    <img onClick={handleSignInWithFacebook} className="login__account-social-icon cursor-pointer me-2" src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png" alt="" />
                    <img onClick={handleSignInWithGoogle} className="login__account-social-icon cursor-pointer ms-2" src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png" alt="" />
                </div>
                <span className="login__account-social-text-sub mt-2">
                    Bằng việc tiếp tục, bạn đã chấp nhận <Link to="/">điều khoản sử dụng</Link>
                </span>
            </div>
        </>
    );
}

export default LoginMain;