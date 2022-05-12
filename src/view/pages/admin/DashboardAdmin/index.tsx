import DashboardAdGeneral from "./DashboardAdGeneral";
import DashboardAdProfit from "./DashboardAdProfit";
import DashboardAdSale from "./DashboardAdSale";
import DashboardAdTodayRevenue from "./DashboardAdTodayReneue";

function DashboardAdmin() {
  
  return (
    <article>
      <h5 className="title-admin mb-0">Trang chủ</h5>
      <DashboardAdGeneral />
      <DashboardAdTodayRevenue />

      <div className="row g-4 row-cols-lg-2 row-cols-1">
        <div className="col">
          <DashboardAdProfit />
        </div>
        <div className="col">
          <DashboardAdSale />
        </div>
      </div>
    </article>
  );
}

export default DashboardAdmin;