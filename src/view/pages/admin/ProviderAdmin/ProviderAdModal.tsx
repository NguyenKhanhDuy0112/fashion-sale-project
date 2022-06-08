import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import ImageUploading from "../../../../shared/components/ImageUploading";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { User } from "../../../../shared/interfaces";
import * as Yup from "yup";
import usersService from "../../../../services/usersService";
import { handleCreateImage } from "../../../../shared/helpers";
import { useFormik } from "formik";
import ModalAdDelete from "../../../../shared/components/ModalAdDelete";
import { showToast } from "../../../../modules/toast/toastSlice";
import { useDispatch } from "react-redux";

interface ModalShow {
    show: boolean,
    showModalDelete: boolean,
    user?: User,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function ProviderAdModal({ show, handleClose, user, onLoadData, onModalDelete, showModalDelete }: ModalShow) {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user._id !== '') {
            user.avatar = [{ dataURL: user.avatar }]
            formik.setValues(user)
        }
        else {
            formik.resetForm()
        }
    }, [user])


    const formik = useFormik<User>({
        initialValues: {
            _id: '',
            id: '',
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
        setIsLoading(true)
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
                const { _id, avatar, ...others } = value
                if (value._id) {
                    try {
                        await usersService.update(_id, { avatar: images[0], ...others })
                        dispatch(showToast({ show: true, text: "Cập nhật nhà cung cấp thành công", type: "success", delay: 1500 }))
                        onLoadData()
                        setIsLoading(false)
                        handleClose()
                    } catch (err) {
                        dispatch(showToast({ show: true, text: "Cập nhật nhà cung cấp thất bại", type: "error", delay: 1500 }))
                        setIsLoading(false)
                        handleClose()
                    }

                }
                else {
                    try {
                        await usersService.add({ avatar: images[0], ...others })
                        dispatch(showToast({ show: true, text: "Thêm nhà cung cấp thành công", type: "success", delay: 1500 }))
                        onLoadData()
                        setIsLoading(false)
                        handleClose()
                    } catch (err) {
                        dispatch(showToast({ show: true, text: "Thêm nhà cung cấp thất bại", type: "error", delay: 1500 }))
                        setIsLoading(false)
                        handleClose()
                    }
                }
            }
        });

    }

    const handleDeleteProviders = async () => {
        setIsLoading(true)
        if (user?._id) {
            try {
                await usersService.delete(user._id)
                dispatch(showToast({ show: true, text: "Xóa nhà cung cấp thành công", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Xóa nhà cung cấp thất bại", type: "error", delay: 1500 }))
                setIsLoading(false)
            }
        }
        onModalDelete()
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
                        {isLoading ? <Spinner size="sm" animation="border" variant="light" /> : 'Lưu'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalAdDelete
                isLoading={isLoading}
                onDelete={handleDeleteProviders}
                onHide={onModalDelete}
                show={showModalDelete}
            />

        </>
    );
}

export default ProviderAdModal;