import { useEffect, useLayoutEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { socket } from '../../../services/master'
import { data_chart } from '../../../services/master'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)


function BarsChartJS() {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        const get_bar_data = async () => {
            const data = await data_chart('column', 'chartsjs')
            setLabels(data.labels)
            setDatasets(data.datasets)
        }

        get_bar_data()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        socket.on('update-column', (data) => {
            setLabels(data.chartsjs.labels)
            setDatasets(data.chartsjs.datasets)
        })

        return () => {
            socket.off('update-column')
        }
    }, [])

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'All Order Dishes'
            },
        },
    }

    const data = {
        labels: labels,
        datasets: datasets
    };

    return (
        <div className='w-[80%]'>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarsChartJS