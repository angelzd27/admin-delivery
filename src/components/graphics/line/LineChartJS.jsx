import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, Legend
)

function LineChartJS() {
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                id: 1,
                label: 'Earing',
                data: [65, 59, 80, 81, 56, 55, 40, 27, 37, 28, 19, 29],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    return (
        <div className='w-[90%]'>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChartJS