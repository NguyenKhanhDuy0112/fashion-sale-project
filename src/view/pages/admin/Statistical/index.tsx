import InputSearch from "../../../../shared/components/InputSearch";

function StatisticalAdmin() {
    
    const handleSearchStatistical = (value: string, page: number) => {

    }
    return (
        <article>
            <h5 className="title-admin mb-0" >Thống kê</h5>
            <div className="d-flex align-items-center tableCustom__filter px-3 py-4 mb-3">
                <div className="row g-3 w-100">
                    <div className="col-xl-4 col-md-3 col-12">
                        <InputSearch valueInput="" onChangeValue={(value) => handleSearchStatistical(value, 1)}/>
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
                <table className="tableAdmin table table-bordered table-striped table-hover mb-0 p-0">
                    <thead className="tableAdmin__thead">
                        <tr className="tableAdmin__tr border-bottom border-1">
                            <th className="tableAdmin__th text-center border-end border-1" colSpan={4}>Thông tin sản phẩm</th>
                            <th className="tableAdmin__th text-center border-end border-1" style={{ width: "4rem" }} colSpan= {1}>Tồn đầu</th>
                            <th className="tableAdmin__th text-center border-end border-1" style={{ width: "4rem" }} colSpan= {1}>Nhập</th>
                            <th className="tableAdmin__th text-center border-end border-1" style={{ width: "4rem" }} colSpan= {1}>Xuất</th>
                            <th className="tableAdmin__th text-center" style={{ width: "4rem" }} colSpan= {1}>Tồn cuối</th>
                        </tr>
                        <tr className="tableAdmin__tr">
                            <th style={{ width: "3rem" }} className="tableAdmin__th border-end border-1">#</th>
                            <th style={{ width: "3rem" }} className="tableAdmin__th border-end border-1">ID</th>
                            <th className="tableAdmin__th border-end border-1">Tên</th>
                            <th style={{ width: "3rem" }} className="tableAdmin__th border-end border-1">DVT</th>
                            <th className="tableAdmin__th border-end border-1">Số lượng</th>
                            <th className="tableAdmin__th border-end border-1">Số lượng</th>
                            <th className="tableAdmin__th border-end border-1">Số lượng</th>
                            <th className="tableAdmin__th border-end border-1">Số lượng</th>
                        </tr>

                    </thead>
                    <tbody className="tableAdmin__tbody">
                        <tr className="tableAdmin__tr">
                            <td className="tableAdmin__td border-end border-1">1</td>
                            <td className="tableAdmin__td border-end border-1">PR001</td>
                            <td className="tableAdmin__td border-end border-1">Áo thun nam</td>
                            <td className="tableAdmin__td border-end border-1">Cái</td>
                            <td className="tableAdmin__td border-end border-1 text-end">0</td>
                            <td className="tableAdmin__td border-end border-1 text-end">5</td>
                            <td className="tableAdmin__td border-end border-1 text-end">2</td>
                            <td className="tableAdmin__td border-end border-1 text-end">3</td>
                        </tr>
                        <tr className="tableAdmin__tr">
                            <td className="tableAdmin__td border-end border-1">2</td>
                            <td className="tableAdmin__td border-end border-1">PR002</td>
                            <td className="tableAdmin__td border-end border-1">Áo thun nữ</td>
                            <td className="tableAdmin__td border-end border-1">Cái</td>
                            <td className="tableAdmin__td border-end border-1 text-end">0</td>
                            <td className="tableAdmin__td border-end border-1 text-end">5</td>
                            <td className="tableAdmin__td border-end border-1 text-end">2</td>
                            <td className="tableAdmin__td border-end border-1 text-end">3</td>
                        </tr>
                        <tr className="tableAdmin__tr">
                            <td className="tableAdmin__td border-end border-1">3</td>
                            <td className="tableAdmin__td border-end border-1">PR003</td>
                            <td className="tableAdmin__td border-end border-1">Áo khoác nữ</td>
                            <td className="tableAdmin__td border-end border-1">Cái</td>
                            <td className="tableAdmin__td border-end border-1 text-end">0</td>
                            <td className="tableAdmin__td border-end border-1 text-end">5</td>
                            <td className="tableAdmin__td border-end border-1 text-end">2</td>
                            <td className="tableAdmin__td border-end border-1 text-end">3</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );
}

export default StatisticalAdmin;