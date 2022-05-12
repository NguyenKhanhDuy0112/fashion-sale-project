import { useFormik } from "formik";
import { Category } from "../../../../shared/interfaces";
import * as Yup from "yup";
import { useEffect } from "react";
import categoriesService from "../../../../services/categoriesService";
import { toast } from "react-toastify";
import { handleCreateImage } from "../../../../shared/helpers";
import { Button, Modal } from "react-bootstrap";
import ImageUploading from "../../../../shared/components/ImageUploading";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { FiTrash2 } from "react-icons/fi";

interface ModalShow {
    show: boolean,
    showModalDelete: boolean
    coupon?: Category,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function CouponAdModal(props: ModalShow) {
    const { show, handleClose, coupon, onLoadData, onModalDelete, showModalDelete } = props

    useEffect(() => {
        if (coupon?._id) {
            coupon.image = [{ dataURL: coupon.image }]
            formik.setValues(coupon)
        }
        else {
            formik.resetForm()
        }
    }, [coupon])

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
                        toast.success('Cập nhật danh mục thành công!')
                        onLoadData()
                    } catch (err) {
                        toast.error('Cập nhật danh mục thất bại!')
                    }
                }
                else {
                    try {
                        await categoriesService.add({ image: images[0], ...others })
                        toast.success('Thêm danh mục thành công!')
                        onLoadData()
                    } catch (err) {
                        toast.error('Thêm danh mục thất bại!')
                    }
                }
            }
        });

        handleClose()

    }

    const handleDeleteCategory = async () => {
        if (coupon?._id) {
            try {
                await categoriesService.delete(coupon._id)
                toast.success('Xóa danh mục thành công')
                onLoadData()
            }
            catch (err) {
                toast.error('Xóa danh mục thất bại')
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
                    <h5 className="mb-0">{coupon?._id === "" ? 'Thêm' : 'Cập Nhật'} Mã giảm giá</h5>
                </Modal.Header>
                <Modal.Body>
                    <InputAdmin
                        placeholder="Mã giảm giá..."
                        label="Mã giảm giá"
                        id="couponId"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Ngày bắt đầu..."
                        label="Ngày bắt đầu"
                        id="couponStartDate"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                        type="date"
                    />
                    <InputAdmin
                        placeholder="Ngày kết thúc..."
                        label="Ngày kết thúc"
                        id="couponEndDate"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                        type = "date"
                    />
                    <InputAdmin
                        placeholder="Giảm giá..."
                        label="Giảm giá"
                        id="couponDiscount"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Số tiền tối thiểu..."
                        label="Số tiền tối thiểu"
                        id="couponMinimumAmount"
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

export default CouponAdModal;