import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import * as Yup from "yup"
import ImageUploading from "../../../../shared/components/ImageUploading";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { Category, Product, ProductDetail } from "../../../../shared/interfaces";
import { toast } from "react-toastify"
import productsService from "../../../../services/productService";
import { handleCreateImage } from "../../../../shared/helpers";
import categoriesService from "../../../../services/categoriesService";
import ReactTagInput from "@pathofdev/react-tag-input";
import { IoMdClose } from "react-icons/io";


interface ModalShow {
    show: boolean,
    showModalDelete: boolean
    product?: Product,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function ProductAdModal(props: ModalShow) {
    const { show, handleClose, product, onLoadData, onModalDelete, showModalDelete } = props
    const [categories, setCategories] = useState<Category[]>()

    useEffect(() => {
        handleLoadCategories()
    }, [])

    const handleLoadCategories = async () => {
        const categoriesData = await categoriesService.list()
        setCategories(categoriesData)
    }

    useEffect(() => {
        if (product?._id !== '') {
            formik.setValues(product ? product : {
                _id: '',
                description: '',
                material: '',
                name: '',
                origin: '',
                unit: '',
                category: undefined,
                price: undefined,
                productDetails: [{
                    _id: '',
                    color: '',
                    size: [],
                    images: [],
                }]
            })
        }
        else {
            formik.setValues({
                _id: '',
                description: '',
                material: '',
                name: '',
                origin: '',
                unit: '',
                category: undefined,
                price: undefined,
                productDetails: [{
                    _id: '',
                    color: '',
                    size: [],
                    images: [],
                }]
            })
        }
    }, [product])




    const formik = useFormik<Product>({
        initialValues: {
            _id: '',
            description: '',
            material: '',
            name: '',
            origin: '',
            unit: '',
            rating: 0,
            category: undefined,
            price: undefined,
            productDetails: [{
                _id: '',
                color: '',
                size: [],
                images: [],
            }]
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            name: Yup.string().required("Tên không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            description: Yup.string().required("Mô tả không được để trống."),
            material: Yup.string().required("Chất liệu không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            origin: Yup.string().required("Xuất xứ không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            unit: Yup.string().required("Đơn vị không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            price: Yup.number().required("Giá tiền không được để trống.").typeError('Vui lòng nhập số.').min(1, "Giá tiền phải lớn hơn 0.").max(1000000000, "Giá tiền phải bé hơn 1,000,000,000."),
            category: Yup.string().required('Vui lòng chọn danh mục.'),
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

                const { _id, ...others } = value

                if (value._id) {
                    try {
                        await productsService.update(_id, { ...others })
                        toast.success('Cập nhật sản phẩm thành công!')
                        onLoadData()
                    } catch (err) {
                        toast.error('Cập nhật sản phẩm thất bại!')
                    }
                }
                else {
                    try {
                        await productsService.add(others)
                        toast.success('Thêm sản phẩm thành công!')
                        onLoadData()
                    } catch (err) {
                        toast.error('Thêm sản phẩm thất bại!')
                    }
                }
            }
        });

        handleClose()

    }

    const handleDeleteCategory = async () => {
        if (product?._id) {
            try {
                await productsService.delete(product._id)
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
                    <h5 className="mb-0">{product?._id === '' ? 'Thêm' : 'Cập Nhật'} Sản Phẩm</h5>
                </Modal.Header>
                <Modal.Body className="modal__body-ad" style={{ maxHeight: "70vh", height: "auto", overflowY: "scroll" }}>
                    <InputAdmin
                        placeholder="Tên sản phẩm..."
                        label="Tên"
                        id="productName"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                    />
                    <div className="row mb-3 g-3 align-items-center">
                        <label className="col-lg-2 col-md-3">
                            Chi tiết
                        </label>
                        <div className="col">
                            {formik.getFieldProps('productDetails').value.map((pro: ProductDetail, index: number) => {
                                return (
                                    <div key={index} className="productAdModal__detail p-3 mb-3">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-12">
                                                <ImageUploading
                                                    onChangeImage={(image) => {
                                                        const details = formik.getFieldProps('productDetails').value
                                                        const images = details[index].images
                                                        images.push(image)
                                                        details[index].images = images
                                                        return formik.setValues(prev => ({ ...prev, productDetails: details }))
                                                    }}
                                                    max={50}
                                                    imageData={pro.images}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <input value={pro.color} onChange={(e) => {
                                                    const details = formik.getFieldProps('productDetails').value
                                                    details[index].color = e.target.value
                                                    return formik.setValues(prev => ({ ...prev, productDetails: details }))
                                                }} className="form-control inputSearch" placeholder="Màu sắc..." />
                                            </div>
                                            <div className="col">
                                                <ReactTagInput
                                                    tags={pro.size}
                                                    placeholder="Kích cỡ"
                                                    onChange={(newTags: string[]) => {
                                                        const details = formik.getFieldProps('productDetails').value
                                                        details[index].size = newTags
                                                        return formik.setValues(prev => ({ ...prev, productDetails: details }))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <span onClick={() => {
                                            const details = formik.getFieldProps('productDetails').value
                                            details.splice(index, 1)
                                            return formik.setValues(prev => ({ ...prev, productDetails: details }))
                                        }} className="productAdModal__detail-close">
                                            <IoMdClose />
                                        </span>
                                    </div>
                                )
                            })}
                            <div className="row mt-3">
                                <div className="col">
                                    <small onClick={() => {
                                        const details = formik.getFieldProps('productDetails').value
                                        details.push({
                                            _id: '',
                                            color: '',
                                            size: [],
                                            images: [],
                                        })
                                        return formik.setValues(prev => ({ ...prev, productDetails: details }))
                                    }} className="bg-ad-primary cursor-pointer text-white p-1 border-radius-4">Thêm</small>
                                </div>
                            </div>

                        </div>

                    </div>
                    <InputAdmin
                        placeholder="Giá tiền..."
                        label="Giá tiền"
                        id="productPrice"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('price')}
                        err={formik.touched.price && formik.errors.price}
                        errMessage={formik.errors.price}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Xuất xứ..."
                        label="Xuất xứ"
                        id="productOrigin"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('origin')}
                        err={formik.touched.origin && formik.errors.origin}
                        errMessage={formik.errors.origin}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Chất liệu..."
                        label="Chất liệu"
                        id="productMaterial"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('material')}
                        err={formik.touched.material && formik.errors.material}
                        errMessage={formik.errors.material}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="Đơn vị..."
                        label="Đơn vị"
                        id="productUnit"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('unit')}
                        err={formik.touched.unit && formik.errors.unit}
                        errMessage={formik.errors.unit}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="--Chọn danh mục--"
                        label="Danh mục"
                        id="productMaterial"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('category')}
                        err={formik.touched.category && formik.errors.category}
                        errMessage={formik.errors.category}
                        options={categories ? categories.map(cate => ({ name: cate.name, value: cate._id })) : []}
                    />

                    <InputAdmin
                        placeholder="Mô tả..."
                        label="Mô tả"
                        id="Mô tả"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('description')}
                        err={formik.touched.description && formik.errors.description}
                        errMessage={formik.errors.description}
                        rows={6}
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

export default ProductAdModal;