import { useState, useEffect } from "react";
import ProductItemAdSearch from "../../../../shared/components/ProductItemAdSearch";
import { ProductDetailOrder } from "../../../../shared/interfaces";
import useDebounce from "../../../../shared/hooks/useDebounce";
import productsService from "../../../../services/productService";
import { useSearchParams } from "react-router-dom";

interface Props {
    onAddProduct: (product: ProductOrder) => void
}

interface ProductOrder {
    _id: string,
    name: string,
    material: string,
    origin: string,
    description: string,
    unit: string,
    slug?: string,
    trademark?: any,
    price: number,
    rating?: number,
    category?: any,
    createdAt?: any,
    updatedAt?: any,
    amount: number,
    productDetails: ProductDetailOrder[],
    mainProduct: ProductDetailOrder
}

function SearchProduct(props: Props) {
    
    const { onAddProduct } = props
    const [isLoading, setIsLoading] = useState(false)
    const [valueInputSearch, setValueInputSearch] = useState<string>('')
    const [searchResults, setSearchResults] = useState<ProductOrder[]>([])
    const debounceValue = useDebounce<string>(valueInputSearch, 700)

    useEffect(() => {
        setIsLoading(true)
        if (!debounceValue || debounceValue === '') {
            setSearchResults([])
            setIsLoading(false)
        }
        else {
            productsService.search(debounceValue ? debounceValue : '', 1, 10)
                .then(res => {
                    const { data, ...others } = res
                    setIsLoading(false)
                    setSearchResults(data)
                })
        }
    }, [debounceValue])

    const handleAddProduct = (product: ProductOrder) => {
        const { productDetails, ...others } = product
        const proDetails: ProductDetailOrder[] = []
        const newProduct: ProductOrder = product
        if (product.productDetails && product.productDetails.length > 0) {
            product.productDetails.forEach((proDetail: any) => {
                proDetails.push({
                    ...proDetail,
                    _id: proDetail._id,
                    color: proDetail.color.color,
                    images: [ proDetail.images[0].image, ...proDetail.images[0].imagesSub],
                    size: proDetail.size.size
                })
            })
            newProduct.amount = product.price ? product.price : 0
            newProduct.mainProduct = { _id: proDetails[0]._id, color: proDetails[0].color, images: proDetails[0].images, quantity: 1, size: proDetails[0].size }
            newProduct.productDetails = proDetails
        }
        onAddProduct(newProduct)
    }

    return (
        <div className="position-relative">
            <input
                onChange={(e) => setValueInputSearch(e.target.value)}
                className="sellAdmin__header-search"
                placeholder="Tìm kiếm sản phẩm..."
            />

            {isLoading ?
                <ul className="list-unstyled m-0 sellAdmin__header-list-search p-2">
                    {Array.from({ length: 8 }).map((item: any, index: number) => (
                        <li
                            key={index}
                            className="sellAdmin__header-list-search-item"
                        >
                            <ProductItemAdSearch
                                isLoading={true}
                                title={""}
                                price={0}
                                trademark={""}
                                img={""}
                            />
                        </li>
                    ))}
                </ul>
                :
                <ul className="list-unstyled m-0 sellAdmin__header-list-search p-2">
                    {searchResults && searchResults.length > 0 && searchResults.map((product: any, index) => {

                        return (
                            <li
                                key={index}
                                onClick={() => handleAddProduct({ ...product})}
                                className="sellAdmin__header-list-search-item"
                            >
                                {product &&
                                    <ProductItemAdSearch
                                        isLoading={false}
                                        title={product.name}
                                        price={product.price ? product.price : 0}
                                        trademark={product.trademark.name}
                                        img={(product.productDetails && product.productDetails.length > 0) ? product.productDetails[0].images[0].image : ''}
                                    />
                                }
                            </li>
                        )
                    })}
                    {searchResults.length === 0 &&
                        <p className="text-center mb-0 p-2 text-secondary">Không tìm thấy kết quả tìm kiếm.</p>
                    }
                </ul>
            }
        </div>
    );
}

export default SearchProduct;