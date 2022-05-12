import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import productsService from "../../../../services/productService"
import InputSearch from "../../../../shared/components/InputSearch"
import { Product, ProductDetail } from "../../../../shared/interfaces"
import initialProduct from "./initialProduct"
import ProductAdModal from "./ProductAdModal"
import ProductAdTable from "./ProductAdTable";

function ProductAdmin() {
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>(initialProduct)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

    useEffect(() => {
        handleLoadData()
    }, [])

    const handleLoadData = async () => {
        const data = await productsService.list()
        setProducts(data)
    }

    const handleModalShow = async (id: string) => {
    
        if (id) {
            const findProduct = await productsService.findById(id)
            const proData:any = findProduct
            let color = ''
            const detail:ProductDetail[] = []
            proData.productDetails.forEach((item: any) => {
                if(color.toLowerCase() !== item.color.color.toLowerCase()){
                    const images = [{dataURL:item.images[0].image}]
                    item.images[0].imagesSub.forEach((item:any) => {
                        images.push({dataURL: item})
                    })
                    color = item.color.color
                    detail.push({...item, color: item.color.color, size: [item.size.size], images})
                }
                else{
                    const tempProduct = detail[detail.length - 1]
                    tempProduct.size.push(item.size.size)
                    detail.splice(detail.length - 1, 1, tempProduct)
                }
                
            });
            
            proData.productDetails = detail
            setProduct(proData)
        }
        else {
            setProduct({
                _id: '', 
                description: '', 
                material: '', 
                name: '', 
                price: undefined,
                category: undefined,
                origin: '', 
                productDetails: [{_id: '', color: '', size: '', images: []}], 
                unit: ''
            })
        }
        setShowModal(true)
    }


    const handleModalDeleteShow = (id: string) => {
        setProduct({
            ...initialProduct,
            _id: id
        })
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
                        <InputSearch />
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
                onEditProduct={(id) => handleModalShow(id)}
                onDeleteProduct={(id) => handleModalDeleteShow(id)}
                data={products}
            />

            <ProductAdModal
                onLoadData={handleLoadData}
                show={showModal}
                handleClose={handleModalClose}
                showModalDelete={showModalDelete}
                onModalDelete={handleModalDeleteClose}
                product={product}
            />
        </article>
    );
}

export default ProductAdmin;