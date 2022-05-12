import { AiOutlineGift } from "react-icons/ai";
import {} from "react-icons"
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa"
import { FiUsers } from "react-icons/fi";


function DashboardAdGeneral() {


    return (
        <>
            <div className="row row-cols-xl-4 row-cols-md-2 row-cols-1 g-4" style={{marginBottom: "1.5rem"}}>
                <div className="col">
                    <div className="dashboardAdmin__general d-flex justify-content-between align-items-center">
                        <div className="dashboardAdmin__general-data">
                            <p className="dashboardAdmin__general-data-text mb-2">Tổng sản phẩm</p>
                            <h3 className="dashboardAdmin__general-data-number">429</h3>
                        </div>
                        <span className="dashboardAdmin__general-icon" style={{backgroundColor: "#C3DDFD", color: "#4582F5"}}>
                            <AiOutlineGift size={30} />
                        </span>
                    </div>
                </div>
                <div className="col">
                    <div className="dashboardAdmin__general d-flex justify-content-between align-items-center">
                        <div className="dashboardAdmin__general-data">
                            <p className="dashboardAdmin__general-data-text mb-2">Tổng doanh thu</p>
                            <h3 className="dashboardAdmin__general-data-number">$87,561</h3>
                        </div>
                        <span className="dashboardAdmin__general-icon" style={{backgroundColor: "#FFF59C", color:" #FFD52F"}}>
                            <MdOutlineAttachMoney size={30} />
                        </span>
                    </div>
                </div>
                <div className="col">
                    <div className="dashboardAdmin__general d-flex justify-content-between align-items-center">
                        <div className="dashboardAdmin__general-data">
                            <p className="dashboardAdmin__general-data-text mb-2">Tổng đặt hàng</p>
                            <h3 className="dashboardAdmin__general-data-number">247</h3>
                        </div>
                        <span className="dashboardAdmin__general-icon" style={{backgroundColor: "#AFECEF",color: "#047481"}}>
                            <FaShippingFast size={30} />
                        </span>
                    </div>
                </div>
                <div className="col">
                    <div className="dashboardAdmin__general d-flex justify-content-between align-items-center">
                        <div className="dashboardAdmin__general-data">
                            <p className="dashboardAdmin__general-data-text mb-2">Tổng khách hàng</p>
                            <h3 className="dashboardAdmin__general-data-number">872</h3>
                        </div>
                        <span className="dashboardAdmin__general-icon" style={{backgroundColor: "#FCD9BD", color: "#D03801"}}>
                            <FiUsers size={30} />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardAdGeneral;