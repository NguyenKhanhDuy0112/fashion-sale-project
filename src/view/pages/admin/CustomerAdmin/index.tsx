import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import usersService from "../../../../services/usersService"
import InputSearch from "../../../../shared/components/InputSearch"
import { User } from "../../../../shared/interfaces"
import CustomerAdModal from "./CustomerAdModal"
import CustomerAdTable from "./CustomerAdTable"

function CustomerAdmin() {
    const [customers, setCustomers] = useState<User[]>([])
    const [customer, setCustomer] = useState<User>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

    useEffect(() => {
        handleLoadData()
    }, [])

    const handleLoadData = async () => {
        const data = await usersService.findCustomers()
        setCustomers(data)
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            const findCustomer = await usersService.findById(id)
            setCustomer(findCustomer)
        }
        else {
            setCustomer({_id: '',name: '',password: '', phone: '',avatar: '', address: '', email: ''})
        }
        setShowModal(true)
    }


    const handleModalDeleteShow = (id:string) => {
        setCustomer({name: '',password: '', phone: '',avatar: '', address: '', email: '', _id: id})
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    return ( 
        <article>
            <h5 className="title-admin mb-0" >Khách hàng</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch />
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
                onEditUser={(id) => handleModalShow(id)}
                onDeleteUser = {(id) => handleModalDeleteShow(id)}
                data={customers}
            />

            <CustomerAdModal
                onLoadData={handleLoadData}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete = {showModalDelete}
                onModalDelete = {handleModalDeleteClose}
                user={customer}
            />
        </article>
     );
}

export default CustomerAdmin;