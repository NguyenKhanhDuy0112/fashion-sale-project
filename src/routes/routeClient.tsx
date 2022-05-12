import { ComponentState } from "react";
import Home from "../view/pages/client/Home";
import Shop from "../view/pages/client/Shop";

interface Route {
    path: string,
    component: ComponentState
}

const routeClient: Route[] = [
    {path: "", component: <Home/>},
    {path: "/:category", component: <Shop/>}
]

export default routeClient;