import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderClientMobile from "../../../../layout/client/HeaderClient/HeaderClientMobile";
import categoriesService from "../../../../services/categoriesService";
import { Category, Product, ProductDetail } from "../../../../shared/interfaces";
import productsService from "../../../../services/productService"
import ShopMain from "./ShopMain";
import ShopSidebar from "./ShopSidebar";

function Shop() {
    const [categoryData, setCategoryData] = useState<Category>()
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>()
    const { category } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [name, setName] = useState<string>('')

    useEffect(() => {
        handleLoadData()
    },[])

    const handleLoadData = async () => {
        if (searchParams.get('q')) {
            let products = await productsService.search(
                searchParams.get('q') ?? '', 1, 30
            )
            setName(searchParams.get('q') ?? '')
            if(products){
                products = handleConvertProducts(products.data)
                setProducts(products)
            }
        }
        else {
            const findCategory = await categoriesService.findBySlug(category ? category : '')
            setCategoryData(findCategory)
            if (findCategory) {
                const products = handleConvertProducts(findCategory.products)
                setProducts(products)
                setName(findCategory.name)
            }
        }


        setLoading(false)
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
        <>
            <div className="d-xl-none d-block">
                <HeaderClientMobile />
            </div>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <section className="shop bg-outside-client mt-xl-0 mt-2 pb-3">
                <div className="container-client">
                    <article className="breadcrumbCustom py-2">
                        <ul className="breadcrumbCustom__list align-items-start">
                            <li className="breadcrumbCustom__list-item">
                                <Link to="/" className="breadcrumbCustom__list-item-link">Trang chủ</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item">
                                <span className="breadcrumbCustom__list-item-link none">
                                    {categoryData?.name}
                                </span>
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="container-client none">
                    <div className="bg-white border-radius-4 d-flex">
                        <ShopSidebar />
                        <ShopMain name = {name} loading={loading} products={products} />
                    </div>
                </div>
            </section>
            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default Shop;