import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import billsService from "../../../../services/billsService";
import InputSearch from "../../../../shared/components/InputSearch";
import { Bill } from "../../../../shared/interfaces";
import OrderAdTable from "./OrderAdTable";

function OrderAdmin() {
    const [orders, setOrders] = useState<Bill[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        handleLoadData()
    }, [])

    const handleLoadData = async () => {
        const data = await billsService.findBillExports()
        setOrders(data)
    }


    return (
        <article>
            <h5 className="title-admin mb-0" >Danh sách đặt hàng</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-4 col-md-3 col-12">
                        <InputSearch />
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Từ ngày" className="form-control inputSearch" />
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Đến ngày" className="form-control inputSearch" />
                    </div>
                    <div className="col-md-2">
                        <button onClick = {() => navigate('/admin/orders/create-order')} className="btn text-center btn-add">
                            <span className="me-1"><AiOutlinePlus /></span>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
            <OrderAdTable
                data={orders}
            />

        </article>
    );
}

export default OrderAdmin;