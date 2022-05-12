import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import categoriesService from "../../../../services/categoriesService";
import InputSearch from "../../../../shared/components/InputSearch";
import { Category } from "../../../../shared/interfaces";
import CategoryAdTable from "../CategoryAdmin/CategoryAdTable";
import CouponAdModal from "./CouponAdModal";
import CouponAdTable from "./CouponAdTable";


function CouponAdmin() {
    const [coupons, setCoupons] = useState<Category[]>([])
    const [coupon, setCoupon] = useState<Category>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

    useEffect(() => {
        handleLoadData()
    }, [])

    const handleLoadData = async () => {
        const data = await categoriesService.list()
        setCoupons(data)
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            const findCategory = await categoriesService.findById(id)
            setCoupon(findCategory)
        }
        else {
            setCoupon({ _id: '', image: '', name: '' })
        }
        setShowModal(true)
    }

    const handleModalDeleteShow = (id:string) => {
        setCoupon({_id: id, image: '', name: ''})
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)
    return ( 
        <article>
            <h5 className="title-admin mb-0" >Mã giảm giá</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch />
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Thêm mã giảm giả
                        </button>
                    </div>
                </div>
            </div>

            <CouponAdTable
                onEditCoupon={(id) => handleModalShow(id)}
                onDeleteCoupon = {(id) => handleModalDeleteShow(id)}
                data={coupons}
            />

            <CouponAdModal
                onLoadData={handleLoadData}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete = {showModalDelete}
                onModalDelete = {handleModalDeleteClose}
                coupon={coupon}
            />
        </article>
     );
}

export default CouponAdmin;