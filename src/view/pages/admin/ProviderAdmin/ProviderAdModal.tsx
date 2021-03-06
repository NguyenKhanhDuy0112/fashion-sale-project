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
import ReactSelect from "react-select";
import addressService from "../../../../services/addressService";

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
    const [provinces, setProvinces] = useState<{ code: string, name: string }[]>()
    const [districts, setDistricts] = useState<{ code: string, name: string }[]>()
    const [villages, setVillages] = useState<{ code: string, name: string, fullName: string }[]>()

    useEffect(() => {
        if (user?._id) {
            handleLoadProvinces()
            user.avatar = [{ dataURL: user.avatar }]

            if (user.address.startsWith('{')) {
                const address = JSON.parse(user.address)
                handleLoadDistricts(address.province.code)
                handleLoadVillage(address.province.code, address.district.code)
                const province = { label: address.province.name, value: address.province.value }
                const district = { label: address.district.name, value: address.district.value }
                const village = { label: address.village.name, value: address.village.value }
                const addressDetail = address.detail
                formik.setValues({ ...user, province, district, village, address: addressDetail })
            }
            else {
                const province = { label: '', value: '' }
                const district = { label: '', value: '' }
                const village = { label: '', value: '' }
                const address = user.address

                formik.setValues({ ...user, province, district, village, address })
            }
        }
        else {
            const province = { label: '', value: '' }
            const district = { label: '', value: '' }
            const village = { label: '', value: '' }
            const address = ''

            formik.resetForm()
            formik.setFieldValue('province', province)
            formik.setFieldValue('district', district)
            formik.setFieldValue('village', village)
            formik.setFieldValue('address', address)
            handleLoadProvinces()
        }
    }, [user])


    const formik = useFormik<any>({
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
            name: Yup.string().required("T??n kh??ng ???????c ????? tr???ng.").max(50, "????? d??i t???i da 50 k?? t???."),
            phone: Yup.string().required('S??? ??i???n tho???i kh??ng ???????c ????? tr???ng.').max(50, '????? d??i t???i da 50 k?? t???.'),
            email: Yup.string().required("Email kh??ng ???????c ????? tr???ng.").email("Tr?????ng n??y ph???i l?? email.").max(200, "????? d??i t???i ??a 200 k?? t???"),
            address: Yup.string().required('?????a ch??? kh??ng ???????c ????? tr???ng.').max(200, '????? d??i t???i ??a l?? 200 k?? t???.'),
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleLoadProvinces = async () => {
        const provinces = await addressService.getProvince()
        setProvinces(provinces.data)
    }

    const handleLoadDistricts = async (province: string) => {
        const districts = await addressService.getDistrict(province)
        setDistricts(districts.data)
    }

    const handleLoadVillage = async (province: string, district: string) => {
        const villages = await addressService.getVilage(province, district)
        setVillages(villages.data)
    }

    const handleSubmitForm = async (value: any) => {
        setIsLoading(true)
        const images: string[] = []
        const province = await provinces?.find(pro => pro.code === value.province.value)
        const district = await districts?.find(pro => pro.code === value.district.value)
        const village = await villages?.find(pro => pro.code === value.village.value)
        const profile = await { ...value, province: province, district, village }
        const addressDetail = await { province, district, village, detail: profile.address }
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
                const { _id, avatar, province, district, address, village,...others } = value

                if (value._id) {
                    try {
                        await usersService.update(_id, { avatar: images[0], address: JSON.stringify(addressDetail) ,...others })
                        dispatch(showToast({ show: true, text: "C???p nh???t nh?? cung c???p th??nh c??ng", type: "success", delay: 1500 }))
                        onLoadData()
                        setIsLoading(false)
                        handleClose()
                    } catch (err) {
                        dispatch(showToast({ show: true, text: "C???p nh???t nh?? cung c???p th???t b???i", type: "error", delay: 1500 }))
                        setIsLoading(false)
                        handleClose()
                    }

                }
                else {
                    try {
                        await usersService.add({ avatar: images[0], address: JSON.stringify(addressDetail),...others })
                        dispatch(showToast({ show: true, text: "Th??m nh?? cung c???p th??nh c??ng", type: "success", delay: 1500 }))
                        onLoadData()
                        setIsLoading(false)
                        handleClose()
                    } catch (err) {
                        dispatch(showToast({ show: true, text: "Th??m nh?? cung c???p th???t b???i", type: "error", delay: 1500 }))
                        setIsLoading(false)
                        handleClose()
                    }
                }
            }
        });

    }

    const handleChangeProvince = async (value: any) => {
        setDistricts(undefined)
        formik.setFieldValue('district', { value: '', label: '' })
        formik.setFieldValue('province', value)
        formik.setFieldValue('village', { value: '', label: '' })
        await handleLoadDistricts(value.value)
    }

    const handleChangeDistrict = async (value: any) => {
        setVillages(undefined)
        formik.setFieldValue('district', value)
        formik.setFieldValue('village', { value: '', label: '' })
        await handleLoadVillage(formik.getFieldProps('province').value.value, value.value)
    }

    const handleDeleteProviders = async () => {
        setIsLoading(true)
        if (user?._id) {
            try {
                await usersService.delete(user._id)
                dispatch(showToast({ show: true, text: "X??a nh?? cung c???p th??nh c??ng", type: "success", delay: 1500 }))
                setIsLoading(false)
                onLoadData()
            }
            catch (err) {
                dispatch(showToast({ show: true, text: "X??a nh?? cung c???p th???t b???i", type: "error", delay: 1500 }))
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
                    <h5 className="mb-0">{user?._id === '' ? 'Th??m' : 'C???p Nh???t'} Nh?? Cung C???p</h5>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "70vh", height: "auto", overflowY: "scroll" }}>
                    <div className="row align-items-center mb-3 g-3">
                        <div className="col-md-3 col-lg-2">
                            <label className="mb-0 fs-6">H??nh ???nh</label>
                        </div>
                        <div className="col">
                            <ImageUploading
                                onChangeImage={(image) => {
                                    return formik.setValues((prev:any) => ({ ...prev, avatar: image ? image : [] }))
                                }}
                                max={1}
                                imageData={formik.getFieldProps('avatar').value}
                            />
                        </div>
                    </div>

                    <InputAdmin
                        placeholder="T??n kh??ch h??ng..."
                        label="T??n"
                        id="customerId"
                        labelClass="col-md-3 col-lg-2"
                        frmField={formik.getFieldProps('name')}
                        err={formik.touched.name && formik.errors.name}
                        errMessage={formik.errors.name}
                        input={true}
                    />

                    <InputAdmin
                        placeholder="S??? ??i???n tho???i..."
                        label="S??? ??i???n tho???i"
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

                    <div className="row mb-3 align-items-center">
                        <div className="col-md-3 col-lg-2">
                            <label>T???nh / Th??nh</label>
                        </div>
                        <div className="col-md">
                            <ReactSelect
                                {...formik.getFieldProps('province')}
                                placeholder="T???nh / Th??nh Ph???"
                                onChange={(value) => handleChangeProvince(value)}
                                options={provinces ? provinces.map(province => ({ label: province.name, value: province.code })) : []}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                        <div className="col-md-3 col-lg-2">
                            <label htmlFor="phoneNumber" className="addressPage__desk-label">
                                Qu???n / Huy???n
                            </label>
                        </div>
                        <div className="col">
                            <ReactSelect
                                {...formik.getFieldProps('district')}
                                placeholder="Ch???n Qu???n / Huy???n"
                                onChange={(value) => handleChangeDistrict(value)}
                                options={districts ? districts.map(province => ({ label: province.name, value: province.code })) : []}
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-md-3 col-lg-2">
                            <label htmlFor="phoneNumber" className="addressPage__desk-label">
                                Ph?????ng / X??
                            </label>
                        </div>
                        <div className="col">
                            <ReactSelect
                                {...formik.getFieldProps('village')}
                                placeholder="Ch???n Ph?????ng / X??"
                                onChange={(value) => formik.setFieldValue('village', value)}
                                options={villages ? villages.map(province => ({ label: province.name, value: province.code })) : []}
                            />
                        </div>
                    </div>


                    <InputAdmin
                        placeholder="?????a ch???..."
                        label="?????a ch???"
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
                isLoading={isLoading}
                onDelete={handleDeleteProviders}
                onHide={onModalDelete}
                show={showModalDelete}
            />

        </>
    );
}

export default ProviderAdModal;