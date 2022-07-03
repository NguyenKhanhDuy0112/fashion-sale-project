import { BiSearchAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import HistorySearch from "../../../shared/components/HistorySearch";
import ModalCustom from "../../../shared/components/ModalCustom";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";


function HeaderClientSearch(props: { show: boolean,onShowNavAccount?: () => void ,setShow: (value: boolean) => void }) {
    const { show, setShow, onShowNavAccount } = props

    const [showModalFull, setShowModalFull] = useState(false)
    const [size, setSize] = useState<number>(window.innerWidth)
    const inputSearch = useRef<HTMLInputElement>(null)
    const [valueSearch, setValueSearch] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [size])

    const handleToggle = () => {
        if (size <= 1200) {
           
            setShowModalFull(!showModalFull)
            setShow(false)
        }
        else {
            setShow(!show)
        }
        inputSearch.current?.focus()

    }

    const handleModalShow = () => {
        if (size <= 1200) {
            
            setShowModalFull(true)
            setShow(false)
        }
        else {
            setShow(true)
            setShowModalFull(false)
        }
        inputSearch.current?.focus()
    }

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter' && valueSearch.trim() !== ""){
            const histories = JSON.parse(localStorage.getItem('search') ?? "")
            histories.push(valueSearch)
            localStorage.setItem('search', JSON.stringify(histories))
            navigate(`/search?q=${valueSearch}`)
            handleModalShow()
            setValueSearch("")
        }
    }


    return (
        <>
            <div className="position-relative">
                <div
                    className="headerClient__search position-relative bg-white px-xl-0 border-radius-4"
                >
                    {/* <span className="d-xl-none d-flex justify-content-center align-items-center opacity-50">
                        <BiSearchAlt size={22} />
                    </span> */}
                    {/* <input onClick={handleModalShow} className="headerClient__search-input" placeholder="Bạn tìm gì hôm nay?" /> */}
                    <div
                        className="headerClient__search position-relative h-100 bg-white px-xl-0 px-2 border-radius-4"
                    >
                        <span className="d-xl-none d-flex justify-content-center align-items-center opacity-50">
                            <BiSearchAlt size={17} />
                        </span>
                        <input 
                            onKeyPress={(e) => handleSearch(e)}
                            onChange = {(e) => setValueSearch(e.target.value)}
                            onClick={handleModalShow} 
                            className="headerClient__search-input py-2" 
                            placeholder="Bạn đang tìm kiếm gì?" 
                        />
                    </div>

                    <button className="headerClient__search-btn d-xl-block d-none">
                        <BiSearchAlt size={22} />
                        <span className="headerClient__search-btn-text ms-1">Tìm kiếm</span>
                    </button>
                </div>
                <div className={`headerClient__search-history ${show ? 'active' : ''}`}>
                    <HistorySearch
                        handleToggle={handleToggle}
                        historySearch={["ao thun nam"]}
                    />
                    <p className="headerClient__search-history-title">Danh mục nổi bật</p>
                    <div className="headerClient__search-history-category-container">
                        <div className="row">
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/cache/280x280/ts/product/73/91/eb/1f9cbbf16f75dfc883edafbd54f43ffa.jpg" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Áo thun nam ngắn tay không cổ</p>
                                </Link>
                            </div>
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/ts/category/d6/7f/6c/5d53b60efb9448b6a1609c825c29fa40.png" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Giày - Dép nam</p>
                                </Link>
                            </div>
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/cache/280x280/ts/product/72/4f/38/308e496dc4a9f323d4c4b2253a15224e.jpg" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Dép nữ quai ngang</p>
                                </Link>
                            </div>
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/cache/280x280/ts/product/87/6b/f7/be592a2f87a4a5268fff8260957d15d4.png" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Áo thun nam dài tay</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalCustom position="full" onHandleShow={handleToggle} show={showModalFull} >
                <div className="modalCustom__header container-client d-flex align-items-center justify-content-between py-2">
                    <span className="py-2 pe-2" onClick={handleToggle}>
                        <IoIosArrowBack size={22} fontWeight="700" color="#fff" />
                    </span>
                    <span className="p-2" onClick={onShowNavAccount}>
                        <FaBars size={22} color="#fff" />
                    </span>
                    <div
                        className="mx-1 headerClient__search position-relative h-100 bg-white px-xl-0 px-2 border-radius-4"
                    >
                        <span className="d-xl-none d-flex justify-content-center align-items-center opacity-50">
                            <BiSearchAlt size={17} />
                        </span>
                        <input ref = {inputSearch} className="headerClient__search-input py-2" placeholder="Bạn đang tìm kiếm gì?" />
                    </div>

                    <Link to="/" className="p-2">
                        <FiShoppingCart size={22} color="#fff" />
                    </Link>
                </div>
                <div className="modalCustom__body mt-5 pt-3">
                    <HistorySearch
                        handleToggle={handleToggle}
                        historySearch={["Áo thun nam", "Áo sơ mi, Quần Jeans"]}
                    />
                    <p className="headerClient__search-history-title">Danh mục nổi bật</p>
                    <div className="headerClient__search-history-category-container">
                        <div className="row">
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/cache/280x280/ts/product/73/91/eb/1f9cbbf16f75dfc883edafbd54f43ffa.jpg" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Áo thun nam ngắn tay không cổ</p>
                                </Link>
                            </div>
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/ts/category/d6/7f/6c/5d53b60efb9448b6a1609c825c29fa40.png" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Giày - Dép nam</p>
                                </Link>
                            </div>
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/cache/280x280/ts/product/72/4f/38/308e496dc4a9f323d4c4b2253a15224e.jpg" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Dép nữ quai ngang</p>
                                </Link>
                            </div>
                            <div className="col">
                                <Link onClick={handleToggle} to="/" className="headerClient__search-history-category h-100">
                                    <img className="headerClient__search-history-category-img" src="https://salt.tikicdn.com/cache/280x280/ts/product/87/6b/f7/be592a2f87a4a5268fff8260957d15d4.png" alt="" />
                                    <p className="headerClient__search-history-category-text mt-2">Áo thun nam dài tay</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalCustom>
            
        </>
    );
}

export default HeaderClientSearch;