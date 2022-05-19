import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { brand } from "../dataFilter";

function ShopBrand() {
    const [brandData, setBrandData] = useState(brand)
    const [pagination, setPagination] = useState(5)

    useEffect(() => {
        setBrandData(brand)
    }, [brand])

    return (
        <article className="shop__sidebar-brand p-3 border-b-f7">
            <h5 className="shop__sidebar-title pb-2">Thương hiệu</h5>
            <div className="row g-2">
                {brandData.map((bran, index) => {
                    return index < pagination && (
                        <div key={bran.id} className="col-xl-12 col-6">
                            <button className="shop__sidebar-item d-flex justify-content-center justify-content-xl-start align-items-center w-100">
                                <input className="shop__sidebar-item-input me-2 d-xl-inline d-none" type="checkbox" />
                                <label className="shop__sidebar-item-text text-center">{bran.name}</label>
                            </button>
                        </div>
                    )
                })}

                <div className="col-xl-12 col-6">
                    <div className="mt-xl-3 mt-0"></div>
                    <button onClick={() => setPagination(pagination === 100 ? 5 : 100)} className="shop__sidebar-btn-more d-xl-block d-none">
                        {pagination === 5 && <span>Xem thêm <IoIosArrowDown /></span>}
                        {pagination === 100 && <span>Thu gọn <IoIosArrowUp /></span>}
                    </button>
                    <div className="mt-xl-3 mt-0"></div>
                    <button onClick={() => setPagination(100)} className="shop__sidebar-item d-xl-none d-block w-100 shop__sidebar-btn-more">
                        Xem thêm <span className="d-xl-inline d-none"><IoIosArrowDown /></span>
                        <span className="d-xl-none d-inline">
                            <IoIosArrowForward />
                        </span>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ShopBrand;