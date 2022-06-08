import { useEffect, useState } from "react";
import productsService from "../../../../services/productService";
import ProductItem from "../../../../shared/components/ProductItem";
import { Pagination, Product } from "../../../../shared/interfaces";

function HomeProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPagination] = useState<Pagination>()

    useEffect(() => {
        handleLoadProducts(1)
    }, [])

    const handleLoadProducts = async (page: number) => {
        try {
            const products = await productsService.listPagination(page, 10)
            if (products) {
                const { data, ...others } = products
                const newProducts = data.map((pro: any, index: number) => {
                    const proDetails: any = []
                    let color = ''
                    pro.productDetails.forEach((proDt: any) => {
                        if (color.toLowerCase() !== proDt.color.color.toLowerCase()) {
                            proDetails.push({ ...proDt, color: proDt.color.color, sizes: [proDt.size.size], images: [proDt.images[0].image, ...proDt.images[0].imagesSub] })
                            color = proDt.color.color
                        }
                        else {
                            const tempProductDetail = proDetails[proDetails.length - 1]
                            proDetails.splice(index, 1, { ...tempProductDetail, sizes: [...tempProductDetail.sizes, proDt.size.size] })
                        }
                    })
                              
                    return { ...pro, productDetails: proDetails }
                })

                setProducts(newProducts)                
                setPagination({ ...others })

            }
        } catch (err) {
            console.log("Failed load products")
        }
    }

    console.log("Products: ", products)

    return (
        <article className="container-client none">
            <div className="row row-cols-xl-6 row-cols-md-4 row-cols-2 g-0">
                {Array.from({ length: 20 }).map((item, index) => (
                    <div className="col" key={index}>
                        <ProductItem />
                    </div>
                ))}
            </div>
        </article>
    );
}

export default HomeProduct;