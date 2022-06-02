import { useFormik } from "formik";
import { Button, Modal, Spinner } from "react-bootstrap";
import InputAdmin from "../../../../shared/components/InputAdmin";
import * as Yup from "yup";
import ImageUploading from "../../../../shared/components/ImageUploading";
import { Category } from "../../../../shared/interfaces";
import { useEffect, useState } from "react";
import { handleCreateImage } from "../../../../shared/helpers";
import categoriesService from "../../../../services/categoriesService";
import { FiTrash2 } from "react-icons/fi"
import { useDispatch } from "react-redux";
import { showToast } from "../../../../modules/toast/toastSlice";
import ModalAdDelete from "../../../../shared/components/ModalAdDelete";

interface ModalShow {
    show: boolean,
    showModalDelete: boolean
    category?: Category,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function CategoryAdModal(props: ModalShow) {
    const { show, handleClose, category, onLoadData, onModalDelete, showModalDelete  } = props
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (category?._id) {
            category.image = [{ dataURL: category.image }]
            formik.setValues(category)
        }
        else {
            formik.resetForm()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    const formik = useFormik({
        initialValues: {
            _id: '',
            name: '',
            image: []
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            name: Yup.string().required("Tên không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleSubmitForm = async (value: any) => {
        setIsLoading(true)
        const images: string[] = []
        value.image.forEach(async (img: any, index: number) => {
            if (img.file) {
                const imageURL = await handleCreateImage(value.image[0].file)
                if (imageURL) images.push(imageURL.data.url)
            }
            else {
                images.push(img.dataURL)
            }

            if (index === value.image.length - 1) {

                const { _id, image, ...others } = value

                if (value._id) {
                    try {
                        await categoriesService.update(_id, { ...others, image: images[0] })
                        dispatch(showToast({ show: true, text: "Cập nhật danh mục thành công", type: "success", delay: 1500 }))
                        onLoadData()
                        setIsLoading(false)
                        handleClose()
                    } catch (err) {
                        dispatch(showToast({ show: true, text: "Cập nhật danh mục thất bại", type: "error", delay: 1500 }))
                        setIsLoading(false)
                        handleClose()
                    }
                }
                else {
                    try {
                        await categoriesService.add({image: images[0],...others})
                        dispatch(showToast({ show: true, text: "Thêm danh mục thành công", type: "success", delay: 1500 }))
                        onLoadData()
                        setIsLoading(false)
                        handleClose()
                    } catch (err) {
                        dispatch(showToast({ show: true, text: "Thêm danh mục thành công", type: "error", delay: 1500 }))
                        setIsLoading(false)
                        handleClose()
                    }
                }
            }
        });


    }

    const handleDeleteCategory = async () => {
        setIsLoading(true)
        if (category?._id) {
            try {
                await categoriesService.delete(category._id)
                dispatch(showToast({ show: true, text: "Xóa danh mục thành công", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Xóa danh mục thất bại", type: "error", delay: 1500 }))
                setIsLoading(false)
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
                    <h5 className="mb-0">{category?._id === "" ? 'Thêm' : 'Cập Nhật'} Danh Mục</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-items-center mb-3 g-3">
                        <div className="col-md-3 col-lg-2">
                            <label className="mb-0 fs-6">Hình Ảnh</label>
                        </div>
                        <div className="col">
                            <ImageUploading
                                onChangeImage={(image) => {
                                    return formik.setValues(prev => ({ ...prev, image: image ? image : [] }))
                                }}
                                max={1}
                                imageData={formik.getFieldProps('image').value}
                            />
                        </div>
                    </div>

                    <InputAdmin
                        placeholder="Tên danh mục..."
                        label="Tên"
                        id="categoryId"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
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
                        {isLoading ? <Spinner size = "sm" animation="border" variant="light" /> : 'Lưu'}
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

            <ModalAdDelete
                show = {showModalDelete}
                onHide = {onModalDelete}
                onDelete = {handleDeleteCategory}
                isLoading = {isLoading}
            />
        </>
    );
}

export default CategoryAdModal;