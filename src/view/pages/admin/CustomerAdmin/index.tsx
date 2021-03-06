import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice"
import usersService from "../../../../services/usersService"
import InputSearch from "../../../../shared/components/InputSearch"
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx"
import { Pagination, User } from "../../../../shared/interfaces"
import CustomerAdModal from "./CustomerAdModal"
import CustomerAdTable from "./CustomerAdTable"

function CustomerAdmin() {
    const [customers, setCustomers] = useState<User[]>([])
    const [customer, setCustomer] = useState<User>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState<Pagination>()
    const dispatch = useDispatch()

    useEffect(() => {
        handleLoadData(1)
    }, [])


    const handleLoadData = (page: number) => {
        usersService.listPaginationCustomers(page, 8).then(res => {
            const { data, ...others } = res
            setCustomers(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            dispatch(showLoading())
            const findCustomer:User = await usersService.findById(id)
            dispatch(hideLoading())
            setCustomer(findCustomer)
            setShowModal(true)
        }
        else {
            setCustomer({ _id: '', name: '', password: '', phone: '', avatar: '', address: '', email: '' })
            setShowModal(true)
        }
       
    }


    const handleModalDeleteShow = (id: string) => {
        setCustomer({ name: '', password: '', phone: '', avatar: '', address: '', email: '', _id: id })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)



    const handleSearhCustomer = async (value: string, page: number) => {
        setIsLoading(true)
        usersService.searchCustomers(value, page, 8)
            .then(res => {
                const { data, ...others } = res
                setCustomers(data)
                setPagination({ ...others })
                setIsLoading(false)
            })
    }

    return (
        <article>
            <h5 className="title-admin mb-0" >Kh??ch h??ng</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearhCustomer(value, 1)} />
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Th??m kh??ch h??ng
                        </button>
                    </div>
                </div>
            </div>

            <CustomerAdTable
                isLoading={isLoading}
                onEditUser={(id) => handleModalShow(id)}
                onDeleteUser={(id) => handleModalDeleteShow(id)}
                data={customers}
            />

            <CustomerAdModal
                onLoadData={() => {
                    setIsLoading(true)
                    handleLoadData(1)
                }}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                user={customer}
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

export default CustomerAdmin;