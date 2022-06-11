import { useEffect, useState } from "react";
import productsService from "../../../../services/productService";
import ProductItem from "../../../../shared/components/ProductItem";
import { Pagination, Product, ProductDetail } from "../../../../shared/interfaces";

function ProductDetailMore() {
    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPagination] = useState<Pagination>()
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    useEffect(() => {
        handleLoadProducts()
    }, [])

    const handleLoadProducts = async () => {
        try {
            const products = await productsService.listPagination(1, 30)
            if (products) {
                const { data, ...others } = products
                const newProducts = handleConvertProducts(data)
                setProducts(newProducts)
                setPagination({ ...others })
                setLoading(false)
            }
        } catch (err) {
            console.log("Failed load products")
        }
    }

    const handleLoadMoreProduct = async (page: number) => {
        setLoadingMore(true)
        try {
            const productsMore = await productsService.listPagination(page, 30)
            if (productsMore) {
                const { data, ...others } = productsMore
                const newProducts:Product[] = handleConvertProducts(data)
                const newProductsData = [...products, ...newProducts]
                setProducts(newProductsData)

                setPagination({ ...others })
                setLoadingMore(false)
            }
        }
        catch (err) {
            console.log("Failed load more product")
        }
    }


    const handleConvertProducts = (products: Product[]) => {
        const newProducts: Product[] = products.map((pro: Product, index: number) => {
            const proDetails: ProductDetail[] = []
            let color = ''
            if (pro.productDetails && pro.productDetails.length > 0) {
                pro.productDetails.forEach((proDt: any) => {
                    if (color.toLowerCase() !== proDt.color.color.toLowerCase()) {
                        proDetails.push({ ...proDt, color: proDt.color.color, sizes: [proDt.size.size], images: [proDt.images[0].image, ...proDt.images[0].imagesSub] })
                        color = proDt.color.color
                    }
                    else {
                        const tempProDetail = proDetails[proDetails.length - 1]
                        tempProDetail.sizes.push(proDt.size.size)
                        proDetails.splice(proDetails.length - 1, 1, tempProDetail)
                    }
                })
            }

            return { ...pro, productDetails: proDetails }
        })

        return newProducts

    }

    return (
        <article className="productDetail__more mt-xl-3 mt-2">
            <div className="container-client none">
                <div className="bg-white border-radius-4 p-3 homeSuggest mb-xl-3 mb-2">
                    <h5 className="productDetail__title mb-0">Khám phá thêm</h5>
                </div>
                <div className="bg-white border-radius-4">
                <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-2 g-0">
                    {loading ?
                        Array.from({ length: 30 }).map((item: any, index: number) => (
                            <div className="col" key={index}>
                                <ProductItem loading={loading} />
                            </div>
                        ))
                        :
                        products.length > 0 &&
                        products.map((pro: Product, index: number) => (
                            <div className="col" key={index}>
                                <ProductItem loading={loading} product={pro} />
                            </div>
                        ))

                    }
                </div>
                {pagination &&
                    <div className="d-flex justify-content-center py-3">
                        <button
                            disabled={!pagination.hasNextPage}
                            onClick={() => handleLoadMoreProduct(pagination.nextPage)}
                            className="homeProduct-btn"
                        >
                            {loadingMore ? 'Đang tải...' : 'Xem thêm'}
                        </button>
                    </div>
                }
                </div>
            </div>
        </article>
    );
}

export default ProductDetailMore;