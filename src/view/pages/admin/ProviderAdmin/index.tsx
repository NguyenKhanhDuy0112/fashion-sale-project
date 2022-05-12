import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import usersService from "../../../../services/usersService"
import InputSearch from "../../../../shared/components/InputSearch"
import { User } from "../../../../shared/interfaces"
import ProviderAdModal from "./ProviderAdModal"
import ProviderAdTable from "./ProviderAdTable"

function ProviderAdmin() {
    const [providers, setProviders] = useState<User[]>([])
    const [provider, setProvider] = useState<User>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

    useEffect(() => {
        handleLoadData()
    }, [])

    const handleLoadData = async () => {
        const data = await usersService.findProviders()
        setProviders(data)
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            const findCustomer = await usersService.findById(id)
            setProvider(findCustomer)
        }
        else {
            setProvider({ _id: '', name: '', password: '', phone: '', avatar: '', address: '', email: '' })
        }
        setShowModal(true)
    }


    const handleModalDeleteShow = (id: string) => {
        setProvider({ name: '', password: '', phone: '', avatar: '', address: '', email: '', _id: id })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    return (
        <article>
            <h5 className="title-admin mb-0" >Nhà cung cấp</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch />
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
                onEditUser={(id) => handleModalShow(id)}
                onDeleteUser={(id) => handleModalDeleteShow(id)}
                data={providers}
            />

            <ProviderAdModal
                onLoadData={handleLoadData}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                user={provider}
            />
        </article>
    );
}

export default ProviderAdmin;