import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import productsService from "../../../../services/productService";
import ProductItem from "../../../../shared/components/ProductItem";
import { Pagination, Product, ProductDetail } from "../../../../shared/interfaces";

function HomeProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPagination] = useState<Pagination>()
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const list = useRef<any>(null)
    const [scroll, setScroll] = useState<number>(0)
    const [sizeWidth, setSizeWidth] = useState<number>(0)

    useEffect(() => {
        setSizeWidth(window.innerWidth)
    },[])

    useEffect(() => {
        handleLoadProducts()
    }, [])

    useEffect(() => {
        const handleResize: EventListener = (e: Event) => {
            const window = e.currentTarget as Window
            setSizeWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [sizeWidth])

    useEffect(() => {
        const handleScroll: EventListener = (e: Event) => {
            if ((sizeWidth < 1200 || window.innerWidth < 1200) ) {
                const window = e.currentTarget as Window
                if (window.scrollY + window.innerHeight >= list.current.clientHeight + list.current.offsetTop) {
                    setLoadingMore(true);
                    handleLoadMoreProduct(pagination ? pagination.nextPage : 1)
                }
                setScroll(window.scrollY)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scroll, sizeWidth])

    const handleLoadProducts = async () => {
        try {
            const products = await productsService.listPagination(1, (sizeWidth >= 1200 || window.innerWidth >= 1200) ? 30 : 10)
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

            const productsMore = await productsService.listPagination(page, (sizeWidth >= 1200 || window.innerWidth >= 1200)  ? 30 : 10)
            if (productsMore) {
                const { data, ...others } = productsMore
                const newProducts: Product[] = handleConvertProducts(data)
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
        <article className="container-client none">
            <div className="bg-white">
                <div ref={list} className="row row-cols-xl-6 row-cols-lg-5 row-cols-2 g-0 mb-xl-0 mb-5">
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
                    {
                        loadingMore &&
                        <div className="d-xl-none d-flex justify-content-center w-100">
                            <Spinner animation="border" variant="info" />
                        </div>
                    }
                </div>
                {pagination &&
                    <div className="d-xl-flex d-none justify-content-center py-3">
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
        </article>
    );
}

export default HomeProduct;