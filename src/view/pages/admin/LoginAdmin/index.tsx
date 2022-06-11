import { useFormik } from "formik";
import { useEffect } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";
import { updateUser } from "../../../../modules/user/useSlice";
import usersService from "../../../../services/usersService";

function LoginAdmin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('_grecaptcha')) {
            localStorage.removeItem('_grecaptcha')
        }

    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            handleLoginByEmailAndPassword(values)
        }

    })

    const handleLoginByEmailAndPassword = async (values: { email: string, password: string }) => {
        dispatch(showLoading())
        try {
            const user = await usersService.loginByEmailAndPassword(values)
            if (user && user.isAdmin === 1) {
                dispatch(updateUser(user))
                navigate('/admin/dashboard')
            }
            dispatch(hideLoading())
        }
        catch(err){
            console.log(err)
            dispatch(hideLoading())
        }
       
    }

    const handleKeyPressSubmit = (e: any) => {
        if(e.nativeEvent.code === 'Enter'){
            formik.handleSubmit()
        }
    }

    return (
        <>
            <div className="loginAdmin">
                <div className="container d-flex justify-content-center">
                    <div className="card" style={{ width: "23rem", maxWidth: "100%" }}>
                        <div className="card-header" style={{ backgroundColor: "#fff" }}>
                            <h3 className="loginAdmin__title mb-0 text-center p-2">Quản trị</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <input
                                            {...formik.getFieldProps('email')}
                                            type="email"
                                            className="form-control"
                                            placeholder="Tên đăng nhập"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <span className="input-group-text" id="basic-addon2">
                                            <FaUserAlt />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            onKeyPress={(e) => handleKeyPressSubmit(e)}
                                            {...formik.getFieldProps('password')}
                                            className="form-control"
                                            placeholder="Mật khẩu"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <span className="input-group-text" id="basic-addon2">
                                            <FaLock />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col">
                                    <input 
                                        id="remember" 
                                        className="form-check-input" 
                                        type="checkbox" 
                                    />
                                    <label htmlFor="remember" className="d-d-inline-block ms-2">
                                        Nhớ mật khẩu
                                    </label>
                                </div>
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        onClick={() => formik.handleSubmit()}
                                    >
                                        Đăng Nhập
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;