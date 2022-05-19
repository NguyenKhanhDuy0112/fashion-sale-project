import { ComponentState } from "react";
import Home from "../view/pages/client/Home";
import ProductDetail from "../view/pages/client/ProductDetail";
import Shop from "../view/pages/client/Shop";

interface Route {
    path: string,
    component: ComponentState
}

const routeClient: Route[] = [
    {path: "", component: <Home/>},
    {path: "/products/:slug", component: <ProductDetail/>},
    {path: "/:category", component: <Shop/>},
    
]

export default routeClient;