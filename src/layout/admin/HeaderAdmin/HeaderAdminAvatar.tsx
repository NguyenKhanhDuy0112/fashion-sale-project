import { Dropdown } from "react-bootstrap";
import { FiLogOut, FiUser } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai"
import useCurrentUser from "../../../shared/hooks/useCurrentUser"


function HeaderAdminAvatar() {
    const currentUser = useCurrentUser()
    return (
        <Dropdown className="headerAdmin__avatar">
            <Dropdown.Toggle className="headerAdmin__avatar-btn">
                <span className = "headerAdmin__avatar-btn-child">
                    <img 
                        className="headerAdmin__avatar-btn-img img-fluid rounded rounded-circle" 
                        src={currentUser.avatar}
                        alt="" 
                    />
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="headerAdmin__avatar-menu">
                <Dropdown.Item className="headerAdmin__avatar-menu-item py-2 d-flex align-items-center" href="#/action-1">
                    <span className="me-2"><FiUser color="#FC7048" size={20} /></span>
                    <span >Hồ sơ</span>
                </Dropdown.Item>
                <Dropdown.Item className="headerAdmin__avatar-menu-item py-2 d-flex align-items-center" href="#/action-2">
                    <span className="me-2"><AiOutlineSetting size={20} color="#68E365" /></span>
                    <span>Cài đặt</span>
                </Dropdown.Item>
                <Dropdown.Item className="headerAdmin__avatar-menu-item py-2 d-flex align-items-center" href="#/action-2">
                    <span className="me-2"><FiLogOut size={20} color="#F72B50" /></span>
                    <span>Đăng xuất</span>
                </Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    );
}

export default HeaderAdminAvatar;