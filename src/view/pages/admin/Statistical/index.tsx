import { useState } from "react";
import ImportExportStore from "./ImportExportStore";
import StoreNotAllow from "./StoreNotAllow";

function StatisticalAdmin() {
    const [tab, setTab] = useState<string>('import-export')

    return (
        <>
            <div className="dashboard__container">
                <div className="d-flex dashboard__container-child">
                    <h6
                        className={`dashboard__title-tab mb-0 h-100 ${tab === "import-export" ? "active" : ""}`}
                        onClick={() => setTab('import-export')}
                    >
                        Xuất - Nhập - Tồn
                    </h6>

                    <h6
                        className={`dashboard__title-tab mb-0 h-100 ${tab === "store" ? "active" : ""}`}
                        onClick={() => setTab('store')}
                    >
                        Tồn dưới định mức
                    </h6>
                </div>
                <div className="dashboard__body pt-3">
                    {tab === "import-export" && <ImportExportStore />}
                    {tab === "store" && <StoreNotAllow />}
                </div>
            </div>
            
        </>
    );
}

export default StatisticalAdmin;