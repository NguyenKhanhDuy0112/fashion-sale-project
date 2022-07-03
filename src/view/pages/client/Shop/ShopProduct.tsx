import { CgDanger } from "react-icons/cg";
import ProductItem from "../../../../shared/components/ProductItem";
import { Product } from "../../../../shared/interfaces";
interface ShopProductProps {
    products?: Product[],
    loading: boolean
}

function ShopProduct(props: ShopProductProps) {
    const { products, loading } = props

    console.log("Loading: ", loading)
    console.log("Products: ", products)
    return (
        <article className="shop__product">
            {!loading && products && products.length === 0 &&
                <div className="shop__product-notify d-flex align-items-center">
                    <span className="me-2">
                        <CgDanger />
                    </span> 
                    Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
                </div>
            }
            <div className="row row-cols-xl-5 row-cols-md-3 row-cols-2 g-0">
                {loading ?
                    Array.from({ length: 20 }).map((pro: any, idx: number) => (
                        <ProductItem key={idx} loading={loading} />
                    ))
                    :
                    products && products.map(pro => (
                        <div className="col" key={pro._id}>
                            <ProductItem loading={loading} product={pro} />
                        </div>
                    ))
                }
            </div>
        </article>
    );
}

export default ShopProduct;