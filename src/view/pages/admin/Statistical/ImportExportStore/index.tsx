import InputSearch from "../../../../../shared/components/InputSearch";
import PagninationAdmin from "../../../../../shared/components/PaginationAdmin.tsx";

function ImportExportStore() {

    const handleSearchStatistical = (value: string, page: number) => {

    }

    const handleLoad = (data:number) => {

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
                            <th colSpan={6} className="text-center">Thông tin sản phẩm</th>
                            <th style={{ width: "4rem" }} colSpan={1}>Tồn đầu</th>
                            <th style={{ width: "4rem" }} colSpan={1}>Nhập</th>
                            <th style={{ width: "4rem" }} colSpan={1}>Xuất</th>
                            <th style={{ width: "4rem" }} colSpan={1}>Tồn cuối</th>
                        </tr>
                        <tr>
                            <th style={{ width: "3rem" }}>#</th>
                            <th style={{ width: "3rem" }}>ID</th>
                            <th>Tên</th>
                            <th>Màu sắc</th>
                            <th>Kích cỡ</th>
                            <th style={{ width: "3rem" }}>DVT</th>
                            <th>Số lượng</th>
                            <th>Số lượng</th>
                            <th>Số lượng</th>
                            <th>Số lượng</th>
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
                            <td className="text-end">0</td>
                            <td className="text-end">5</td>
                            <td className="text-end">2</td>
                            <td className="text-end">3</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>PR002</td>
                            <td>Áo thun nữ</td>
                            <td>Vàng</td>
                            <td>M</td>
                            <td>Cái</td>
                            <td className="text-end">0</td>
                            <td className="text-end">5</td>
                            <td className="text-end">2</td>
                            <td className="text-end">3</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>PR003</td>
                            <td>Áo khoác nữ</td>
                            <td>Vàng</td>
                            <td>S</td>
                            <td>Cái</td>
                            <td className="text-end">0</td>
                            <td className="text-end">5</td>
                            <td className="text-end">2</td>
                            <td className="text-end">3</td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <PagninationAdmin
                totalPages={1}
                hasNextPage={false}
                hasPrevPage={false}
                nextPage={1}
                prevPage={1}
                pageIndex={1}
                gotoPage={(page) => handleLoad(page)}
            />
        </article>
    );
}

export default ImportExportStore;