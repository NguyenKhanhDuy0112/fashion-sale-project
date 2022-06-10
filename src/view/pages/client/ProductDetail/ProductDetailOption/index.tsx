import { Product } from "../../../../../shared/interfaces";
import ProductDetailOptionDesk from "./ProductDetailOptionDesk";
import ProductDetailOptionMobile from "./ProductDetailOptionMobile";

interface ProductDetailProps{
    product?: Product
    loading: boolean,
}

function ProductDetailOption(props: ProductDetailProps) {
    const { product, loading } = props

    return ( 
        <article>
            <ProductDetailOptionDesk 
                loading = {loading}
                productDetails = {product?.productDetails}
            />
            <ProductDetailOptionMobile/>
        </article>
     );
}

export default ProductDetailOption;