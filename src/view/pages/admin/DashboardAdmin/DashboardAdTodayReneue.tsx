import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

interface Seri {
    name: string,
    data: number[]
}

function DashboardAdTodayRevenue() {
    const [series, setSeries] = useState<Seri[]>([])
    const [options, setOptions] = useState({})

    useEffect(() => {
        setSeries([
            {
                name: 'Lợi nhuận',
                data: [31, 40, 28, 51, 42, 109, 100]
            }
        ])
    }, [])

    useEffect(() => {
        setOptions({
            chart: {
                type: 'area',
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                }
            },
            colors: ["#EA6A12"],
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                categories: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
            },
            yaxis: {
                title: {
                    text: 'K (VND)'
                }
            },

        })
    }, [])

    return (
        <>
            <div className="dashboardAdmin__general" style = {{marginBottom: "1.5rem"}}>
                <div className="row g-4 row-cols-lg-2 row-cols-1 justify-content-between align-items-center mb-2">
                    <div className="col">
                        <h5 className="mb-0">Doanh thu hôm nay</h5>
                        <small className="dashboardAdmin__general-data-text"></small>
                    </div>
                    <div className="col text-lg-end text-start">
                        <h4 className="mb-0">$240.45</h4>
                        <small className="dashboardAdmin__general-data-text"><strong style={{color:"#76E474"}}>0.5%</strong> so với ngày trước</small>
                    </div>
                </div>
                {options && series && <Chart series={series} options={options} type="area" height={300} />}
            </div>
        </>
    );
}

export default DashboardAdTodayRevenue;