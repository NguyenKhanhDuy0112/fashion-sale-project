import { useEffect, useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"
import { FiTrash2 } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { showToast } from "../../../../modules/toast/toastSlice"
import { Trademark } from "../../../../shared/interfaces"
import * as Yup from "yup";
import trademarksService from "../../../../services/trademarksService"
import { useFormik } from "formik"
import ImageUploading from "../../../../shared/components/ImageUploading"
import InputAdmin from "../../../../shared/components/InputAdmin"
import { handleCreateImage } from "../../../../shared/helpers"
import ModalAdDelete from "../../../../shared/components/ModalAdDelete"

interface ModalShow {
    show: boolean,
    showModalDelete: boolean,
    trademark?: Trademark,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function TrademarkAdModal(props: ModalShow) {
    const { show, handleClose, trademark, onLoadData, onModalDelete, showModalDelete } = props
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (trademark?._id) {
            trademark.image = [{ dataURL: trademark.image }]
            formik.setValues(trademark)
        }
        else {
            formik.resetForm()
        }
    }, [trademark])

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
                        await trademarksService.update(_id, { ...others, image: images[0] })
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
                        await trademarksService.add({ image: images[0], ...others })
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

    const handleDeleteTrademark = async () => {
        setIsLoading(true)
        if (trademark?._id) {
            try {
                await trademarksService.delete(trademark._id)
                dispatch(showToast({ show: true, text: "Xóa sản phẩm thành công", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Xóa sản phẩm thất bại", type: "error", delay: 1500 }))
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
                    <h5 className="mb-0">{trademark?._id === "" ? 'Thêm' : 'Cập Nhật'} Thương Hiệu</h5>
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
                        placeholder="Tên thương hiệu..."
                        label="Tên"
                        id="trademarkId"
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
                        {isLoading ? <Spinner size="sm" animation="border" variant="light" /> : 'Lưu'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalAdDelete
                show = {showModalDelete}
                onHide = {onModalDelete}
                onDelete = {handleDeleteTrademark}
                isLoading = {isLoading}
            />
        </>
    );
}

export default TrademarkAdModal;