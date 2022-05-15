
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import HeaderAdmin from "../../layout/admin/HeaderAdmin";
import NavAdmin from "../../layout/admin/NavAdmin";
import { toggleNav } from "../../modules/toggleNav/toggleNavSlice";
import routeAdmin from "../../routes/routeAdmin";
import useToggleNav from "../../shared/hooks/useToggleNav";
import ToastCustom from "../../shared/components/ToastCustom";
import useToast from "../../shared/hooks/useToast";

function Admin() {
    const isToggleNav = useToggleNav()
    const toast = useToast()
    const dispatch = useDispatch()

    return (
        <>
            <div onClick={() => dispatch(toggleNav(!isToggleNav))} className={`overlay ${isToggleNav ? 'active' : ''}`}></div>
            <div className="admin">
                <HeaderAdmin />
                <NavAdmin />
                <section className={`container-admin admin__body ${isToggleNav ? 'active' : ''}`}>
                    <Routes>
                        {routeAdmin.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
                    </Routes>
                </section>
            </div>

            <ToastCustom show = {toast.show} text={toast.text} type={toast.type}/>
        </>
    );
}

export default Admin;