import { IoCloseSharp } from "react-icons/io5";
import ModalCustom from "../../../shared/components/ModalCustom";
import NavCategoryPane from "./NavCategoryPane";

interface NavCateModal{
    show: boolean,
    handleToggle: () => void
}

function NavCategoryModal(props: NavCateModal) {
    const { show, handleToggle } = props

    return ( 
        <ModalCustom position="bottom" className="navCategoryModal" show = {show} onHandleShow = {handleToggle}>
            <div className="navCategoryModal__container">
                <div className="navCategoryModal__header">
                    <div className="position-relative h-100 d-flex align-items-center justify-content-center">
                        <span onClick={handleToggle} className="navCategoryModal__header-icon"><IoCloseSharp size={25}/></span>
                        <p className="mb-0 navCategoryModal__header-text text-center">Danh Mục Sản Phẩm</p>
                    </div>
                </div>
                <div className="navCategoryModal__body d-flex">
                    <ul className="navCategoryModal__list">
                        <li className="navCategoryModal__list-item active">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/upload/4c/bb/aa/277463c4bae6a03a6c22b4b3d243c58c.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Gợi ý cho bạn</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/55/5b/80/48cbaafe144c25d5065786ecace86d38.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Thời trang nữ</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Thời trang nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/31/a7/94/6524d2ecbec216816d91b6066452e3f2.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nữ</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/d6/7f/6c/5d53b60efb9448b6a1609c825c29fa40.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Giày - Dép Nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/9b/31/af/669e6a133118e5439d6c175e27c1f963.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/9b/31/af/669e6a133118e5439d6c175e27c1f963.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/9b/31/af/669e6a133118e5439d6c175e27c1f963.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/9b/31/af/669e6a133118e5439d6c175e27c1f963.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/9b/31/af/669e6a133118e5439d6c175e27c1f963.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nam</span>
                        </li>
                        <li className="navCategoryModal__list-item">
                            <img className="navCategoryModal__list-item-img" src = "https://salt.tikicdn.com/ts/category/9b/31/af/669e6a133118e5439d6c175e27c1f963.png" alt = ""/>
                            <span className="navCategoryModal__list-item-text">Túi thời trang nam</span>
                        </li>
                    </ul>
                    <NavCategoryPane/>
                </div>
            </div>
        </ModalCustom>
     );
}

export default NavCategoryModal;