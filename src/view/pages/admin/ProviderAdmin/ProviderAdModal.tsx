import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import ImageUploading from "../../../../shared/components/ImageUploading";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { User } from "../../../../shared/interfaces";
import * as Yup from "yup";
import usersService from "../../../../services/usersService";
import { toast } from "react-toastify";
import { handleCreateImage } from "../../../../shared/helpers";
import { useFormik } from "formik";

interface ModalShow {
    show: boolean,
    showModalDelete: boolean,
    user?: User,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function ProviderAdModal({ show, handleClose, user, onLoadData, onModalDelete, showModalDelete }: ModalShow) {

    useEffect(() => {
        if (user?._id) {
            user.avatar = [{ dataURL: user.avatar }]
            formik.setValues(user)
        }
        else {
            formik.resetForm()
        }
    }, [user])


    const formik = useFormik({
        initialValues: {
            _id: '',
            name: '',
            phone: '',
            password: '',
            email: '',
            address: '',
            avatar: []
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            name: Yup.string().required("Tên không được để trống.").max(50, "Độ dài tối da 50 kí tự."),
            phone: Yup.string().required('Số điện thoại không được để trống.').max(50, 'Độ dài tối da 50 kí tự.'),
            email: Yup.string().required("Email không được để trống.").email("Trường này phải là email.").max(200, "Độ dài tối đa 200 kí tự"),
            address: Yup.string().required('Địa chỉ không được để trống.').max(200, 'Độ dài tối đa là 200 kí tự.'),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleSubmitForm = async (value: any) => {
        const images: string[] = []
        value.avatar.forEach(async (img: any, index: number) => {
            if (img.file) {
                const imageURL = await handleCreateImage(value.avatar[index].file)
                if (imageURL) images.push(imageURL.data.url)
            }
            else {
                images.push(img.dataURL)
            }

            if (index === value.avatar.length - 1) {
                value.isProvider = 1

                const { _id, avatar,...others } = value

                
                if (value._id) {
                    try {
                        await usersService.update(_id, { avatar : images[0],...others })
                        toast.success('Cập nhật nhà cung cấp thành công!')
                        onLoadData()
                    } catch (err) {
                        toast.error('Cập nhật nhà cung cấp thất bại!')
                    }
                  
                }
                else {
                    try {
                        await usersService.add({avatar: images[0], ...others})
                        toast.success('Thêm nhà cung cấp thành công!')
                        onLoadData()
                    } catch (err) {
                        toast.error('Thêm nhà cung cấp thất bại!')
                    }
                }
            }
        });

        handleClose()

    }

    const handleDeleteCategory = async () => {
        if (user?._id) {
            try {
                await usersService.delete(user._id)
                toast.success('Xóa khách hàng thành công')
                onLoadData()
            }
            catch (err) {
                toast.error('Xóa khách hàng thất bại')
            }
        }
        onModalDelete()
    }

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <h5 className="mb-0">{user?._id === '' ? 'Thêm' : 'Cập Nhật'} Nhà Cung Cấp</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-items-center mb-3 g-3">
                        <div className="col-md-3 col-lg-2">
                            <label className="mb-0 fs-6">Hình Ảnh</label>
                        </div>
                        <div className="col">
                            <ImageUploading
                                onChangeImage={(image) => {
                                    return formik.setValues(prev => ({ ...prev, avatar: image ? image : [] }))
                                }}
                                max={1}
                                imageData={formik.getFieldProps('avatar').value}
                            />
                        </div>
                    </div>

                    <InputAdmin
                        placeholder="Tên khách hàng..."
                        label="Tên"
                        id="customerId"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="Số điện thoại..."
                        label="Số điện thoại"
                        id="customerPhone"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('phone')}
                        err={formik.touched.phone && formik.errors.phone}
                        errMessage={formik.errors.phone}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="Email..."
                        label="Email"
                        id="customerEmail"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('email')}
                        err={formik.touched.email && formik.errors.email}
                        errMessage={formik.errors.email}
                        input={true}
                    />


                    <InputAdmin
                        placeholder="Địa chỉ..."
                        label="Địa chỉ"
                        id="customerAddress"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('address')}
                        err={formik.touched.address && formik.errors.address}
                        errMessage={formik.errors.address}
                        input={true}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button
                        disabled={!formik.dirty || !formik.isValid}
                        onClick={() => formik.handleSubmit()}
                        className="bg-ad-primary btn-ad-primary"
                    >
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalDelete} centered onHide={onModalDelete}>
                <Modal.Body>
                    <p className="text-center text-danger fs-3"><FiTrash2 /></p>
                    <h5 className="text-center modal__text-head mb-1">Bạn có chắc là muốn xóa mục này?</h5>
                    <p className="text-center modal__text-sub mb-0">Bạn có thực sự muốn xóa mục này? Bạn không thể xem mục này trong danh sách của mình nữa nếu bạn xóa!</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-center align-items-center w-100">
                        <button
                            className="btn modal__btn-cancel me-1"
                            onClick={onModalDelete}
                        >
                            Đóng
                        </button>
                        <button
                            type="button"
                            className="btn btn-ad-primary modal__btn-delete ms-1 text-white"
                            onClick={handleDeleteCategory}
                        >
                            Xóa
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProviderAdModal;