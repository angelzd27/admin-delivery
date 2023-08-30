import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Colors
)

function PieChartJS() {
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
        labels: ["Combo Special's Edwin", "Empanadas", "Donas", "Tortas Frías", "Tacos Don Toño", "Pizza", "Enchiladas"],
        datasets: [
            {
                id: 1,
                label: 'Top Dishes',
                data: [100, 25, 19, 64, 98, 88, 81],
                hoverOffset: 4
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