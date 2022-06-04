import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ModalCustom from "../../../shared/components/ModalCustom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleFormLogin } from "../../../modules/loginForm/loginFormSlice";
import useShowLogin from "../../../shared/hooks/useShowLogin";



function HeaderClientAuth() {
   
    const dispatch = useDispatch()
    const handleShowFormLogin = () => {
       
        dispatch(toggleFormLogin())
    }

    return (
        <>
            <div className="headerClient__account">
                <img className="headerClient__account-img" src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" alt="" />
                <p onClick={handleShowFormLogin} className="headerClient__account-content mb-0 ms-2">
                    <small className="headerClient__account-content-action">Đăng nhập / Đăng ký</small>
                    <span className="headerClient__account-content-text">Tài khoản <IoMdArrowDropdown /></span>
                </p>
            </div>
            
        </>
    );
}

export default HeaderClientAuth;