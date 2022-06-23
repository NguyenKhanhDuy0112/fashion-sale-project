import InputAdmin from "../../../../shared/components/InputAdmin";
import InputFileAvatar from "../../../../shared/components/InputFileAvatar";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc"
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import usersService from "../../../../services/usersService";
import { handleCreateImage } from "../../../../shared/helpers";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";
import { updateUser } from "../../../../modules/user/useSlice";

function EditAccountDesk() {
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    useEffect(() => {
        formik.setValues({
            _id: currentUser._id ? currentUser._id : '',
            name: currentUser.name,
            avatar: { file: null, url: currentUser.avatar }
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            _id: '',
            name: '',
            avatar: { file: null, url: '' },
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            name: Yup.string().required("Tên không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleSubmitForm = async (values: any) => {
        dispatch(showLoading())
        try {
            if (values.avatar.file) {
                const image = await handleCreateImage(values.avatar.file)
                if (image) {
                    const user = await usersService.update(currentUser._id ? currentUser._id : '',
                        {
                            ...currentUser,
                            name: values.name,
                            avatar: image.data.url
                        }
                    )
                    dispatch(updateUser(user))
                }
            } else {
                console.log("User: ",  { ...currentUser, name: values.name, avatar: values.avatar.url })
                const user = await usersService.update(currentUser._id ? currentUser._id : '', { ...currentUser, name: values.name, avatar: values.avatar.url })
                dispatch(updateUser(user))
            }
            await dispatch(hideLoading())
        } catch (err) {
            await dispatch(hideLoading())
            console.log("EROR")
        }


    }

    const getBase64 = (file: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            formik.setFieldValue('avatar', { file: file, url: reader.result })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <article className="editAccount__desk">
            <h5 className="editAccount__title mb-4">Thông tin tài khoản</h5>
            <div className="bg-white border-radius-4 p-3">
                <div className="row g-3">
                    <div className="col">
                        <div className="border-r-f7 h-100">
                            <p className="editAccount__title-sub d-xl-block d-none">Thông tin cá nhân</p>
                            <div className="d-flex flex-xl-row flex-column align-items-start">
                                <div className="d-flex editAccount__avatar">
                                    <InputFileAvatar
                                        avatar={formik.getFieldProps('avatar').value.url}
                                        onChangeFile={file => getBase64(file)}
                                    />
                                </div>
                                <div className="ms-2 w-100 d-flex flex-column justify-content-between editAccount__name">
                                    <InputAdmin
                                        input={true}
                                        id="fullName"
                                        label="Họ & Tên"
                                        placeholder="Họ và tên đầy đủ"
                                        frmField={formik.getFieldProps('name')}
                                        err={formik.touched.name && formik.errors.name}
                                        errMessage={formik.touched.name && formik.errors.name}
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
                                <div className="col-xl-3">
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
                            <div className="d-xl-flex d-none justify-content-center mt-4">
                                <button type="submit" onClick={() => formik.handleSubmit()} className="d-flex editAccount__btn-save justify-content-center align-items-center">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <p className="editAccount__title-sub">Số điện thoại và email</p>
                        <div className="d-flex justify-content-between align-items-center pb-3 border-b-f7">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <HiOutlinePhone color="#ADADB6" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Số điện thoại</span>
                                    <span className="editAccount__label">{currentUser.phone}</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <MdOutlineEmail color="#ADADB6" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Email</span>
                                    <span className="editAccount__label">{currentUser.email}</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>
                        <p className="editAccount__title-sub">Bảo mật</p>
                        <div className="d-flex justify-content-between align-items-center pb-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <AiFillLock color="#ADADB6" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Đổi mật khẩu</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>

                        <p className="editAccount__title-sub">Liên kết mạng xã hội</p>
                        <div className="d-flex justify-content-between align-items-center pb-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <BsFacebook color="#2981F3" size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Facebook</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    <FcGoogle size={20} />
                                </span>
                                <div className="d-flex flex-column">
                                    <span className="editAccount__label">Google</span>
                                </div>
                            </div>
                            <button className="editAccount__btn">Cập nhật</button>
                        </div>

                        <div className="d-xl-none d-flex justify-content-center mt-4">
                            <button className="d-flex editAccount__btn-save justify-content-center align-items-center">
                                Lưu thay đổi
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </article>
    );
}

export default EditAccountDesk;