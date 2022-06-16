import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

interface Seri {
    name: string,
    data: number[]
}

interface DashboardAdTodayRevenueProps{
    data: any
}

function DashboardAdTodayRevenue(props: DashboardAdTodayRevenueProps) {
    const {data } = props
    const [series, setSeries] = useState<Seri[]>([])
    const [options, setOptions] = useState({})

    useEffect(() => {
        setSeries([
            {
                name: 'Lợi nhuận',
                data: data ? data.map((sta:any) => sta.total) : []
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
                categories: data ? data.map((sta: any) => `${sta.hour}h`) : []
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
                        <h4 className="mb-0">{data ? data.reduce((prev: number, cur:any) => (prev + cur.total), 0) : 0}</h4>
                    </div>
                </div>
                {options && series && <Chart series={series} options={options} type="area" height={300} />}
            </div>
        </>
    );
}

export default DashboardAdTodayRevenue;