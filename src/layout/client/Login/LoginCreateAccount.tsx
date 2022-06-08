import { useFormik } from "formik";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import { authentication } from "../../../firebase-config";
import * as Yup from "yup";
import { updateProfile } from "firebase/auth";
import usersService from "../../../services/usersService";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";
import { showToast } from "../../../modules/toast/toastSlice";
import { updateUser } from "../../../modules/user/useSlice";

interface LoginAccountProps {
    onShowSms: () => void
}

function LoginCreateAccount(props: LoginAccountProps) {
    const { onShowSms } = props
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Vui lòng nhập tên."),
            password: Yup.string().required('Vui lòng nhập mật khẩu')
        }),
        onSubmit: (values) => {
            handleCreateAccount(values)
        }

    })

    const handleCreateAccount = (values: any) => {
        dispatch(showLoading())
        if (authentication.currentUser !== null) {
            updateProfile(authentication.currentUser, {
                displayName: values.name
            }).then(res => {
                if (authentication.currentUser?.uid) {
                    usersService.findByUid(authentication.currentUser?.uid)
                        .then(resU => {
                            usersService.update(resU._id, { ...resU, name: values.name, password: values.password })
                                .then(resUpdate => {
                                    if (resUpdate) {
                                        dispatch(hideLoading())
                                        dispatch(toggleFormLogin())
                                        dispatch(updateUser(resUpdate))
                                        dispatch(showToast({ show: true, text: `Chào mừng ${values.name} đã đến với Tiki, hãy vui vẻ mua sắm cùng Tiki nhé`, type: 'success', delay: 2500 }))
                                    }
                                    else {
                                        dispatch(hideLoading())
                                        dispatch(toggleFormLogin())
                                        dispatch(showToast({ show: true, text: `Tạo tài khoản lỗi`, type: 'error', delay: 2500 }))
                                    }

                                })
                        })
                }


            })
        }
        else {
            dispatch(toggleFormLogin())
        }

    }

    return (
        <section>
            <span onClick={onShowSms} className="cursor-pointer">
                <IoIosArrowBack size={30} color="#787878" />
            </span>
            <h2 className="login__account-title mt-4 mb-3">Tạo tài khoản</h2>
            <div>
                <p className="login__account-title-sub mb-1">Vui lòng cho biết tên của bạn</p>
                <input placeholder="Gồm 2 từ trở lên, không bao gồm số và kí tự đặt biệt" {...formik.getFieldProps('name')} className={`login__account-form-input login__account-input ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} />
                {formik.touched.name && formik.errors.name ? <div className="invalid-feedback">{formik.errors.name}</div> : ''}
            </div>
            <div className="mt-3">
                <p className="login__account-title-sub mb-1">Mật khẩu</p>
                <input type="password" placeholder="Mật khẩu" {...formik.getFieldProps('password')} className={`login__account-form-input login__account-input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} />
                {formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : ''}
            </div>
            <button onClick={() => formik.handleSubmit()} type="button" className="login__account-form-btn mb-3 mt-3">
                Tạo tài khoản
            </button>

        </section>
    );
}

export default LoginCreateAccount;