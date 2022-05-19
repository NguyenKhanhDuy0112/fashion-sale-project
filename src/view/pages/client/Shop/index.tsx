import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderClientMobile from "../../../../layout/client/HeaderClient/HeaderClientMobile";
import Breadcrumb from "../../../../shared/components/Breadcrumb";
import ShopMain from "./ShopMain";
import ShopSidebar from "./ShopSidebar";

function Shop() {
    return (
        <>
            <div className="d-xl-none d-block">
                <HeaderClientMobile />
            </div>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <section className="shop bg-outside-client mt-2 pb-3">
                <div className="container-client">
                    <Breadcrumb />
                </div>
                <div className="container-client none">
                    <div className="bg-white border-radius-4 d-flex">
                        <ShopSidebar />
                        <ShopMain />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;