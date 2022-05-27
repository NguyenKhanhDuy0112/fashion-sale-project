import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
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
            const findCustomer = await usersService.findById(id)
            setCustomer(findCustomer)
        }
        else {
            setCustomer({ _id: '', name: '', password: '', phone: '', avatar: '', address: '', email: '' })
        }
        setShowModal(true)
    }


    const handleModalDeleteShow = (id: string) => {
        setCustomer({ name: '', password: '', phone: '', avatar: '', address: '', email: '', _id: id })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    
    const handleSearhCustomer = (value: string, page: number) => {

    }

    return (
        <article>
            <h5 className="title-admin mb-0" >Khách hàng</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) =>handleSearhCustomer(value, 1)}/>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Thêm khách hàng
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