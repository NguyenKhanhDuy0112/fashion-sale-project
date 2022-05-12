import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ModalCustom from "../../../shared/components/ModalCustom";
import * as Yup from "yup";
import { Link } from "react-router-dom";

interface Account {
    phoneNumber: string
}

function HeaderClientAuth() {
    const [showForm, setShowForm] = useState(false)

    const formik: FormikProps<Account> = useFormik<Account>({
        initialValues: {
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại.").max(10, "Số điện thoại không đúng định dạng.")
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }

    })

    const handleSubmitForm = (data: Account) => {
        console.log(data)
    }

    return (
        <>
            <div className="headerClient__account">
                <img className="headerClient__account-img" src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" alt="" />
                <p className="headerClient__account-content mb-0 ms-2" onClick={() => setShowForm(true)}>
                    <small className="headerClient__account-content-action">Đăng nhập / Đăng ký</small>
                    <span className="headerClient__account-content-text">Tài khoản <IoMdArrowDropdown /></span>
                </p>
            </div>
            <ModalCustom className="headerClient__account-modal" position="center" close={true} show={showForm} onHandleShow={(value) => setShowForm(value)}>
                <div className="row g-0">
                    <div className="col-lg-8 col-12 order-lg-first order-last">
                        <div className="headerClient__account-left p-5">
                            <div>
                                <h2 className="headerClient__account-title">Xin chào,</h2>
                                <p className="headerClient__account-title-sub">Đăng nhập hoặc Tạo tài khoản</p>
                                <div className="headerClient__acount-form">
                                    <div className="mb-4">
                                        <input placeholder="Số điện thoại" {...formik.getFieldProps('phoneNumber')} className={`headerClient__account-form-input ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`} />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="invalid-feedback">{formik.errors.phoneNumber}</div> : ''}
                                    </div>
                                    <button type="button" onClick={() => formik.handleSubmit()} className="headerClient__account-form-btn mb-3">
                                        Tiếp Tục
                                    </button>
                                    <span className="headerClient__account-form-email">Đăng nhập bằng email</span>
                                </div>


                            </div>
                            <div className="headerClient__account-social mt-5">
                                <p className="position-relative header__account-social-text">
                                    <span className="headerClient__account-social-text-child">Hoặc tiếp tục bằng</span>
                                </p>
                                <div className="d-flex justify-content-center">
                                    <img className="headerClient__account-social-icon cursor-pointer me-2" src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png" alt="" />
                                    <img className="headerClient__account-social-icon cursor-pointer ms-2" src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png" alt="" />
                                </div>
                                <span className="headerClient__account-social-text-sub mt-2">
                                    Bằng việc tiếp tục, bạn đã chấp nhận <Link to="/">điều khoản sử dụng</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col order-lg-last order-first">
                        <div className="headerClient__account-ad h-100">
                            <div className="py-2">
                                <img className="headerClient__account-ad-img" src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" alt="" />
                                <p className="headerClient__account-ad-text mb-0 mt-3">Mua sắm tại Tiki</p>
                                <small className="headerClient__account-ad-text headerClient__account-ad-text-sub d-block">Siêu ưu đãi mỗi ngày</small>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalCustom>
        </>
    );
}

export default HeaderClientAuth;