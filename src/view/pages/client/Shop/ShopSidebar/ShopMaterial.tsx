import { useEffect, useState } from "react";
import { material } from "../dataFilter"
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";

function ShopMaterial() {
    const [materialData, setMaterialData] = useState(material)
    const [pagination, setPagination] = useState(5)

    useEffect(() => {
        setMaterialData(material)
    }, [material])

    return (
        <article className="shop__sidebar-brand p-3 border-b-f7">
            <h5 className="shop__sidebar-title pb-2">Chất liệu</h5>
            <div className="row g-2">
                {materialData.map((mater, index) => {
                    return index < pagination && (
                        <div key={mater.id} className="col-xl-12 col-6">
                            <button className="shop__sidebar-item d-flex justify-content-center justify-content-xl-start align-items-center w-100">
                                <input className="shop__sidebar-item-input me-2 d-xl-inline d-none" type="checkbox" />
                                <label className="shop__sidebar-item-text text-center">{mater.name}</label>
                            </button>
                        </div>
                    )
                })}

                <div className="col-xl-12 col-6">
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
    );
}

export default ShopMaterial;