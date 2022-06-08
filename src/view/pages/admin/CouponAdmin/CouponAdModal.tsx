import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { Coupon } from "../../../../shared/interfaces";
import couponsService from "../../../../services/couponsService";
import ModalAdDelete from "../../../../shared/components/ModalAdDelete";
import { showToast } from "../../../../modules/toast/toastSlice";
import { useDispatch } from "react-redux";
import { formatDate } from "../../../../shared/helpers";

interface ModalShow {
    show: boolean,
    showModalDelete: boolean,
    coupon?: Coupon,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function CouponAdModal(props: ModalShow) {
    const { show, handleClose, coupon, onModalDelete, showModalDelete, onLoadData } = props
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (coupon?._id) {
            coupon.dateStart = formatDate(new Date(coupon.dateStart), "yyyy-MM-dd")
            coupon.dateEnd = formatDate(new Date(coupon.dateEnd), "yyyy-MM-dd")
            formik.setValues(coupon)
        }
        else {
            formik.resetForm()
        }
    }, [coupon])

    const formik = useFormik<Coupon>({
        initialValues: {
            _id: '',
            code: '',
            dateEnd: '',
            dateStart: '',
            discount: 0,
            isActive: true,
            minimumAmount: 0,
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            code: Yup.string().required("Mã giảm giá không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            dateEnd: Yup.date().required("Ngày kết thúc không được để trống").typeError("Vui lòng nhập đúng định dạng dd/MM/yyyy."),
            dateStart: Yup.date().required("Ngày bắt đầu không được để trống").typeError("Vui lòng nhập đúng định dạng dd/MM/yyyy."),
            discount: Yup.number().required("Số tiền giảm không được để trống").typeError('Vui lòng nhập số.').min(1, "Số tiền phải lớn hơn 0.").max(1000000000, "Số tiền phải bé hơn 1,000,000,000."),
            minimumAmount: Yup.number().required("Số tiền tối thiểu không được để trống").typeError('Vui lòng nhập số.').min(1, "Số tiền phải lớn hơn 0.").max(1000000000, "Số tiền phải bé hơn 1,000,000,000."),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleSubmitForm = async (value: Coupon) => {
        setIsLoading(true)
        const { _id, ...others } = value
        if (value._id === '') {
            try {
                await couponsService.add({ ...others })
                dispatch(showToast({ show: true, text: "Thêm mã giảm giá thành công", type: "success", delay: 1500 }))
                onLoadData()
                setIsLoading(false)
                handleClose()
            }
            catch {
                dispatch(showToast({ show: true, text: "Thêm mã giảm giá thất bại", type: "error", delay: 1500 }))
                setIsLoading(false)
                handleClose()
            }
        }
        else {

            try {
                await couponsService.update(_id ? _id: '', value)
                dispatch(showToast({ show: true, text: "Cập nhật mã giảm giá thành công", type: "success", delay: 1500 }))
                onLoadData()
                setIsLoading(false)
                handleClose()
            }
            catch {
                dispatch(showToast({ show: true, text: "Cập nhật mã giảm giá thất bại", type: "error", delay: 1500 }))
                setIsLoading(false)
                handleClose()
            }

        }

        handleClose()

    }


    const handleDeleteCoupon = async () => {
        setIsLoading(true)
        if (coupon?._id) {
            try {
                await couponsService.delete(coupon._id)
                dispatch(showToast({ show: true, text: "Xóa mã giảm giá thành công", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Xóa mã giảm giá thất bại", type: "error", delay: 1500 }))
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
                    <h5 className="mb-0">{coupon?._id === "" ? 'Thêm' : 'Cập Nhật'} Mã giảm giá</h5>
                </Modal.Header>
                <Modal.Body>
                    <InputAdmin
                        placeholder="Mã giảm giá..."
                        label="Mã giảm giá"
                        id="couponId"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('code')}
                        err={formik.touched.code && formik.errors.code}
                        errMessage={formik.errors.code}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Ngày bắt đầu..."
                        label="Ngày bắt đầu"
                        id="couponStartDate"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('dateStart')}
                        err={formik.touched.dateStart && formik.errors.dateStart}
                        errMessage={formik.errors.dateStart}
                        input={true}
                        type="date"
                    />
                    <InputAdmin
                        placeholder="Ngày kết thúc..."
                        label="Ngày kết thúc"
                        id="couponEndDate"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('dateEnd')}
                        err={formik.touched.dateEnd && formik.errors.dateEnd}
                        errMessage={formik.errors.dateEnd}
                        input={true}
                        type="date"
                    />
                    <InputAdmin
                        placeholder="Số tiền giảm..."
                        label="Số tiền giảm"
                        id="couponDiscount"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('discount')}
                        err={formik.touched.discount && formik.errors.discount}
                        errMessage={formik.errors.discount}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Số tiền tối thiểu..."
                        label="Số tiền tối thiểu"
                        id="couponMinimumAmount"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('minimumAmount')}
                        err={formik.touched.minimumAmount && formik.errors.minimumAmount}
                        errMessage={formik.errors.minimumAmount}
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
                show={showModalDelete}
                onHide={onModalDelete}
                onDelete={handleDeleteCoupon}
                isLoading={isLoading}
            />

        </>
    );
}

export default CouponAdModal;