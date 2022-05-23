import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import routeClient from "../../routes/routeClient";
import Snackbar from "../../shared/components/Snackbar";
import useSnackbar from "../../shared/hooks/useSnackbar";

function Client() {
    const location = useLocation()
    const snackbar = useSnackbar()

    useEffect(() => {
        window.scrollTo(0,0)
    },[location.pathname])

    return (
        <>
            <Routes>
                {routeClient.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
            </Routes>
            <Snackbar show = {snackbar.show} text = {snackbar.text} />
        </>
    );
}

export default Client;