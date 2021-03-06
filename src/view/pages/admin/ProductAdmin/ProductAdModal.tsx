import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import ImageUploading from "../../../../shared/components/ImageUploading";
import InputAdmin from "../../../../shared/components/InputAdmin";
import { Category, Product, ProductDetail, Trademark } from "../../../../shared/interfaces";
import productsService from "../../../../services/productService";
import { formatDate, handleCreateImage } from "../../../../shared/helpers";
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
        console.log("Product: ", product)
        if (product) {
            description.current = product.description
        }
        if (product && product._id !== '') {
            if (product.endDate) {
                product.endDate = formatDate(new Date(product.endDate), "yyyy-MM-dd")
            }
            if (product.startDate) {
                product.startDate = formatDate(new Date(product.startDate), "yyyy-MM-dd")
            }
            product.discount = product.discount ? product.discount : 0
            formik.setValues(product)
        }
        else {
            formik.resetForm()
            formik.setFieldValue('productDetails', [])

        }
        setShowToolbar(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const formik = useFormik<Product>({
        initialValues: {
            _id: '',
            description: '',
            material: '',
            name: '',
            origin: '',
            unit: '',
            discount: 0,
            rating: 0,
            category: '',
            trademark: '',
            price: 0,
            productDetails: []
        },
        validationSchema: Yup.object({
            _id: Yup.string(),
            name: Yup.string().required("T??n kh??ng ???????c ????? tr???ng.").max(500, "????? d??i k?? t??? ph???i d?????i 50"),
            material: Yup.string().required("Ch???t li???u kh??ng ???????c ????? tr???ng.").max(50, "????? d??i k?? t??? ph???i d?????i 50"),
            origin: Yup.string().required("Xu???t x??? kh??ng ???????c ????? tr???ng.").max(50, "????? d??i k?? t??? ph???i d?????i 50"),
            unit: Yup.string().required("????n v??? kh??ng ???????c ????? tr???ng.").max(50, "????? d??i k?? t??? ph???i d?????i 50"),
            price: Yup.number().required("Gi?? ti???n kh??ng ???????c ????? tr???ng.").typeError('Vui l??ng nh???p s???.').min(1, "Gi?? ti???n ph???i l???n h??n 0.").max(1000000000, "Gi?? ti???n ph???i b?? h??n 1,000,000,000."),
            category: Yup.string().required('Vui l??ng ch???n danh m???c.'),
            discount: Yup.number().typeError('Vui l??ng nh???p s???.'),
            trademark: Yup.string().required('Vui l??ng ch???n th????ng hi???u.'),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    console.log(formik.errors)

    const handleSubmitForm = async (value: any) => {
        value.description = description.current
        setIsLoading(true)
        const { _id, productDetails, rating, ...others } = value

        if (value._id === '') {
            try {
                const pro = await productsService.add({ ...others, })
                const proDetail: any = []
                await value.productDetails.forEach(async (proDe: ProductDetail, idx: number) => {
                    const { _id, ...otherProDe } = proDe
                    const images: string[] = []
                    await proDe.images.forEach(async (img: any, index: number) => {
                        const image = await handleCreateImage(img.file)
                        await images.push(image.data.url)
                        if (index === await proDe.images.length - 1) {

                            await proDetail.push({ ...otherProDe, product: pro._id, images: images })

                            if (value.productDetails.length === await proDetail.length) {
                                const proDetailAdd = await productDetailsService.add(proDetail)
                                if (proDetailAdd) {
                                    console.log("Product Detail: ", proDetail)
                                }

                                await dispatch(showToast({ show: true, text: "Th??m s???n ph???m th??nh c??ng", type: "success", delay: 1500 }))
                                setIsLoading(false)
                                onLoadData()
                                handleClose()
                            }
                        }
                    })
                });

            }
            catch (err) {
                dispatch(showToast({ show: true, text: "Th??m s???n ph???m th???t b???i", type: "error", delay: 1500 }))
                setIsLoading(false)
                handleClose()
            }
        }
        else {
            try {
                await productsService.update({ _id, ...others }, _id)

                const proDetail: any = []
                await value.productDetails.forEach(async (proDe: ProductDetail, idx: number) => {
                    const images: string[] = []
                    await proDe.images.forEach(async (img: any, index: number) => {
                        if (await img.file) {
                            const image = await handleCreateImage(img.file)
                            await images.push(image.data.url)
                        }
                        else {
                            await images.push(img.dataURL)
                        }

                        if (await index === proDe.images.length - 1) {

                            await proDetail.push({ ...proDe, product: value._id, images: images })

                            if (value.productDetails.length === await proDetail.length) {
                                console.log("Pro detail: ", proDetail)
                                console.log(value._id)
                                await productDetailsService.update(proDetail, value._id)
                                await dispatch(showToast({ show: true, text: "C???p nh???t s???n ph???m th??nh c??ng", type: "success", delay: 1500 }))
                                setIsLoading(false)
                                onLoadData()
                                handleClose()
                            }
                        }
                    })
                });

            }
            catch (err) {
                dispatch(showToast({ show: true, text: "C???p nh???t s???n ph???m th???t b???i", type: "error", delay: 1500 }))
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
                dispatch(showToast({ show: true, text: "X??a s???n ph???m th??nh c??ng", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                setIsLoading(false)
                dispatch(showToast({ show: true, text: "X??a s???n ph???m th???t b???i", type: "error", delay: 1500 }))
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
                    <h5 className="mb-0">{product?._id === '' ? 'Th??m' : 'C???p Nh???t'} S???n Ph???m</h5>
                </Modal.Header>
                <Modal.Body className="modal__body-ad" style={{ maxHeight: "70vh", height: "auto", overflowY: "scroll" }}>
                    <InputAdmin
                        placeholder="T??n s???n ph???m..."
                        label="T??n"
                        id="productName"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                    />
                    
                    <div className="row mb-3 g-3 align-items-center">
                        <label className="col-lg-2 col-md-3">
                            Chi ti???t
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
                                                }} className="form-control inputSearch" placeholder="M??u s???c..." />
                                            </div>
                                            <div className="col">
                                                <ReactTagInput
                                                    tags={pro.sizes}
                                                    placeholder="K??ch c???"
                                                    onChange={(newTags: string[]) => {
                                                        const details = formik.getFieldProps('productDetails').value
                                                        details[index].sizes = newTags
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
                                            sizes: [],
                                            images: [],
                                        })
                                        return formik.setValues(prev => ({ ...prev, productDetails: details }))
                                    }} className="bg-ad-primary cursor-pointer text-white p-1 border-radius-4">Th??m</small>
                                </div>
                            </div>

                        </div>

                    </div>
                    <InputAdmin
                        placeholder="Gi?? ti???n..."
                        label="Gi?? ti???n"
                        id="productPrice"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('price')}
                        err={formik.touched.price && formik.errors.price}
                        errMessage={formik.errors.price}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Gi???m gi??..."
                        label="Gi???m gi??"
                        id="productDiscount"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('discount')}
                        err={formik.touched.discount && formik.errors.discount}
                        errMessage={formik.errors.discount}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="Ng??y b???t ?????u"
                        label="Ng??y b???t ?????u"
                        id="productStartDate"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('startDate')}
                        err={formik.touched.startDate && formik.errors.startDate}
                        errMessage={formik.errors.startDate}
                        type="date"
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Ng??y k???t th??c"
                        label="Ng??y k???t th??c"
                        id="productEndDate"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('endDate')}
                        err={formik.touched.endDate && formik.errors.endDate}
                        errMessage={formik.errors.endDate}
                        type="date"
                        input={true}
                    />

                    <InputAdmin
                        placeholder="Xu???t x???..."
                        label="Xu???t x???"
                        id="productOrigin"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('origin')}
                        err={formik.touched.origin && formik.errors.origin}
                        errMessage={formik.errors.origin}
                        input={true}
                    />
                    <InputAdmin
                        placeholder="Ch???t li???u..."
                        label="Ch???t li???u"
                        id="productMaterial"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('material')}
                        err={formik.touched.material && formik.errors.material}
                        errMessage={formik.errors.material}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="????n v???..."
                        label="????n v???"
                        id="productUnit"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('unit')}
                        err={formik.touched.unit && formik.errors.unit}
                        errMessage={formik.errors.unit}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="Danh m???c..."
                        label="Danh m???c"
                        id="productCategory"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('category')}
                        err={formik.touched.category && formik.errors.category}
                        errMessage={formik.errors.category}
                        options={categories && categories.map(cate => ({ value: cate._id, name: cate.name }))}
                    />

                    <InputAdmin
                        placeholder="Th????ng hi???u..."
                        label="Th????ng hi???u"
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
                                    <small className="ms-1">Vi???t m?? t???</small>
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
                        ????ng
                    </Button>
                    <Button
                        disabled={!formik.dirty || !formik.isValid}
                        onClick={() => formik.handleSubmit()}
                        className="bg-ad-primary btn-ad-primary"
                    >
                        {isLoading ? <Spinner size="sm" animation="border" variant="light" /> : 'L??u'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalAdDelete
                show={showModalDelete}
                onHide={onModalDelete}
                onDelete={handleDeleteProduct}
                isLoading={isLoading}
            />
        </>
    );
}

export default ProductAdModal;