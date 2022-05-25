import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import * as Yup from "yup";
import ImageUploading from "../../../../shared/components/ImageUploading";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { Category, Product, ProductDetail, Trademark } from "../../../../shared/interfaces";
import productsService from "../../../../services/productService";
import { handleCreateImage } from "../../../../shared/helpers";
import categoriesService from "../../../../services/categoriesService";
import ReactTagInput from "@pathofdev/react-tag-input";
import { IoMdClose } from "react-icons/io";
import Editor from "../../../../shared/components/Editor";
import { BsPencil } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../modules/toast/toastSlice";
import productDetailsService from "../../../../services/productDetailsService";
import trademarksService from "../../../../services/trademarksService";
import ModalAdDelete from "../../../../shared/components/ModalAdDelete";

interface ModalShow {
    show: boolean,
    showModalDelete: boolean
    product?: Product,
    handleClose: () => void
    onLoadData: () => void,
    onModalDelete: () => void
}

function ProductAdModal(props: ModalShow) {
    const description = useRef<string>(' ')
    const { show, handleClose, product, onLoadData, onModalDelete, showModalDelete } = props
    const [categories, setCategories] = useState<Category[]>()
    const [trademarks, setTrademarks] = useState<Trademark[]>()
    const [showToolbar, setShowToolbar] = useState(false)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        handleLoadCategories()
        handleLoadTrademarks()
    }, [])

    const handleLoadCategories = async () => {
        const categoriesData = await categoriesService.list()
        setCategories(categoriesData.data)
    }

    const handleLoadTrademarks = async () => {
        const trademarkData = await trademarksService.list()
        setTrademarks(trademarkData.data)
    }

    useEffect(() => {
        if (product) {
            description.current = product.description
        }
        if (product?._id !== '') {
            formik.setValues(product ? product : {
                _id: '',
                description: '',
                material: '',
                name: '',
                origin: '',
                unit: '',
                category: undefined,
                price: 0,
                productDetails: []
            })


        }
        else {
            formik.resetForm()
            formik.setFieldValue('productDetails', [])

        }
        setShowToolbar(false)
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
            category: '',
            trademark: '',
            price: 0,
            productDetails: []
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            name: Yup.string().required("Tên không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            material: Yup.string().required("Chất liệu không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            origin: Yup.string().required("Xuất xứ không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            unit: Yup.string().required("Đơn vị không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            price: Yup.number().required("Giá tiền không được để trống.").typeError('Vui lòng nhập số.').min(1, "Giá tiền phải lớn hơn 0.").max(1000000000, "Giá tiền phải bé hơn 1,000,000,000."),
            category: Yup.string().required('Vui lòng chọn danh mục.'),
            trademark: Yup.string().required('Vui lòng chọn thương hiệu.'),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleSubmitForm = async (value: any) => {
        value.description = description.current
        console.log("Product Submit", value)
        setIsLoading(true)
        const proDetail: any = []
        const { _id, productDetails, rating, ...others } = value
        if (value._id === '') {
            try {
                const pro = await productsService.add({ ...others, })
                
                if (pro) {
                    await value.productDetails.forEach(async (proDe: any, indexParent: number) => {
                        const imageSub: any = []
                        await proDe.images.forEach(async (img: any, index: Number) => {
                            const image = await handleCreateImage(img.file)
                            await imageSub.push(image.data.url)

                            if (index === proDe.images.length - 1) {
                                await proDe.size.forEach(async (size: string, idx: number) => {
                                    const [thumnail, ...imageOther] = imageSub
                                    proDetail.push({ product: pro._id, color: proDe.color, image: thumnail, 'images-sub': [...imageOther], size: size })
                                    if (idx === proDe.size.length - 1 && indexParent === value.productDetails.length - 1) {
                                        await productDetailsService.add(proDetail)
                                        await dispatch(showToast({ show: true, text: "Thêm sản phẩm thành công", type: "success", delay: 1500 }))
                                        await setIsLoading(false)
                                        handleClose()
                                    }
                                });
                            }
                        });
                    });
                    await onLoadData()
                }

            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Thêm sản phẩm thất bại", type: "error", delay: 1500 }))
                setIsLoading(false)
                handleClose()
            }
        }
        else {
            try {
                const pro = await productsService.update(value._id, { ...others, })
                if (pro) {
                    await value.productDetails.forEach(async (proDe: any, indexParent: number) => {
                        const imageSub: any = []
                        await proDe.images.forEach(async (img: any, index: Number) => {
                            if (img.file) {
                                const image = await handleCreateImage(img.file)
                                await imageSub.push(image.data.url)
                            }
                            else {
                                await imageSub.push(img.dataURL)
                            }

                            if (index === proDe.images.length - 1) {
                                await proDe.size.forEach(async (size: string, idx: number) => {
                                    const [thumnail, ...imageOther] = imageSub
                                    proDetail.push({ ...proDe, product: pro._id, color: proDe.color, image: thumnail, 'images-sub': [...imageOther], size: size })
                                    if (idx === proDe.size.length - 1 && indexParent === value.productDetails.length - 1) {

                                        await productDetailsService.update(proDetail)
                                        await dispatch(showToast({ show: true, text: "Cập nhật sản phẩm thành công", type: "success", delay: 1500 }))
                                        await setIsLoading(false)
                                        handleClose()
                                    }
                                });
                            }
                        });
                    });
                    await onLoadData()

                }
            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Cập nhật sản phẩm thất bại", type: "error", delay: 1500 }))
                setIsLoading(false)
                handleClose()
            }
        }

    }

    const handleDeleteProduct = async () => {
        setIsLoading(true)
        if (product?._id) {
            try {
                await productsService.delete(product._id)
                dispatch(showToast({ show: true, text: "Xóa sản phẩm thành công", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                setIsLoading(false)
                dispatch(showToast({ show: true, text: "Xóa sản phẩm thất bại", type: "error", delay: 1500 }))
            }
        }
        onModalDelete()
    }

    const handleLoading = () => { }

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={isLoading ? handleLoading : handleClose}
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
                                                        details[index].images = image
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
                        placeholder="Danh mục..."
                        label="Danh mục"
                        id="productCategory"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('category')}
                        err={formik.touched.category && formik.errors.category}
                        errMessage={formik.errors.category}
                        options={categories && categories.map(cate => ({ value: cate._id, name: cate.name }))}
                    />

                    <InputAdmin
                        placeholder="Thương hiệu..."
                        label="Thương hiệu"
                        id="productTrademark"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('trademark')}
                        err={formik.touched.trademark && formik.errors.trademark}
                        errMessage={formik.errors.trademark}
                        options={trademarks && trademarks.map(tra => ({ value: tra._id, name: tra.name }))}
                    />

                    <div className="row g-1 align-items-center">
                        <div className="col">
                            <div className="d-flex align-items-center mb-3">
                                <p onClick={() => setShowToolbar(!showToolbar)} className="d-inline-block mb-0 bg-ad-primary cursor-pointer text-white p-2 border-radius-4">
                                    <BsPencil color="#fff" />
                                    <small className="ms-1">Viết mô tả</small>
                                </p>
                            </div>
                            {showToolbar &&
                                <Editor
                                    text={description.current ? description.current : ' '}
                                    onChangeText={(text) => description.current = text}
                                />
                            }
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={isLoading ? handleLoading : handleClose}>
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
                onDelete = {handleDeleteProduct}
                isLoading = {isLoading}
            />
        </>
    );
}

export default ProductAdModal;