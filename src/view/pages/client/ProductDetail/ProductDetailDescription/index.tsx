import ProductDetailDescriptionDesk from "./ProductDetailDescriptionDesk";

interface Props{
    description?: string,
    noneContainer? :boolean
}

function ProductDetailDescription(props: Props) {
    const { description, noneContainer } = props
    return (
        <article className="productDetail__description mt-xl-3 mt-2">
            <ProductDetailDescriptionDesk noneContainer = {noneContainer} description = {description}/>
        </article>
    );
}

export default ProductDetailDescription;