import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

function LoginAdmin() {
    const navigate = useNavigate()
   
    return (
        <>
            <div className="loginAdmin">
                <div className="container d-flex justify-content-center">
                    <div className="card" style={{ width: "23rem" ,maxWidth:"100%"}}>
                        <div className="card-header" style={{ backgroundColor: "#fff" }}>
                            <h3 className="loginAdmin__title mb-0 text-center p-2">Quản trị</h3>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Tên đăng nhập" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <span className="input-group-text" id="basic-addon2"><FaUserAlt /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Mật khẩu" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <span className="input-group-text" id="basic-addon2"><FaLock /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col">
                                    <input id="remember" className="form-check-input" type="checkbox" />
                                    <label htmlFor="remember" className="d-d-inline-block ms-2">Nhớ mật khẩu</label>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary w-100" onClick={() => navigate("/admin/dashboard")}>Login</button>
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