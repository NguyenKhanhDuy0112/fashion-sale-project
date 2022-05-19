import { useSearchParams } from "react-router-dom";

function ShopPrice() {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleEditQuery = (price: string) => {
        if(searchParams.get('price')){
            searchParams.set('price', price)
        }
        else{
            searchParams.append('price', price)
        }
        setSearchParams(searchParams)
    }
    
    return (
        <article className="shop__sidebar-price p-3 border-b-f7">
            <h5 className="shop__sidebar-title pb-2">Giá</h5>
            <div className="row g-2">
                <div className="col-xl-12 col-6 d-flex align-items-end">
                    <span onClick={() => handleEditQuery("0,100000")} className="shop__sidebar-price-item shop__sidebar-item py-1 px-2 mb-1 cursor-pointer">
                        Dưới 100.000
                    </span>
                </div>
                <div className="col-xl-12 col-6 d-flex align-items-end">
                    <span onClick={() => handleEditQuery("100000,200000")} className="shop__sidebar-price-item shop__sidebar-item py-1 px-2 mb-1 cursor-pointer">
                        Từ 100.000 đến 200.000
                    </span>
                </div>
                <div className="col-xl-12 col-6 d-flex align-items-end">
                    <span onClick={() => handleEditQuery("200000,650000")} className="shop__sidebar-price-item shop__sidebar-item py-1 px-2 mb-1 cursor-pointer">
                        Từ 200.000 đến 650.000
                    </span>
                </div>
                <div className="col-xl-12 col-6 d-flex align-items-end">
                    <span onClick={() => handleEditQuery("650000,10000000000")} className="shop__sidebar-price-item shop__sidebar-item py-1 px-2 mb-1 cursor-pointer">
                        Trên 650.000
                    </span>
                </div>
            </div>
            <p className="shop__sidebar-price-title my-xl-0 my-2">Chọn khoảng giá</p>
            <div className="shop__sidebar-price-input-group d-flex align-items-center">
                <input className="" pattern="[0-9]*" placeholder="Giá từ" />
                <span className="">-</span>
                <input className="" pattern="[0-9]*" placeholder="Giá đến" />
            </div>
            <button className="shop__sidebar-price-btn d-xl-block d-none">
                Áp dụng
            </button>
        </article>
    );
}

export default ShopPrice;