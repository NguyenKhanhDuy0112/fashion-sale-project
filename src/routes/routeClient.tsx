import { ComponentState } from "react";
import Cart from "../view/pages/client/Cart";
import Home from "../view/pages/client/Home";
import Payment from "../view/pages/client/Payment";
import ProductDetail from "../view/pages/client/ProductDetail";
import Shop from "../view/pages/client/Shop";

interface Route {
    path: string,
    component: ComponentState
}

const routeClient: Route[] = [
    {path: "", component: <Home/>},
    {path: "/checkout/payment", component: <Payment/>},
    {path: "/checkout/cart", component: <Cart />},
    {path: "/products/:slug", component: <ProductDetail/>},
    {path: "/:category", component: <Shop/>},
   
]

export default routeClient;