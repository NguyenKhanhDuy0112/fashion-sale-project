import { ComponentState } from "react";
import Cart from "../view/pages/client/Cart";
import Home from "../view/pages/client/Home";
import Payment from "../view/pages/client/Payment";
import ProductDetail from "../view/pages/client/ProductDetail";
import Shop from "../view/pages/client/Shop";
import Account from "../view/pages/client/Account";
import EditAccount from "../view/pages/client/EditAccount";
import OrderManage from "../view/pages/client/OrderManage";
import OrderDetail from "../view/pages/client/OrderDetail";

interface Route {
    path: string,
    component: ComponentState
}

const routeClient: Route[] = [
    {path: "", component: <Home/>},
    {path:  "/account" , component: <Account />},
    {path: "/order/history", component: <OrderManage/>},
    {path: "/order/history/:id", component: <OrderDetail/>},
    {path: "/account/edit", component: <EditAccount/>},
    {path: "/checkout/payment", component: <Payment/>},
    {path: "/checkout/cart", component: <Cart />},
    {path: "/products/:slug", component: <ProductDetail/>},
    {path: "/:category", component: <Shop/>},
   
]

export default routeClient;