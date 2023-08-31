import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { BD_ACTION_GET } from '../../../services/master'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Colors
)

function PieChartJS() {
    const [labels, setLabels] = useState([])
    const [dataPie, setDataPie] = useState([])

    useEffect(() => {
        const get_pie_data = async () => {
            const data = await BD_ACTION_GET('chart', 'chart_pie')
            const labels_db = []
            const data_db = []

            data.msg.forEach(product => {
                labels_db.push(product.name)
                data_db.push(product.y)
            })

            setLabels(labels_db)
            setDataPie(data_db)
        }

        get_pie_data()

        return () => { }
    }, [])

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Top 10 Better Dishes'
            },
            colors: {
                enabled: true
            }
        },
    }

    const data = {
        labels: labels,
        datasets: [
            {
                id: 1,
                label: 'Top Dishes',
                data: dataPie,
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
            }
        ]
    }

    return (
        <div className='w-[50%]'>
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChartJS