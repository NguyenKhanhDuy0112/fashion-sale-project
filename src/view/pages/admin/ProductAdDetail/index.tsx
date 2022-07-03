import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import productsService from '../../../../services/productService';
import Rating from '../../../../shared/components/Rating';
import TableCustom from '../../../../shared/components/TableCustom';
import { formatCashVND } from '../../../../shared/helpers';
import { Product, ProductDetail } from '../../../../shared/interfaces';
import ProductDetailDescription from '../../client/ProductDetail/ProductDetailDescription';
import ProductDetailInfoImage from '../../client/ProductDetail/ProductDetailInfo/ProductDetailInfoImage';

function ProductAdDetail() {
    const { slug } = useParams()
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState(true)
    const [statistical, setStatistical] = useState<ProductDetail[]>()

    useEffect(() => {
        handleLoadProduct()
    }, [])

    const handleLoadProduct = async () => {
        const product = await productsService.findBySlug(String(slug))
        if (product) {
            const productDetails = product.productDetails.map((proDt: any) => {
                proDt.color = proDt.color.color
                proDt.size = proDt.size.size
                proDt.images = [proDt.images[0].image, ...proDt.images[0].imagesSub]
                return { ...proDt }
            })
            product.productDetails = productDetails

            //begin
            const statistical: any = []
            let color = ''
            product.productDetails.forEach((pro: any) => {
                if (pro.color.toLowerCase() !== color.toLowerCase()) {
                    color = pro.color
                    statistical.push({ ...pro, color: pro.color, sizes: [pro.size] })
                }
                else {
                    const productTemp = statistical[statistical.length - 1]
                    productTemp.sizes.push(pro.size)
                    statistical.splice(statistical.length - 1, 1, productTemp)
                }
            })
            setStatistical(statistical)
            //end
            setProduct(product)
            setLoading(false)
        }
    }

    console.log("Product: ", product)
    console.log("Statistical: ", statistical)

    return (
        <article className="productAdDetail">
            <h5 className="title-admin mb-0">Sản phẩm chi tiết</h5>
            <article className="productDetail__info">
                <div className="bg-white border-radius-4">
                    <div className="row g-0">
                        <div className="col-xl-5 col-12">
                            <ProductDetailInfoImage
                                loading={loading}
                                productDetails={product?.productDetails}
                            />
                        </div>
                        <div className="col-xl col-12">
                            <div className="productDetail__info-content p-3">
                                {
                                    loading
                                        ?
                                        <Skeleton />
                                        :
                                        <p className="productDetail__info-content-brand mb-1 d-xl-block d-none">
                                            Thương hiệu:
                                            <Link
                                                to={`/thuong-hieu/${product?.trademark._id}`}
                                                className="productDetail__info-content-brand-name ms-1"
                                            >
                                                {product?.trademark.name}
                                            </Link>
                                        </p>
                                }
                                <h4 className="productDetail__info-content-title mb-2">
                                    {loading ? <Skeleton /> : product?.name}
                                </h4>
                                {loading ? <Skeleton /> :
                                    <div className="productDetail__info-content-rating d-flex align-items-center mb-xl-3 mb-2">
                                        <Rating
                                            stars={product?.rating ? product.rating : 0}
                                            color="#FDD836"
                                            size={14}
                                            distance={1}
                                        />
                                        {product && product.comments && product.comments.length > 0 &&
                                            <Link to="#comment" className="productDetail__info-content-rating-comment ms-2">
                                                <span className="d-xl-inline d-none">
                                                    (Xem</span> {product?.comments?.length} <span></span> <span className="d-xl-inline d-none">đánh giá)
                                                </span>
                                            </Link>
                                        }
                                        <div className="productDetail__info-content-rating-separate mx-2"></div>
                                        <p className="productDetail__info-content-rating-selled mb-0">
                                            Đã bán {product?.sold}
                                        </p>
                                    </div>
                                }
                                {loading ?
                                    <div className="mb-3">
                                        <Skeleton height={70} />
                                    </div>
                                    :
                                    <div className="productDetail__info-content-price align-items-xl-end align-items-center p-xl-3 p-0 mb-3">
                                        <p className="productDetail__info-content-price-current mb-0">
                                            {(product && product.price)
                                                ?
                                                formatCashVND(product.price - (product.price * ((product.discount ? product.discount : 0) / 100)) + "", ".")

                                                :
                                                0
                                            } ₫

                                        </p>
                                        {(product && product.discount && product.discount > 0)
                                            ?
                                            <p className="productDetail__info-content-price-old mb-0 mx-2">
                                                {formatCashVND(product.price + "", ".")} ₫
                                            </p>
                                            :
                                            ''
                                        }
                                        {(product && product.discount && product.discount > 0) ?
                                            <p className="mb-0 productDetail__info-content-price-discount">
                                                -{product?.discount}%
                                            </p> :
                                            ''
                                        }
                                    </div>
                                }


                            </div>
                        </div>

                    </div>
                </div>
            </article>

            <h5 className='my-4'>Thống kê</h5>
            <div className='row align-items-center g-3'>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Đỏ</h5>
                        </div>
                        <div className='card-body'>
                            <TableCustom headers={["#", "Kích cỡ", "Số lượng"]}>
                                <tr>
                                    <td>1</td>
                                    <td>SM</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>XL</td>
                                    <td>100</td>
                                </tr>
                            </TableCustom>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Vàng</h5>
                        </div>
                        <div className='card-body'>
                            <TableCustom headers={["#", "Kích cỡ", "Số lượng"]}>
                                <tr>
                                    <td>1</td>
                                    <td>SM</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>XL</td>
                                    <td>10</td>
                                </tr>
                            </TableCustom>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Xanh</h5>
                        </div>
                        <div className='card-body'>
                            <TableCustom headers={["#", "Kích cỡ", "Số lượng"]}>
                                <tr>
                                    <td>1</td>
                                    <td>SM</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>L</td>
                                    <td>22</td>
                                </tr>
                            </TableCustom>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDetailDescription
                description={product?.description}
            />
        </article>
    );
}

export default ProductAdDetail;