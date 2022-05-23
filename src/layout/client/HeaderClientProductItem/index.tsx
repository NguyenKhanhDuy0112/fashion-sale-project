import { useEffect, useState } from "react"
import { BiCategory } from "react-icons/bi"
import { FaRegUser } from "react-icons/fa"
import { FiHeart, FiMoreHorizontal, FiShoppingCart } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"
import { RiHome2Line } from "react-icons/ri"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

function HeaderClientProductItem() {
    const [scroll, setScroll] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll: EventListener = (e: Event) => {
            const window = e.currentTarget as Window
            setScroll(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scroll])

    return (
        <header
            style={{
                backgroundColor: `${scroll <= 200 ? `rgba(255,255,255,${scroll / 200})` : `rgb(255,255,255)`}`,
                borderBottom: `1px solid ${scroll <= 200 ? `rgba(239,239,239,${scroll / 200})` : `rgb(239,239,239)`}`
            }}
            className="headerClient__product d-flex justify-content-between align-items-center px-3"
        >

            <div className="headerClient__product-left">
                <span
                    onClick={() => navigate(-1)}
                    className={`headerClient__product-btn ${scroll <= 100 ? '' : 'active'}`}
                >
                    <IoIosArrowBack size={30} />
                </span>
            </div>

            <div className="headerClient__product-right d-flex align-items-center">
                <span
                    className={`headerClient__product-btn ${scroll <= 100 ? '' : 'active'} me-2`}
                >
                    <FiShoppingCart size={21} />
                </span>
                <div className="position-relative">
                    <span
                        onClick={() => setShowMore(!showMore)}
                        className={`headerClient__product-btn ${scroll <= 100 ? '' : 'active'}`}
                    >
                        <FiMoreHorizontal size={25} />
                    </span>
                    <div className={`headerClient__product-more ${showMore ? 'active' : ''}`}>
                        <ul className="headerClient__product-more-list">
                            <li className="headerClient__product-more-item">
                                <Link to="/" className="headerClient__product-more-item-link">
                                    <span className="headerClient__product-more-item-link-icon">
                                        <RiHome2Line size={25}/>
                                    </span>
                                    <span className="headerClient__product-more-item-link-text">
                                        Trở về trang chủ
                                    </span>
                                </Link>
                            </li>
                            <li className="headerClient__product-more-item">
                                <Link to="" className="headerClient__product-more-item-link">
                                    <span className="headerClient__product-more-item-link-icon">
                                        <BiCategory size={25}/>
                                    </span>
                                    <span className="headerClient__product-more-item-link-text">
                                        Danh mục sản phẩm
                                    </span>
                                </Link>
                            </li>
                            <li className="headerClient__product-more-item">
                                <Link to="" className="headerClient__product-more-item-link">
                                    <span className="headerClient__product-more-item-link-icon">
                                        <FaRegUser size={25}/>
                                    </span>
                                    <span className="headerClient__product-more-item-link-text">
                                        Cá nhân
                                    </span>
                                </Link>
                            </li>
                            <li className="headerClient__product-more-item">
                                <Link to="" className="headerClient__product-more-item-link">
                                    <span className="headerClient__product-more-item-link-icon">
                                        <FiHeart size={25}/>
                                    </span>
                                    <span className="headerClient__product-more-item-link-text">
                                        Yêu thích
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default HeaderClientProductItem;