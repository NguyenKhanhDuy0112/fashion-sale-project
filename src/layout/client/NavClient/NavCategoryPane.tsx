import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function NavCategoryPane() {
    return ( 
        <div className="navCategoryPane">
            <Link to = "/" className="navCategoryPane__title d-flex justify-content-between align-items-center">
                <span className = "navCategoryPane__title-text">Thời trang nữ</span>
                <span className="navCategoryPane__title-icon">
                    <IoIosArrowForward size={22}/>
                </span>
            </Link>
            <div className="navCategoryPane__cont">

            </div>
        </div>
     );
}

export default NavCategoryPane;