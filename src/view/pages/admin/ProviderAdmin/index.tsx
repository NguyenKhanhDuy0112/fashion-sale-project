import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice"
import usersService from "../../../../services/usersService"
import InputSearch from "../../../../shared/components/InputSearch"
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx"
import { Pagination, User } from "../../../../shared/interfaces"
import ProviderAdModal from "./ProviderAdModal"
import ProviderAdTable from "./ProviderAdTable"

function ProviderAdmin() {
    const [providers, setProviders] = useState<User[]>([])
    const [provider, setProvider] = useState<User>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState<Pagination>()
    const dispatch = useDispatch()
    

    useEffect(() => {
        handleLoadData(1)
    }, [])

    const handleLoadData = (page: number) => {
        usersService.listPaginationProviders(page, 8).then(res => {
            const { data, ...others } = res
            setProviders(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            dispatch(showLoading())
            const findCustomer = await usersService.findById(id)
            dispatch(hideLoading())
            setProvider(findCustomer)
            setShowModal(true)
        }
        else {
            setProvider({ _id: '', name: '', id:'',password: '', phone: '', avatar: '', address: '', email: '' })
            setShowModal(true)
        }
        
    }

    const handleModalDeleteShow = (id: string) => {
        setProvider({ name: '', password: '', phone: '', avatar: '', address: '', email: '', _id: id })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    const handleSearchProviders = async (value: string, page: number) => {
        setIsLoading(true)
        usersService.searchProviders(value, page, 8)
            .then(res => {
                const { data, ...others } = res
                setProviders(data)
                setPagination({ ...others })
                setIsLoading(false)
            })
    }



    return (
        <article>
            <h5 className="title-admin mb-0" >Nhà cung cấp</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchProviders(value, 1)} />
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Thêm nhà cung cấp
                        </button>
                    </div>
                </div>
            </div>

            <ProviderAdTable
                isLoading={isLoading}
                onEditUser={(id) => handleModalShow(id)}
                onDeleteUser={(id) => handleModalDeleteShow(id)}
                data={providers}
            />

            <ProviderAdModal
                onLoadData={() => {
                    setIsLoading(true)
                    handleLoadData(1)
                }}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                user={provider}
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

export default ProviderAdmin;