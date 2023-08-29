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
        plugins: {
            colors: {
                enabled: true
            }
        }
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
        <>
            <Pie data={data} options={options} />
        </>
    )
}

export default PieChartJS