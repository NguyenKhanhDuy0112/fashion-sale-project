import { FormikProps, useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth";
import { authentication } from "../../../firebase-config"

interface Account {
    phoneNumber: string
}

interface ILoginMain {
    showSms: () => void,
    onPhoneNumber: (phoneNumber: string) => void
}

function LoginMain(props: ILoginMain) {
    const { showSms, onPhoneNumber } = props

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

    const handleSignInSubmit = (e?:React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        configureCaptcha()
        const phoneNumber = `+84798132664`;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        
        signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OPT sent")
                showSms()
            }).catch((error) => {
                console.log("OTP not sent", error)
                // Error; SMS not sent
            });
    }

    const configureCaptcha = () => {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response:any) => {
                
                handleSignInSubmit()
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
            }
        }, authentication);
    }


    return (
        <>
            <div>
                <h2 className="login__account-title">Xin chào,</h2>
                <p className="login__account-title-sub">Đăng nhập hoặc Tạo tài khoản</p>
                <form  onSubmit={(e) => handleSignInSubmit(e)} className="login__acount-form">
                    <div id = "recaptcha-container"></div>
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
                    <img className="login__account-social-icon cursor-pointer me-2" src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png" alt="" />
                    <img className="login__account-social-icon cursor-pointer ms-2" src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png" alt="" />
                </div>
                <span className="login__account-social-text-sub mt-2">
                    Bằng việc tiếp tục, bạn đã chấp nhận <Link to="/">điều khoản sử dụng</Link>
                </span>
            </div>
        </>
    );
}

export default LoginMain;