import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

interface Seri {
    name: string,
    data: number[]
}

function DashboardAdSale() {

    const [series, setSeries] = useState<Seri[]>([])
    const [options, setOptions] = useState({})

    useEffect(() => {
        setSeries([
            {
                name: 'Doanh thu',
                data: [200, 250, 400, 250, 387, 430, 350]
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
            colors: ["#76E474"],
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                categories: ["2013", "2014", "2015", "2016", "2017", "2018", "2019"]
            },
            yaxis: {
                title: {
                    text: 'K (VND)'
                }
            },

        })
    }, [])

    return (
        <div className="dashboardAdmin__general">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h5 className="mb-0">Tổng doanh thu</h5>
                </div>

            </div>
            {options && series && <Chart series={series} options={options} type="area" height={300} />}
        </div>
    );
}

export default DashboardAdSale;