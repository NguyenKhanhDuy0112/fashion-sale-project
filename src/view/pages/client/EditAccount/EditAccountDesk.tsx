import InputAdmin from "../../../../shared/components/InputAdmin";
import InputFileAvatar from "../../../../shared/components/InputFileAvatar";
import { HiOutlinePhone } from "react-icons/hi";

function EditAccountDesk() {
    return (
        <article className="editAccount__desk">
            <h5 className="editAccount__title mb-4">Thông tin tài khoản</h5>
            <div className="bg-white border-radius-4 p-3">
                <div className="row">
                    <div className="col">
                        <div className="border-r-f7 h-100">
                            <p className="editAccount__title-sub">Thông tin cá nhân</p>
                            <div className="d-flex align-items-start">
                                <InputFileAvatar />
                                <div className="ms-2 d-flex flex-column justify-content-between editAccount__name">
                                    <InputAdmin
                                        input={true}
                                        id="fullName"
                                        label="Họ & Tên"
                                        placeholder="Họ và tên đầy đủ"
                                        frmField={null}
                                        err={null}
                                        errMessage={null}
                                        labelClass="col-xl-3"
                                    />

                                    <InputAdmin
                                        input={true}
                                        id="nickname"
                                        label="Nickname"
                                        placeholder="Nickname"
                                        frmField={null}
                                        err={null}
                                        errMessage={null}
                                        labelClass="col-xl-3"
                                    />
                                </div>
                            </div>
                            <div className="row mt-3 g-2 align-items-center">
                                <div className="col-3">
                                    <label>Ngày sinh</label>
                                </div>
                                <div className="col">
                                    <div className="row align-items-center g-0">
                                        <div className="col">
                                            <InputAdmin
                                                err={null}
                                                errMessage={null}
                                                frmField={null}
                                                id="day"
                                                noneLabel={true}
                                                placeholder="Ngày"
                                                gap={0}
                                                labelClass=""
                                                options={Array.from({ length: 31 }).map((ite: any, index: number) => ({ value: index + 1, name: index + 1 }))}
                                            />
                                        </div>
                                        <div className="col">
                                            <InputAdmin
                                                err={null}
                                                errMessage={null}
                                                frmField={null}
                                                id="month"
                                                gap={0}
                                                noneLabel={true}
                                                placeholder="Tháng"
                                                labelClass=""
                                                options={Array.from({ length: 12 }).map((ite: any, index: number) => ({ value: index + 1, name: index + 1 }))}
                                            />
                                        </div>
                                        <div className="col">
                                            <InputAdmin
                                                err={null}
                                                errMessage={null}
                                                frmField={null}
                                                id="year"
                                                gap={0}
                                                noneLabel={true}
                                                placeholder="Năm"
                                                labelClass=""
                                                input={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3 g-2 align-items-center">
                                <div className="col-3">
                                    <label>Giới tính</label>
                                </div>
                                <div className="col">
                                    <div className="d-flex">
                                        <div className="d-flex align-items-center">
                                            <input name="gender" type="radio" id="male" />
                                            <label className="ms-1" htmlFor="male">Nam</label>
                                        </div>
                                        <div className="d-flex align-items-center ms-3">
                                            <input name="gender" type="radio" id="female" />
                                            <label className="ms-1" htmlFor="female">Nữ</label>
                                        </div>
                                        <div className="d-flex align-items-center ms-3">
                                            <input name="gender" type="radio" id="other" />
                                            <label className="ms-1" htmlFor="other">Khác</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <p className="editAccount__title-sub">Số điện thoại và email</p>
                        <div className="d-flex justify-content-between align-items-center pb-3 border-b-f7">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <HiOutlinePhone color = "#ADADB6" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Số điện thoại</span>
                                    <span className="editAccount__label">0798132664</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <HiOutlinePhone color = "#ADADB6" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Số điện thoại</span>
                                    <span className="editAccount__label">0798132664</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>
                        <p className="editAccount__title-sub">Bảo mật</p>
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <HiOutlinePhone color = "#ADADB6" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Đổi mật khẩu</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default EditAccountDesk;