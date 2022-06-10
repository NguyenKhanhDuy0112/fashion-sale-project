import Skeleton from "react-loading-skeleton";
import { Product } from "../../../../shared/interfaces";

interface ProductDetailInfoDtProps {
    product?: Product,
    loading: boolean,
}
function ProductDetailInfoDt(props: ProductDetailInfoDtProps) {

    const { product, loading } = props

    return (
        <article className="productDetail__infoDt mt-xl-3 mt-2">
            <div className="container-client none">
                <div className="p-3 bg-white border-radius-4">
                    <h4 className="productDetail__title">Thông tin chi tiết</h4>
                    {loading ?
                        <Skeleton height={150} />
                        :
                        <table className="productDetail__infoDt-table">
                            <tbody>
                                <tr>
                                    <td>Chất liệu</td>
                                    <td>{product?.material}</td>
                                </tr>
                                <tr>
                                    <td>Xuất xứ</td>
                                    <td>{product?.origin}</td>
                                </tr>
                                <tr>
                                    <td>Thương hiệu</td>
                                    <td>{product?.trademark.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </article>
    );
}

export default ProductDetailInfoDt;