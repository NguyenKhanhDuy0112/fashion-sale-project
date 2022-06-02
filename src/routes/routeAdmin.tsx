import { ComponentState } from "react"
import CategoryAdmin from "../view/pages/admin/CategoryAdmin"
import CouponAdmin from "../view/pages/admin/CouponAdmin"
import CustomerAdmin from "../view/pages/admin/CustomerAdmin"
import DashboardAdmin from "../view/pages/admin/DashboardAdmin"
import ImportAdmin from "../view/pages/admin/ImportAdmin"
import Invoice from "../view/pages/admin/Invoice"
import OrderAdDetail from "../view/pages/admin/OrderAdDetail"
import OrderAdmin from "../view/pages/admin/OrderAdmin"
import ProductAdDetail from "../view/pages/admin/ProductAdDetail"
import ProductAdmin from "../view/pages/admin/ProductAdmin"
import ProviderAdmin from "../view/pages/admin/ProviderAdmin"
import SellAdmin from "../view/pages/admin/SellAdmin"
import SettingAdmin from "../view/pages/admin/SettingAdmin"
import StatisticalAdmin from "../view/pages/admin/Statistical"
import TrademarkAdmin from "../view/pages/admin/TrademarkAdmin"

interface Route {
    path: string,
    component: ComponentState
}

const routeAdmin: Route[] = [
    { path: "/dashboard", component: <DashboardAdmin /> },
    { path: "categories", component: <CategoryAdmin /> },
    { path: "/products", component: <ProductAdmin /> },
    { path: "/products/:slug", component: <ProductAdDetail /> },
    { path: "/orders/create-order", component: <SellAdmin /> },
    { path: "/imports/create-import", component: <SellAdmin /> },
    { path: "/orders", component: <OrderAdmin /> },
    { path: "/trademarks", component: <TrademarkAdmin /> },
    { path: "/imports", component: <ImportAdmin /> },
    { path: "/imports/:id", component: <OrderAdDetail /> },
    { path: "/coupons", component: <CouponAdmin /> },
    { path: "/setting", component: <SettingAdmin /> },
    { path: "/customers", component: <CustomerAdmin /> },
    { path: "/providers", component: <ProviderAdmin /> },
    { path: "/statistical", component: <StatisticalAdmin /> },
    { path: "/orders/:id", component: <OrderAdDetail /> },
    {path: "/invoice", component: <Invoice/>},
]

export default routeAdmin