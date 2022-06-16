import { AiOutlineGift } from "react-icons/ai";
import {} from "react-icons"
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa"
import { FiUsers } from "react-icons/fi";
import productsService from "../../../../services/productService";
import { useEffect, useState } from "react";
import { Bill, Product } from "../../../../shared/interfaces";
import usersService from "../../../../services/usersService";
import { User } from "firebase/auth";
import billsService from "../../../../services/billsService";
import { formatCashVND } from "../../../../shared/helpers";

interface DashboardAdGeneralProps{
    totalRevenue: number
}
function DashboardAdGeneral(props: DashboardAdGeneralProps) {
    const { totalRevenue } = props
    const [products, setProducts] = useState<Product[]>([])
    const [customers, setCustomers] = useState<User[]>([])
    const [billExports, setBillExports] = useState<Bill[]>([])

    useEffect(() => {
        handleLoadCustomers()
        handleLoadProduct()
        handleLoadExports()
    })

    const handleLoadProduct = () => {
        productsService.list().then(res => setProducts(res.data))
    }

    const handleLoadCustomers = () => {
        usersService.findCustomers().then(res => setCustomers(res.data))
    }

    const handleLoadExports = () => {
        billsService.findBillExports().then(res => setBillExports(res.data)) 
    }

    return (
        <>
            <div className="row row-cols-xl-4 row-cols-md-2 row-cols-1 g-4" style={{marginBottom: "1.5rem"}}>
                <div className="col">
                    <div className="dashboardAdmin__general d-flex justify-content-between align-items-center">
                        <div className="dashboardAdmin__general-data">
                            <p className="dashboardAdmin__general-data-text mb-2">Tổng sản phẩm</p>
                            <h3 className="dashboardAdmin__general-data-number">{products.length}</h3>
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
                            <h3 className="dashboardAdmin__general-data-number">{formatCashVND(totalRevenue+"", ".")}</h3>
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
                            <h3 className="dashboardAdmin__general-data-number">{billExports.length}</h3>
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
                            <h3 className="dashboardAdmin__general-data-number">{customers.length}</h3>
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