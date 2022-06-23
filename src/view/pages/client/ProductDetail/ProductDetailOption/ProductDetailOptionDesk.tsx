import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import images from "../../../../../shared/assets";
import { ProductDetail, ProductDetailOrder } from "../../../../../shared/interfaces";

interface ProductDetailDeskProps {
    productDetails?: ProductDetail[] | ProductDetailOrder[],
    loading: boolean
}

interface Color {
    name: string,
    image: string
}

function ProductDetailOptionDesk(props: ProductDetailDeskProps) {
    const { productDetails, loading } = props
    const [color, setColor] = useState<Color>()
    const [size, setSize] = useState<string>('size')
    const [colors, setColors] = useState<Color[]>([])
    const [sizes, setSizes] = useState<string[]>([])
    const [searchParams, setSearchParams] = useSearchParams()

    console.log("Color: ", color)
    console.log("Size: ", size)

    useEffect(() => {
        const colors: Color[] = []
        const sizes: string[] = []
        let color: string = ''
        const id = searchParams.get('spId') ?? ''
        let product: any = undefined
        productDetails?.forEach((proDt: any) => {
            if (proDt.color.toLowerCase() !== color.toLowerCase()) {
                color = proDt.color
                colors.push({ name: proDt.color, image: proDt.images[0] })
            }
            if (proDt._id === id) {
                product = proDt
            }
            if (!sizes.includes(proDt.size)) {
                sizes.push(proDt.size)
            }

        })

        if (product) {
            setColor({ image: product.images[0], name: product.color })
            setSize(product.size)
        }
        else {
            setColor(colors[0])
            setSize(sizes[0])
        }

        setColors(colors)
        setSizes(sizes)

    }, [productDetails])

    const handleChangeColor = (colorItem: string) => {
        if (colorItem.toLowerCase() !== color?.name.toLowerCase()) {
            if (productDetails) {
                const products: any = productDetails
                const findProduct = products.find((proDt: any) => proDt.color === colorItem && proDt.size === size)
                setColor({ image: findProduct.images[0], name: findProduct.color })
                searchParams.set('spId', findProduct._id)
                setSearchParams(searchParams)
            }
        }
    }

    const handleChangeSize = (sizeItem: string) => {
        if (sizeItem.toLowerCase() !== size.toLowerCase()) {
            if (productDetails) {
                const products: any = productDetails
                const findProduct = products.find((proDt: any) => proDt.color === color?.name && proDt.size === sizeItem)
                setSize(sizeItem)
                searchParams.set('spId', findProduct._id)
                setSearchParams(searchParams)
            }
        }
    }


    return (
        <>
            <article className="productDetail__info-option w-100 d-xl-block d-none">
                {loading ?
                    <div className="mb-3">
                        <Skeleton height={60} />
                    </div>
                    :
                    <div className="productDetail__info-option-color mb-3">
                        <p className="productDetail__info-option-color-title mb-2">
                            Màu sắc: <strong>{color?.name.toUpperCase()}</strong>
                        </p>
                        <div className="row g-2 w-100">
                            {colors.length > 0 && colors.map(item => (
                                <div key={item.name} className="col-xl-3 col-md-4 col-6">
                                    <div onClick={() => handleChangeColor(item.name)} className={`productDetail__info-option-color-item ${item.name.toLowerCase() === color?.name.toLowerCase() ? 'active' : ''}`}>
                                        <img
                                            className="productDetail__info-option-color-item-img"
                                            alt=""
                                            src={item.image}
                                        />
                                        <span className="productDetail__info-option-color-item-text ms-1">
                                            {item.name.toUpperCase()}
                                        </span>
                                        <span className="productDetail__info-option-color-item-icon">
                                            <images.CheckItem />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {loading ?
                    <div className="mb-3">
                        <Skeleton height={50} />
                    </div>
                    :
                    <div className="productDetail__info-option-color mb-3">
                        <p className="productDetail__info-option-color-title mb-2">
                            Kích cỡ: <strong>{size ? size.toUpperCase() : ''}</strong>
                        </p>
                        <div className="row g-2">
                            {sizes.length > 0 && sizes.map(item => (
                                <div key={item} className="col-xl-2 col-3">
                                    <div
                                        onClick={() => handleChangeSize(item)}
                                        className={`productDetail__info-option-color-item ${item.toLowerCase() === size.toLowerCase() ? 'active' : ''} justify-content-center px-2 py-1`}
                                    >
                                        <span className="productDetail__info-option-color-item-text text-center">
                                            {item.toUpperCase()}
                                        </span>
                                        <span className="productDetail__info-option-color-item-icon">
                                            <images.CheckItem />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                }
            </article>
        </>
    );
}

export default ProductDetailOptionDesk;