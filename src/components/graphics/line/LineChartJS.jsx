import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useEffect, useState, useLayoutEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { io } from 'socket.io-client'
import { data_chart } from '../../../services/charts'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, Legend
)

const socket = io('http://127.0.0.1:4003')

function LineChartJS() {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Total Earing'
            },
        },
    }

    const data = {
        labels: labels,
        datasets: datasets
    }

    useEffect(() => {
        const get_line_data = async () => {
            const data = await data_chart('line', 'chartsjs')
            setLabels(data.labels)
            setDatasets(data.datasets)
        }

        get_line_data()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        socket.on('update-line', (data) => {
            setLabels(data.chartsjs.labels)
            setDatasets(data.chartsjs.datasets)
        })

        return () => {
            socket.off('update-line')
        }
    }, [])

    return (
        <div className='w-[90%]'>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChartJS