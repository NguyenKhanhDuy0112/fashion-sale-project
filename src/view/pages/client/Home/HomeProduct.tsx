import ProductItem from "../../../../shared/components/ProductItem";

function HomeProduct() {
    return (
        <article className="container-client none">
            <div className="row row-cols-xl-6 row-cols-md-4 row-cols-2 g-0">
                {Array.from({ length: 20 }).map((item, index) => (
                    <div className="col" key ={index}>
                        <ProductItem  />
                    </div>
                ))}
            </div>
        </article>
    );
}

export default HomeProduct;