import { useEffect, useState } from "react";
import CategoryAdTable from "./CategoryAdTable";
import { AiOutlinePlus } from "react-icons/ai";
import InputSearch from "../../../../shared/components/InputSearch";
import CategoryAdModal from "./CategoryAdModal";
import { Category, Pagination } from "../../../../shared/interfaces";
import categoriesService from "../../../../services/categoriesService";
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx";

function CategoryAdmin() {
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>()
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [pagination, setPagination] = useState<Pagination>()

    useEffect(() => {
        handleLoadData(1)
    }, [])

    const handleLoadData = (page: number) => {
        categoriesService.listPagination(page, 8).then(res => {
            const { data, ...others } = res
            setCategories(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    const handleModalShow = async (id: string) => {
        if (id) {
            const findCategory = await categoriesService.findById(id)
            setCategory(findCategory)
        }
        else {
            setCategory({ _id: '', image: '', name: '' })
        }
        setShowModal(true)
    }

    const handleModalDeleteShow = (id: string) => {
        setCategory({ _id: id, image: '', name: '' })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    const handleSearchCategory = async (value:string, page: number) => {
        setIsLoading(true)
        categoriesService.search(value, page, 8)
                    .then(res => {
                        const { data, ...others } = res
                        setCategories(data)
                        setPagination({...others})
                        setIsLoading(false)
                    })
    }
    return (
        <article>
            <h5 className="title-admin mb-0">
                Danh mục
            </h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch onChangeValue={(value) => handleSearchCategory(value, 1)} valueInput = ""/>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button 
                            className="btn text-center btn-add" 
                            onClick={() => handleModalShow('')}
                        >
                            <span className="me-1">
                                <AiOutlinePlus />
                            </span>
                            Thêm danh mục
                        </button>
                    </div>
                </div>
            </div>


            <CategoryAdTable
                loading={isLoading}
                onEditCategory={(id) => handleModalShow(id)}
                onDeleteCategory={(id) => handleModalDeleteShow(id)}
                data={categories}
            />

            <CategoryAdModal
                onLoadData={() => handleLoadData(1)}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                category={category}
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

export default CategoryAdmin;