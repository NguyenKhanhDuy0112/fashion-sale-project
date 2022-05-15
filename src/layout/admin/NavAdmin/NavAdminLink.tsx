import LinkAdmin from "../../../shared/components/LinkAdmin";
import { MdDashboard } from "react-icons/md"
import { AiOutlineBars, AiOutlineGift } from "react-icons/ai";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCompass, BiImport } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { ImUserTie } from "react-icons/im"
import useToggleNav from "../../../shared/hooks/useToggleNav";
import { BsBarChart } from "react-icons/bs";

function NavAdminLink() {
    const isToggleNav = useToggleNav()

    return (
        <ul>
            <LinkAdmin to="/admin/dashboard">
                <span className="linkAdmin__item-icon">
                    <MdDashboard size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Trang chủ</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/categories">
                <span className="linkAdmin__item-icon">
                    <AiOutlineBars size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Danh mục</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/products">
                <span className="linkAdmin__item-icon">
                    <RiShoppingBag3Line size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Sản phẩm</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/orders">
                <span className="linkAdmin__item-icon">
                    <BiCompass size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Đặt hàng</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/imports">
                <span className="linkAdmin__item-icon">
                    <BiImport size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Nhập hàng</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/customers">
                <span className="linkAdmin__item-icon">
                    <FiUsers size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Khách hàng</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/providers">
                <span className="linkAdmin__item-icon">
                    <ImUserTie size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Nhà cung cấp</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/coupons">
                <span className="linkAdmin__item-icon">
                    <AiOutlineGift size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Mã giảm giá</span>
            </LinkAdmin>
            <LinkAdmin to="/admin/statistical">
                <span className="linkAdmin__item-icon">
                    <BsBarChart size = {20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Thống kê</span>
            </LinkAdmin>
            {/* <LinkAdmin to="/admin/setting">
                <span className="linkAdmin__item-icon">
                    <FiSettings size={20} />
                </span>
                <span className={`linkAdmin__item-text ${isToggleNav ? 'active' : ''}`}>Cài đặt</span>
            </LinkAdmin> */}
        </ul>
    );
}

export default NavAdminLink;