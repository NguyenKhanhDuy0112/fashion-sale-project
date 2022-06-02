import InputSearch from "../../../../../shared/components/InputSearch";

function StoreNotAllow() {

    const handleSearchStatistical = (value: string, page: number) => {

    }

    return (
        <article>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-4 col-md-3 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchStatistical(value, 1)} />
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Từ ngày" className="form-control inputSearch" />
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Đến ngày" className="form-control inputSearch" />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="tableCustom">
                    <thead>
                        <tr>
                            <th colSpan={7} className="text-center">Thông tin sản phẩm</th>
                            <th className="text-center" colSpan={1}>Số dư cuối kỳ</th>
                        </tr>
                        <tr>
                            <th style={{ width: "3rem" }}>#</th>
                            <th style={{ width: "3rem" }}>ID</th>
                            <th>Tên</th>
                            <th>Màu sắc</th>
                            <th>Kích cỡ</th>
                            <th style={{ width: "3rem" }}>DVT</th>
                            <th className="text-center">Số lượng định mức</th>
                            <th className="text-center">Số lượng</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>PR001</td>
                            <td>Áo thun nam</td>
                            <td>Đỏ</td>
                            <td>M</td>
                            <td>Cái</td>
                            <td className="text-end">10</td>
                            <td className="text-end">7</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>PR002</td>
                            <td>Áo thun nữ</td>
                            <td>Vàng</td>
                            <td>M</td>
                            <td>Cái</td>
                            <td className="text-end">10</td>
                            <td className="text-end">8</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>PR003</td>
                            <td>Áo khoác nữ</td>
                            <td>Vàng</td>
                            <td>S</td>
                            <td>Cái</td>
                            <td className="text-end">10</td>
                            <td className="text-end">5</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );
}

export default StoreNotAllow;