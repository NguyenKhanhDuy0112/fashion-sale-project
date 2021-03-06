import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import billsService from "../../../../services/billsService";
import InputSearch from "../../../../shared/components/InputSearch";
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx";
import { Bill, Pagination } from "../../../../shared/interfaces";
import OrderAdTable from "./OrderAdTable";

function OrderAdmin() {
    const [orders, setOrders] = useState<Bill[]>([])
    const [pagination, setPagination] = useState<Pagination>()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        handleLoadData(1)
    }, [])

    const handleLoadData = async (page: number) => {
        billsService.listPaginationExports(page, 8).then(res => {
            const { data, ...others } = res
            setOrders(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    console.log("Orders: ", orders)

    
    const handleSearchOrders = (value: string, page: number) => {

    }

    return (
        <article>
            <h5 className="title-admin mb-0" >Danh sách đặt hàng</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-4 col-md-3 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchOrders(value, 1)}/>
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Từ ngày" className="form-control inputSearch" />
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Đến ngày" className="form-control inputSearch" />
                    </div>
                    <div className="col-md-2">
                        <button onClick={() => navigate('/admin/orders/create-order?type=export')} className="btn text-center btn-add">
                            <span className="me-1"><AiOutlinePlus /></span>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>

            <OrderAdTable
                data={orders}
                loading = {isLoading}
                onLoadData = {() => handleLoadData(1)}
            />

            {pagination &&
                <PagninationAdmin
                    totalPages={pagination?.totalPages}
                    hasNextPage={pagination?.hasNextPage}
                    hasPrevPage={pagination?.hasPrevPage}
                    nextPage={pagination?.nextPage}
                    prevPage={pagination?.prevPage}
                    pageIndex={pagination?.page}
                    gotoPage={(page) => {
                        setIsLoading(true)
                        handleLoadData(page)
                    }}
                />
            }

        </article>
    );
}

export default OrderAdmin;