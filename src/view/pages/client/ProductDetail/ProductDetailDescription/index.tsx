import ProductDetailDescriptionDesk from "./ProductDetailDescriptionDesk";

interface Props{
    description: string,
}

function ProductDetailDescription(props: Props) {
    const { description } = props
    return (
        <article className="productDetail__description mt-xl-3 mt-2">
            <ProductDetailDescriptionDesk description = {description}/>
        </article>
    );
}

export default ProductDetailDescription;