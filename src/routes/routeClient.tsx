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
import Wishlist from "../view/pages/client/Wishlist";
import CommentSelled from "../view/pages/client/CommentSelled";
import Address from "../view/pages/client/Address";
import OrderSuccess from "../view/pages/client/OrderSuccess";
import About from "../view/pages/client/About";
import FollowOrder from "../view/pages/client/FollowOrder";

interface Route {
    path: string,
    component: ComponentState
}

const routeClient: Route[] = [
    {path: "", component: <Home/>},
    {path: "/gioi-thieu-ve-tiki", component: <About/>},
    {path:  "/account" , component: <Account />},
    {path: "/order/history", component: <OrderManage/>},
    {path: "/order/tracking/:id", component: <FollowOrder/>},
    {path: "/order/history/:id", component: <OrderDetail/>},
    {path: "/account/edit", component: <EditAccount/>},
    {path: "/customer/wishlist", component: <Wishlist/>},
    {path: "/checkout/payment/success", component: <OrderSuccess/>},
    {path: "/checkout/payment", component: <Payment/>},
    {path: "/customer/nhan-xet-san-pham-da-mua", component: <CommentSelled/>},
    {path: "/checkout/cart", component: <Cart />},
    {path: "/products/:slug", component: <ProductDetail/>},
    {path: "/checkout/shipping", component: <Address/>},
    {path: "/:category", component: <Shop/>},
    {path: "/search", component: <Shop/>},
    
]

export default routeClient;