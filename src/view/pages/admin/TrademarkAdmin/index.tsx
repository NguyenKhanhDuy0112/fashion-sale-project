import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import trademarksService from "../../../../services/trademarksService"
import InputSearch from "../../../../shared/components/InputSearch"
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx"
import { Pagination, Trademark } from "../../../../shared/interfaces"
import TrademarkAdModal from "./TrademarkAdModal"
import TrademarkTable from "./TrademarkTable"

function TrademarkAdmin() {
    const [trademarks, setTrademarks] = useState<Trademark[]>([])
    const [trademark, setTrademark] = useState<Trademark>()
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [pagination, setPagination] = useState<Pagination>()

    useEffect(() => {
        handleLoadData(1)
    }, [])

    const handleLoadData = (page: number) => {
        trademarksService.listPagination(page, 8).then(res => {
            const { data, ...others } = res
            setTrademarks(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            const findTrademark = await trademarksService.findById(id)
        
            console.log("Trademark: ", findTrademark)
            setTrademark(findTrademark.data)
        }
        else {
            setTrademark({ _id: '', image: '', name: '' })
        }
        setShowModal(true)
    }

    const handleModalDeleteShow = (id: string) => {
        setTrademark({ _id: id, image: '', name: '' })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    
    const handleSearchTrademark = (value: string, page: number) => {

    }
    
    return ( 
        <article>
            <h5 className="title-admin mb-0">
                Thương hiệu
            </h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchTrademark(value, 1) }/>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button 
                            className="btn text-center btn-add" 
                            onClick={() => handleModalShow('')}
                        >
                            <span className="me-1">
                                <AiOutlinePlus />
                            </span>
                            Thêm thương hiệu
                        </button>
                    </div>
                </div>
            </div>


            <TrademarkTable
                loading={isLoading}
                onEditTrademark={(id) => handleModalShow(id)}
                onDeleteTrademark={(id) => handleModalDeleteShow(id)}
                data={trademarks}
            />

            <TrademarkAdModal
                onLoadData={() => handleLoadData(1)}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                trademark={trademark}
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

export default TrademarkAdmin;