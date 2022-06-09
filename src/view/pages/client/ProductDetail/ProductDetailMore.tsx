import ProductItem from "../../../../shared/components/ProductItem";

function ProductDetailMore() {
    return (
        <article className="productDetail__more mt-xl-3 mt-2">
            <div className="container-client none">
                <div className="bg-white border-radius-4 p-3 homeSuggest mb-xl-3 mb-2">
                    <h5 className="productDetail__title mb-0">Khám phá thêm</h5>
                </div>
                <div className="bg-white border-radius-4">
                    <div className="row row-cols-xl-6 row-cols-md-4 row-cols-2 g-0 w-100">
                        {Array.from({ length: 20 }).map((item, index) => (
                            <div className="col" key={index}>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ProductDetailMore;