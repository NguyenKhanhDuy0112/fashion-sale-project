import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation()
    const path = location.pathname.split('/').filter(item => item !== "")

    return (
        <article className="breadcrumbCustom py-2">
            <ul className="breadcrumbCustom__list align-items-center">
                <li className="breadcrumbCustom__list-item">
                    <Link to="/" className="breadcrumbCustom__list-item-link">Trang chủ</Link>
                </li>
                <li className="breadcrumbCustom__list-item mx-1">
                    <span className="breadcrumbCustom__list-item-link">
                        <IoIosArrowForward />
                    </span>
                </li>
                {path.map((link, index) => {
                    return index % 2 === 0 && link !== "" ?
                        (
                            <li key={index} className="breadcrumbCustom__list-item">
                                <Link
                                    className={`breadcrumbCustom__list-item-link ${index === path.length - 1 ? 'active' : ''}`} to={`/${link}`}
                                >
                                    {link.replaceAll('-', ' ')}
                                </Link>
                            </li>
                        )
                        :
                        (
                            <li key={index} className="">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                        )
                })}

            </ul>
        </article>
    );
}

export default Breadcrumb;