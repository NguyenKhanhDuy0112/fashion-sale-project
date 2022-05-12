import { Route, Routes } from "react-router";
import FooterClient from "../../layout/client/FooterClient";
import HeaderClient from "../../layout/client/HeaderClient";
import NavClient from "../../layout/client/NavClient";
import routeClient from "../../routes/routeClient";

function Client() { 



    return ( 
        <>
            <HeaderClient/>
            <div className="client__body py-3">
                <Routes>
                   {routeClient.map((route,index) =>  <Route key = {index} path={route.path} element = {route.component}/>)}
                </Routes>
            </div>
            <NavClient/>
            <FooterClient/>
        </>
     );
}

export default Client;