import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { useEffect, useState, useLayoutEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { data_chart } from '../../../services/master'
import { socket } from '../../../services/master'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Colors
)

function PieChartJS() {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        const get_pie_data = async () => {
            const data = await data_chart('pie', 'chartjs')
            setLabels(data.labels)
            setDatasets(data.datasets)
        }

        get_pie_data()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        socket.on('update-pie', (data) => {
            setLabels(data.chartjs.labels)
            setDatasets(data.chartjs.datasets)
        })

        return () => {
            socket.off('update-pie')
        }
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
            },
            legend: {
                display: true,
                position: "left",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            }
        },
    }

    const data = {
        labels: labels,
        datasets: datasets
    }

    return (
        <div className='w-[80%] flex items-center justify-center'>
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChartJS