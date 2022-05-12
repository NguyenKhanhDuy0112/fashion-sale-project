import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

interface Seri {
    name: string,
    data: number[]
}


function DashboardAdProfit() {

    const [series, setSeries] = useState<Seri[]>([])
    const [options, setOptions] = useState({})

    useEffect(() => {
        setSeries([
            {
                name: 'Lợi nhuận',
                data: [31, 40, 28, 51, 42, 35, 43]
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
           
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                categories: ["2013", "2014", "2015", "2016", "2017", "2018", "2019"]
            },
            yaxis: {
                title: {
                    text: 'k (VND)'
                }
            },

        })
    }, [])

    return ( 
        <>
            <div className="dashboardAdmin__general">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <h5 className="mb-0">Tổng lợi nhuận</h5>
                    </div>
                    
                </div>
                {options && series && <Chart series={series} options={options} type="area" height={300} />}
            </div>
        </>
     );
}

export default DashboardAdProfit;