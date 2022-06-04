import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";
import couponsService from "../../../../services/couponsService";
import InputSearch from "../../../../shared/components/InputSearch";
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx";
import { Coupon, Pagination } from "../../../../shared/interfaces";
import CouponAdModal from "./CouponAdModal";
import CouponAdTable from "./CouponAdTable";

function CouponAdmin() {
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [coupon, setCoupon] = useState<Coupon>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState<Pagination>()
    const dispatch = useDispatch()

    useEffect(() => {
        handleLoadData(1)
    }, [])

    const handleLoadData = async (page: number) => {
        couponsService.listPagination(page, 8).then(res => {
            const { data, ...others } = res
            setCoupons(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            dispatch(showLoading())
            const findCoupon = await couponsService.findById(id)
            dispatch(hideLoading())
            setCoupon(findCoupon)
            setShowModal(true)
        }
        else {
            setCoupon({ _id: '', code: '',dateEnd: '', dateStart:  '', discount: 0, isActive: false, minimumAmount: 0 })
            setShowModal(true)
        }
        
    }

    const handleModalDeleteShow = (id: string) => {
        setCoupon({ _id: '', code: '',dateEnd: '', dateStart:  '', discount: 0, isActive: false, minimumAmount: 0 })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    
    const handleSearchCoupon = (value: string, page: number) => {

    }

    return (
        <article>
            <h5 className="title-admin mb-0" >Mã giảm giá</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchCoupon(value, 1)}/>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Thêm mã giảm giá
                        </button>
                    </div>
                </div>
            </div>

            <CouponAdTable
                onEditCoupon={(id) => handleModalShow(id)}
                onDeleteCoupon={(id) => handleModalDeleteShow(id)}
                data={coupons}
                loading={isLoading}

            />

            <CouponAdModal
                onLoadData={() => handleLoadData(1)}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                coupon={coupon}
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

export default CouponAdmin;