import Breadcrumb from "../../../../shared/components/Breadcrumb";
import ShopProduct from "./ShopProduct";
import ShopSidebar from "./ShopSidebar";

function Shop() {
    return (
        <section className="shop">
            <div className="container-client">
                <Breadcrumb />
            </div>
            <div className="row">
                <div className="col-4">
                    <ShopSidebar/>
                </div>
                <div className="col">
                    <ShopProduct/>
                </div>
            </div>
        </section>
    );
}

export default Shop;