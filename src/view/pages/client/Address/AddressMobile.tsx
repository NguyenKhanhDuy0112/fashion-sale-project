import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
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

function AddressMobile() {
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

    return (
        <>
            <section className="addressPage__mobile">
                
            </section>
        </>
    );
}

export default AddressMobile;