function ProductDetailInfoDt() {
    return ( 
        <article className="productDetail__infoDt mt-xl-3 mt-2">
            <div className="container-client none">
                <div className="p-3 bg-white border-radius-4">
                    <h4 className="productDetail__title">Thông tin chi tiết</h4>
                    <table className="productDetail__infoDt-table">
                        <tbody>
                            <tr>
                                <td>Chất liệu</td>
                                <td>95% CVC, 5% Spandex</td>
                            </tr>
                            <tr>
                                <td>Xuất xứ</td>
                                <td>Việt Nam</td>
                            </tr>
                            <tr>
                                <td>Xuất xứ thương hiệu</td>
                                <td>Việt Nam</td>
                            </tr>
                            <tr>
                                <td>Thương hiệu</td>
                                <td>5S</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
     );
}

export default ProductDetailInfoDt;