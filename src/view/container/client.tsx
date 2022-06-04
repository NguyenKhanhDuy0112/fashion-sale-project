import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Login from "../../layout/client/Login";
import routeClient from "../../routes/routeClient";
import Snackbar from "../../shared/components/Snackbar";
import ToastCustom from "../../shared/components/ToastCustom";
import useSnackbar from "../../shared/hooks/useSnackbar";
import useToast from "../../shared/hooks/useToast";

function Client() {
    const location = useLocation()
    const snackbar = useSnackbar()
    const toast = useToast()

    useEffect(() => {
        window.scrollTo(0,0)
    },[location.pathname])

    return (
        <>
            <Routes>
                {routeClient.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
            </Routes>
            <Login/>
            <Snackbar show = {snackbar.show} text = {snackbar.text} />
            <ToastCustom show = {toast.show} text={toast.text} type={toast.type}/>
        </>
    );
}

export default Client;