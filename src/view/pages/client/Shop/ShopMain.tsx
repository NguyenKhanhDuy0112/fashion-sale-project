import { BsArrowDownUp } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import ShopProduct from "./ShopProduct";
import ShopTagFilter from "./ShopTagFilter";
import { HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi";

function ShopMain() {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleQuerySort = (sort: string) => {
        if (searchParams.get('sort')) {
            searchParams.set('sort', sort)
        }
        else {
            searchParams.append('sort', sort)
        }
        setSearchParams(searchParams)
    }

    return (
        <article className="shop__main w-100">
            <div className="border-b-f7 px-3 pt-3">
                <h4 className="shop__main-title mb-xl-3 mb-4 mt-xl-0 mt-1">Áo thun nam ngắn tay có cổ</h4>
                <ul className="shop__main-sort d-flex align-items-center justify-content-between pb-xl-0 pb-2">
                    <li className="shop__main-sort-item d-flex align-items-center">
                        <span
                            onClick={() => handleQuerySort("default")}
                            className={`shop__main-sort-item-link pb-xl-3 pb-0 d-block cursor-pointer ${searchParams.get('sort') === 'default' ? 'active' : ''}`}
                        >
                            Phổ Biến
                        </span>

                    </li>
                    <div className="shop__main-sort-icon-container d-xl-none d-flex justify-content-center">
                        <div className="shop__main-sort-icon"></div>
                    </div>
                    <li className="shop__main-sort-item">
                        <span
                            onClick={() => handleQuerySort("top_seller")}
                            className={`shop__main-sort-item-link pb-xl-3 pb-0 d-block cursor-pointer ${searchParams.get('sort') === 'top__seller' ? 'active' : ''}`}
                        >
                            Bán Chạy
                        </span>
                    </li>
                    <div className="shop__main-sort-icon-container d-xl-none d-flex justify-content-center">
                        <div className="shop__main-sort-icon"></div>
                    </div>
                    <li className="shop__main-sort-item">
                        <span
                            onClick={() => handleQuerySort("newest")}
                            className={`shop__main-sort-item-link pb-xl-3 pb-0 d-block cursor-pointer ${searchParams.get('sort') === 'newest' ? 'active' : ''}`}
                        >
                            Hàng Mới
                        </span>
                    </li>
                    <div className="shop__main-sort-icon-container d-xl-none d-flex justify-content-center">
                        <div className="shop__main-sort-icon"></div>
                    </div>
                    <li className="shop__main-sort-item d-xl-block d-none">
                        <span
                            onClick={() => handleQuerySort("asc")}
                            className={`shop__main-sort-item-link pb-xl-3 pb-0 d-block cursor-pointer ${searchParams.get('sort') === 'asc' ? 'active' : ''}`}
                        >
                            Giá Thấp
                        </span>
                    </li>
                    <li className="shop__main-sort-item d-xl-block d-none">
                        <span
                            onClick={() => handleQuerySort("desc")}
                            className={`shop__main-sort-item-link pb-xl-3 pb-0 d-block cursor-pointer ${searchParams.get('sort') === 'desc' ? 'active' : ''}`}
                        >
                            Giá Cao
                        </span>
                    </li>
                    <li className="shop__main-sort-item d-xl-none d-flex flex-nowrap align-items-end">
                        <span
                            className={`shop__main-sort-item-link pb-xl-3 pb-0 d-block cursor-pointer ${(searchParams.get('sort') === 'asc' || searchParams.get('sort') === 'desc') ? 'active' : ''}`}
                            onClick={() => handleQuerySort(searchParams.get('sort') === 'asc' ? 'desc' : 'asc')}
                        >
                            Giá
                            <small className="ms-1">
                                {searchParams.get('sort') !== 'asc' && searchParams.get('sort') !== 'desc' && <BsArrowDownUp size={16} />}
                                {searchParams.get('sort') && searchParams.get('sort') === 'asc' && <HiOutlineArrowUp size={16} />}
                                {searchParams.get('sort') && searchParams.get('sort') === 'desc' && <HiOutlineArrowDown size={16} />}
                            </small>
                        </span>
                    </li>
                </ul>
            </div>
            <ShopTagFilter />
            <ShopProduct />
        </article>
    );
}

export default ShopMain;