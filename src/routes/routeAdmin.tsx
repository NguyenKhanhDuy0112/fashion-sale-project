import { ComponentState } from "react"
import CategoryAdmin from "../view/pages/admin/CategoryAdmin"
import CouponAdmin from "../view/pages/admin/CouponAdmin"
import CustomerAdmin from "../view/pages/admin/CustomerAdmin"
import DashboardAdmin from "../view/pages/admin/DashboardAdmin"
import ImportAdmin from "../view/pages/admin/ImportAdmin"
import OrderAdDetail from "../view/pages/admin/OrderAdDetail"
import OrderAdmin from "../view/pages/admin/OrderAdmin"
import ProductAdDetail from "../view/pages/admin/ProductAdDetail"
import ProductAdmin from "../view/pages/admin/ProductAdmin"
import ProviderAdmin from "../view/pages/admin/ProviderAdmin"
import SellAdmin from "../view/pages/admin/SellAdmin"
import SettingAdmin from "../view/pages/admin/SettingAdmin"
import StatisticalAdmin from "../view/pages/admin/Statistical"

interface Route {
    path: string,
    component: ComponentState
}

const routeAdmin:Route[] = [
    {path: "/dashboard", component: <DashboardAdmin/>},
    {path: "categories", component: <CategoryAdmin/>},
    {path: "/products", component: <ProductAdmin/>},
    {path: "/products/:slug", component: <ProductAdDetail/>},
    {path: "/orders/create-order", component: <SellAdmin/>},
    {path: "/orders", component: <OrderAdmin/>},
    {path: "/imports", component: <ImportAdmin/>},
    {path: "/coupons", component: <CouponAdmin/>},
    {path: "/setting", component: <SettingAdmin/>},
    {path: "/customers", component: <CustomerAdmin />},
    {path: "/providers", component: <ProviderAdmin/>},
    {path: "/statistical", component: <StatisticalAdmin/>},
    {path: "/orders/:id", component: <OrderAdDetail/>}
]

export default routeAdmin