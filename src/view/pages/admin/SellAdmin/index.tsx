import PaneCustom from "../../../../shared/components/PaneCustom";
import TabCustom from "../../../../shared/components/TabCustom";
import useOrders from "../../../../shared/hooks/useOrders";
import SellAdminCheckout from "./SellAdminCheckout"
import SellAdminTable from "./SellAdminTable";

function SellAdmin() {
    const orders = useOrders()

    return (
        <>
            <h5 className="title-admin mb-0">Đặt hàng</h5>
            <div className="sellAdmin__header">
                <div className="row align-items-center p-2 g-3 g-lg-1">
                    <div className="col-lg-4">
                        <div className="position-relative">
                            <input
                                className="sellAdmin__header-search"
                                placeholder="Tìm kiếm sản phẩm..."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TabCustom>
                {orders.map(order => (
                    <PaneCustom key={order.id} title={order.title ? order.title : ''}>
                        <div className="bg-white">
                            <div className="row">
                                <div className="col-8">
                                    <SellAdminTable data={order.products} />
                                </div>
                                <div className="col">
                                    <SellAdminCheckout />
                                </div>
                            </div>
                        </div>
                    </PaneCustom>
                ))}
            </TabCustom>

        </>
    );
}

export default SellAdmin;