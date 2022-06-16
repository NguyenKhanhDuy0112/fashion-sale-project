import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import images from "../../../../../shared/assets";
import ModalCustom from "../../../../../shared/components/ModalCustom";
import { formatCashVND } from "../../../../../shared/helpers";
import { Product, ProductDetail, ProductDetailOrder } from "../../../../../shared/interfaces";

interface ProductDetailOptionMobileProps {
    product?: Product,
    loading: boolean,
}

interface Color {
    name: string,
    image: string,
}

function ProductDetailOptionMobile(props: ProductDetailOptionMobileProps) {
    const { product, loading } = props
    const [show, setShow] = useState<boolean>(false)
    const [color, setColor] = useState<Color>()
    const [size, setSize] = useState<string>('size')
    const [colorTemp, setColorTemp] = useState<Color>()
    const [sizeTemp, setSizeTemp] = useState<string>('size')
    const [colors, setColors] = useState<Color[]>([])
    const [sizes, setSizes] = useState<string[]>([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const colors: Color[] = []
        const sizes: string[] = []
        let color: string = ''
        product?.productDetails?.forEach((proDt: any) => {
            if (proDt.color.toLowerCase() !== color.toLowerCase()) {
                color = proDt.color
                colors.push({ name: proDt.color, image: proDt.images[0] })
            }

            if (!sizes.includes(proDt.size)) {
                sizes.push(proDt.size)
            }

        })

        setColors(colors)
        setColorTemp(colors[0])
        setSizeTemp(sizes[0])
        setSizes(sizes)
        setColor(colors[0])
        setSize(sizes[0])
    }, [product])

    const handleChangeColor = (colorItem: string) => {
        if (colorItem.toLowerCase() !== colorTemp?.name.toLowerCase()) {
            if (product && product.productDetails) {
                const products: any = product.productDetails
                const findProduct = products.find((proDt: any) => proDt.color === colorItem && proDt.size === sizeTemp)
                setColorTemp({ image: findProduct.images[0], name: findProduct.color })
                setSizeTemp(findProduct.size)
            }
        }
    }

    const handleChangeSize = (sizeItem: string) => {
        if (sizeItem.toLowerCase() !== sizeTemp.toLowerCase()) {
            if (product && product.productDetails) {
                const products: any = product.productDetails
                const findProduct = products.find((proDt: any) => proDt.color === colorTemp?.name && proDt.size === sizeItem)
                setSizeTemp(sizeItem)
                setColorTemp({ image: findProduct.images[0], name: findProduct.color })
            }
        }
    }

    const handleSubmitProperty = () => {
        setSize(sizeTemp)
        setColor(colorTemp)
        setShow(!show)
        if (product && product.productDetails) {
            const products: any = product.productDetails
            const findProduct = products.find((proDt: any) => proDt.color === colorTemp?.name && proDt.size === sizeTemp)
            searchParams.set('spId', findProduct._id)
            setSearchParams(searchParams)
        }
    }

    return (
        <article className="d-xl-none d-block">
            {loading ?
                <Skeleton height={100}/>
                :
                <div onClick={() => setShow(!show)} className="productDetail__info-option-mobile d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center">
                        <div className="productDetail__info-option-mobile-img">
                            <div
                                className="productDetail__info-option-mobile-bg"
                                style={{ backgroundImage: `url(${color?.image})` }}>
                            </div>
                        </div>
                        <div className="productDetail__info-option-mobile-content d-flex flex-column ms-2">
                            <span className="productDetail__info-option-mobile-content-title mb-0">
                                Màu sắc, Kích cỡ
                            </span>
                            <span className="productDetail__info-option-mobile-content-text mb-0 text-uppercase">
                                {color?.name} / {size}
                            </span>
                        </div>
                    </div>
                    <span>
                        <IoIosArrowForward size={23} color="#919191" />
                    </span>
                </div>
            }

            <ModalCustom show={show} onHandleShow={() => setShow(!show)} position="full">
                <div className="modalCustom__header px-2">
                    <span onClick={() => setShow(false)} className="modalCustom__header-icon p-1">
                        <IoCloseSharp size={30} color="#fff" />
                    </span>
                    <h5 className="modalCustom__header-title">Lựa chọn thuộc tính</h5>
                </div>
                <div className="modalCustom__body mt-5 py-4">
                    <div className="productDetail__info-option-mobile-card d-flex px-3 pb-3 border-b-f7">
                        <div
                            className="productDetail__info-option-mobile-card-img"
                            style={{ backgroundImage: `url(${colorTemp?.image})` }}
                        ></div>
                        <div className="productDetail__info-option-mobile-card-content ms-2">
                            <h5 className="productDetail__info-option-mobile-card-title mb-1">
                                {product?.name}
                            </h5>
                            <div className="d-flex align-items-center">
                                <span className="productDetail__info-option-mobile-content-title">
                                    Màu sắc, Kích cỡ:
                                </span>
                                <span className="productDetail__info-option-mobile-content-text ms-2 text-uppercase">
                                    {colorTemp?.name} / {sizeTemp}
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="productDetail__info-option-mobile-content-title">
                                    Cung cấp bởi:
                                </span>
                                <span className="productDetail__info-option-mobile-content-text ms-2">
                                    {product?.trademark.name}
                                </span>
                            </div>
                            <h2 className="mb-0">
                                {formatCashVND((product?.price ? product.price : 0) - ((product?.price ? product.price : 0) * ((product?.discount ? product.discount : 0) / 100)) + "", ".")} đ
                            </h2>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="productDetail__info-option-color mb-3">
                            <p className="productDetail__info-option-color-title mb-2">
                                Màu sắc: <strong>{colorTemp?.name}</strong>
                            </p>
                            <div className="row g-2 w-100">
                                {colors?.map((item:Color, index: number) => (
                                    <div key={index} className="col-xl-3 col-md-4 col-6">
                                        <div
                                            onClick={() => handleChangeColor(item.name)}
                                            className={`productDetail__info-option-color-item ${item.name === colorTemp?.name ? 'active' : ''}`}
                                        >
                                            <img
                                                className="productDetail__info-option-color-item-img"
                                                alt=""
                                                src={item.image}
                                            />
                                            <span className="productDetail__info-option-color-item-text ms-1 text-uppercase">
                                                {item.name}
                                            </span>
                                            <span className="productDetail__info-option-color-item-icon">
                                                <images.CheckItem />
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="productDetail__info-option-color mb-3">
                            <p className="productDetail__info-option-color-title mb-2">
                                Kích cỡ: <strong>{sizeTemp}</strong>
                            </p>

                            <div className="row g-2">
                                {sizes?.map((item:string, index: number) => (
                                    <div key = {index} className="col-xl-2 col-3">
                                        <div
                                            onClick={() => handleChangeSize(item)}
                                            className={`productDetail__info-option-color-item justify-content-center px-2 py-1 ${item.toLowerCase() === sizeTemp.toLowerCase() ? 'active' : ''}`}
                                        >
                                            <span className="productDetail__info-option-color-item-text text-center">
                                                {item}
                                            </span>
                                            <span className="productDetail__info-option-color-item-icon">
                                                <images.CheckItem />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modalCustom__footer p-3">
                    <button
                        onClick={handleSubmitProperty}
                        className="productDetail__info-content-buy py-2"
                    >
                        Xong
                    </button>
                </div>
            </ModalCustom>
        </article>
    );
}

export default ProductDetailOptionMobile;