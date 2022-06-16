import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ReactSelect from "react-select";
import * as Yup from "yup";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";
import { updateUser } from "../../../../modules/user/useSlice";
import addressService from "../../../../services/addressService";
import usersService from "../../../../services/usersService";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";

interface AddressForm {
    name: string,
    phoneNumber: string,
    province?: { code: string, name: string },
    district?: { code: string, name: string },
    village?: { code: string, name: string, fullName: string },
    address: '',

}

function AddressDesk() {
    const [provinces, setProvinces] = useState<{ code: string, name: string }[]>()
    const [districts, setDistricts] = useState<{ code: string, name: string }[]>()
    const [villages, setVillages] = useState<{ code: string, name: string, fullName: string }[]>()
    const navigate = useNavigate()
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()


    useEffect(() => {
        handleLoadProvinces()
        const address = JSON.parse(currentUser.address)
        formik.setFieldValue('name', currentUser.name)
        formik.setFieldValue('phoneNumber', currentUser.phone)
        if(currentUser.address !== ''){
            handleLoadDistricts(address.province.code)
            handleLoadVillage(address.province.code, address.district.code)
            formik.setFieldValue('province', {label: address.province.name, value:address.province.value})
            formik.setFieldValue('district', {label: address.district.name, value:address.district.value})
            formik.setFieldValue('village', {label: address.village.name, value:address.village.value})
            formik.setFieldValue('address', address.detail)
        }
       
    },[])

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

    const formik = useFormik<AddressForm>({
        initialValues: {
            name: '',
            phoneNumber: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên không được để trống.").max(50, "Độ dài kí tự phải dưới 50"),
            phoneNumber: Yup.string().required("Số điện thoại không được để trống."),
            address: Yup.string().required('Địa chỉ không được để trống')
        }),
        onSubmit: (values) => {
            handleSubmitForm(values)
        }
    })

    const handleSubmitForm = async (values: any) => {
        dispatch(showLoading())
        const province = provinces?.find(pro => pro.code === values.province.value)
        const district = districts?.find(pro => pro.code === values.district.value)
        const village = villages?.find(pro => pro.code === values.village.value)
        const profile = { ...values, province: province, district, village }
        const addressDetail = { province, district, village, detail: profile.address }

        try {
            const user = await usersService.update(currentUser._id ? currentUser._id : '', { ...currentUser, name: profile.name, phone: profile.phoneNumber, address: JSON.stringify(addressDetail) })
            await dispatch(hideLoading())
            await dispatch(updateUser(user))
            await navigate('/checkout/cart')
        } catch (err) {
            dispatch(hideLoading())
        
        }
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

    const handleSubmit = () => {
        formik.handleSubmit()
    }

    return (
        <article className="addressPage__desk">
            <h5 className="mb-3">2. Địa chỉ giao hàng</h5>
            <div className="addressPage__desk-form">
                <div className="row mb-3 align-items-center">
                    <div className="col-3">
                        <label htmlFor="name" className="addressPage__desk-label">Họ tên</label>
                    </div>
                    <div className="col">
                        <input
                            id="name"
                            {...formik.getFieldProps('name')}
                            placeholder="Nhập họ tên"
                            className={`form-control addressPage__desk-input ${(formik.touched.name && formik.errors.name) ? 'is-invalid' : ''}`}
                        />
                        {(formik.touched.name && formik.errors.name) && <div className="invalid-feedback">{formik.errors.name}</div>}
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-3">
                        <label htmlFor="phoneNumber" className="addressPage__desk-label">
                            Điện thoại di động
                        </label>
                    </div>
                    <div className="col">
                        <input
                            id="phoneNumber"
                            {...formik.getFieldProps('phoneNumber')}
                            placeholder="Nhập số điện thoại"
                            className={`form-control addressPage__desk-input ${(formik.touched.phoneNumber && formik.errors.phoneNumber) ? 'is-invalid' : ''}`}
                        />
                        {(formik.touched.phoneNumber && formik.errors.phoneNumber) && <div className="invalid-feedback">{formik.errors.phoneNumber}</div>}
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-3">
                        <label htmlFor="phoneNumber" className="addressPage__desk-label">
                            Tỉnh / Thành Phố
                        </label>
                    </div>
                    <div className="col">
                        <ReactSelect
                            {...formik.getFieldProps('province')}
                            placeholder="Tỉnh / Thành Phố"
                            onChange={(value) => handleChangeProvince(value)}
                            options={provinces ? provinces.map(province => ({ label: province.name, value: province.code })) : []}
                        />
                        {(formik.touched.province && formik.errors.province) && <div className="invalid-feedback">{formik.errors.province}</div>}
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-3">
                        <label htmlFor="phoneNumber" className="addressPage__desk-label">
                            Quận / Huyện
                        </label>
                    </div>
                    <div className="col">
                        <ReactSelect
                            {...formik.getFieldProps('district')}
                            placeholder="Chọn Quận / Huyện"
                            onChange={(value) => handleChangeDistrict(value)}
                            options={districts ? districts.map(province => ({ label: province.name, value: province.code })) : []}
                        />
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-3">
                        <label htmlFor="phoneNumber" className="addressPage__desk-label">
                            Phường / Xã
                        </label>
                    </div>
                    <div className="col">
                        <ReactSelect
                            {...formik.getFieldProps('village')}
                            placeholder="Chọn Phường / Xã"
                            onChange={(value) => formik.setFieldValue('village', value)}
                            options={villages ? villages.map(province => ({ label: province.name, value: province.code })) : []}
                        />
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-3">
                        <label htmlFor="phoneNumber" className="addressPage__desk-label">
                            Địa chỉ
                        </label>
                    </div>
                    <div className="col">
                        <textarea id="address"
                            {...formik.getFieldProps('address')}
                            placeholder="Ví dụ 52, Trần Hưng Đạo"
                            rows={1.5}
                            className={`form-control addressPage__desk-input none-height ${(formik.touched.address && formik.errors.address) ? 'is-invalid' : ''}`}></textarea>
                        {
                            (formik.touched.address && formik.errors.address)
                            &&
                            <div className="invalid-feedback">
                                {formik.errors.address}
                            </div>
                        }

                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col offset-3">
                        <button
                            onClick={handleSubmit}
                            className="addressPage__desk-btn"
                            type="submit"
                        >
                            Giao đến địa chỉ này
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default AddressDesk;