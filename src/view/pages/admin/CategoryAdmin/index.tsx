import { useEffect, useState } from "react";
import CategoryAdTable from "./CategoryAdTable";
import { AiOutlinePlus } from "react-icons/ai";
import InputSearch from "../../../../shared/components/InputSearch";
import CategoryAdModal from "./CategoryAdModal";
import { Category } from "../../../../shared/interfaces";
import categoriesService from "../../../../services/categoriesService";

function CategoryAdmin() {
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

    useEffect(() => {
        handleLoadData()
    }, [])

    const handleLoadData = async () => {
        const data = await categoriesService.list()
        setCategories(data)
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

    const handleModalDeleteShow = (id:string) => {
        setCategory({_id: id, image: '', name: ''})
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    return (
        <article>
            <h5 className="title-admin mb-0" >Danh mục</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch />
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Thêm danh mục
                        </button>
                    </div>
                </div>
            </div>

            <CategoryAdTable
                onEditCategory={(id) => handleModalShow(id)}
                onDeleteCategory = {(id) => handleModalDeleteShow(id)}
                data={categories}
            />

            <CategoryAdModal
                onLoadData={handleLoadData}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete = {showModalDelete}
                onModalDelete = {handleModalDeleteClose}
                category={category}
            />
        </article>
    );
}

export default CategoryAdmin;