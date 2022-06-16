import { useEffect, useState } from "react";
import billsService from "../../../../services/billsService";
import DashboardAdGeneral from "./DashboardAdGeneral";
import DashboardAdProfit from "./DashboardAdProfit";
import DashboardAdSale from "./DashboardAdSale";
import DashboardAdTodayRevenue from "./DashboardAdTodayReneue";

function DashboardAdmin() {
  const [statistical, setStatistical] = useState<any>()
  const [revenueDaily, setRevenueDaily] = useState<any>()

  useEffect(() => {
    handleLoadStatictical()
    handleLoadRevenueDaily()
  },[])

  const handleLoadStatictical = async () => {
    const statistic = await billsService.getStatistical()
    setStatistical(statistic)
  }


  const handleLoadRevenueDaily = async () => {
    const data = await billsService.getStatisticalRevenueDay()
    setRevenueDaily(data.data)
  }


  return (
    <article>
      <h5 className="title-admin mb-0">Trang chủ</h5>
      <DashboardAdGeneral totalRevenue={statistical ?  statistical.dataTotalRevenueByYears.reduce((prev:number , cur: any) => prev + cur.total, 0) : 0}/>
      <DashboardAdTodayRevenue data = {revenueDaily}/>

      <div className="row g-4 row-cols-lg-2 row-cols-1">
        <div className="col">
          <DashboardAdProfit data = {statistical?.dataTotalProfit}/>
        </div>
        <div className="col">
          <DashboardAdSale data = {statistical?.dataTotalRevenueByYears}/>
        </div>
      </div>
    </article>
  );
}

export default DashboardAdmin;