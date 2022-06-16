import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice"
import productsService from "../../../../services/productService"
import InputSearch from "../../../../shared/components/InputSearch"
import PagninationAdmin from "../../../../shared/components/PaginationAdmin.tsx"
import { Pagination, Product, ProductDetail } from "../../../../shared/interfaces"
import ProductAdModal from "./ProductAdModal"
import ProductAdTable from "./ProductAdTable";

function ProductAdmin() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState<Product>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [pagination, setPagination] = useState<Pagination>()
    const dispatch = useDispatch()

    useEffect(() => {
        handleLoadData(1)
    }, [])

    const handleSearchProduct = async (value:string, page: number) => {
        setIsLoading(true)
        productsService.search(value, page, 10)
                    .then(res => {
                        const { data, ...others } = res
                        setProducts(data)
                        setPagination({...others})
                        setIsLoading(false)
                    })
    }

    const handleLoadData = async (page: number) => {
        productsService.listPagination(page, 10).then(res => {
            const { data, ...others } = res
            setProducts(data)
            setPagination({ ...others })
            setIsLoading(false)
        })
    }

    const handleModalShow = (id: string) => {
        
        if (id !== '') {
            dispatch(showLoading())
            productsService.findById(id)
                .then(res => {
                    const proData: any = res
                    let color = ''
                    const detail: ProductDetail[] = []

                    proData.productDetails.forEach((item: any) => {
                        if (color.toLowerCase() !== item.color.color.toLowerCase()) {
                            const images: any = []
                            if (item.images.length > 0 && item.images[0].imagesSub) {
                                images.push({ dataURL: item.images[0].image })
                            }
                            if (item.images.length > 0 && item.images[0].imagesSub) {
                                item.images[0].imagesSub.forEach((item: string, index: number) => {
                                    images.push({ dataURL: item })
                                })
                            }
        
                            color = item.color.color
                            detail.push({ ...item, color: item.color.color, sizes: [item.size.size], images })
                        }
                        else {
                            const tempProduct = detail[detail.length - 1]
                            tempProduct.sizes.push(item.size.size)
                            detail.splice(detail.length - 1, 1, tempProduct)
                        }
                    });
        
                    proData.productDetails = detail
                    proData.trademark = res.trademark._id
                    setProduct(proData)
                    dispatch(hideLoading())
                    setShowModal(true)
                })
        }
        else {
            setProduct({
                _id: '',
                description: '',
                material: '',
                name: '',
                price: 0,
                category: undefined,
                trademark: undefined,
                origin: '',
                productDetails: [],
                unit: ''
            })
            setShowModal(true)
        }
        
    }


    const handleModalDeleteShow = (id: string) => {
        setProduct({ _id: id, description: '', material: '', name: '', origin: '', unit: '', productDetails: [] })
        setShowModalDelete(true)
    }

    const handleModalDeleteClose = () => setShowModalDelete(false)

    const handleModalClose = () => setShowModal(false)

    return (
        <article>
            
            <h5 className="title-admin mb-0">Sản phẩm</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row w-100 g-3">
                    <div className="col-xl-9 col-md-7 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchProduct(value, 1)}/>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <button className="btn text-center btn-add" onClick={() => handleModalShow('')}>
                            <span className="me-1"><AiOutlinePlus /></span>
                            Thêm sản phẩm
                        </button>
                    </div>
                </div>
            </div>

            <ProductAdTable
                isLoading={isLoading}
                onEditProduct={(id) => handleModalShow(id)}
                onDeleteProduct={(id) => handleModalDeleteShow(id)}
                data={products}
            />

            <ProductAdModal
                onLoadData={() => handleLoadData(1)}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                product={product}
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

export default ProductAdmin;