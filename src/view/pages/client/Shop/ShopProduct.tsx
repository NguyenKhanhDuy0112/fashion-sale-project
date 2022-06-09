import ProductItem from "../../../../shared/components/ProductItem";

function ShopProduct() {
    return (
        <article className="shop__product">
            <div className="row row-cols-xl-4 row-cols-md-3 row-cols-2 g-0">
                {Array.from({ length: 20 }).map((item, index) => (
                    <div className="col" key={index}>
                       
                    </div>
                ))}
            </div>
        </article>
    );
}

export default ShopProduct;