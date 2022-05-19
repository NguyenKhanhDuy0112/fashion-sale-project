import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import FooterClient from "../../layout/client/FooterClient";
import NavClient from "../../layout/client/NavClient";
import routeClient from "../../routes/routeClient";

function Client() {

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    },[location.pathname])

    return (
        <>
            <Routes>
                {routeClient.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
            </Routes>
            <NavClient />
            <FooterClient />
        </>
    );
}

export default Client;