import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function BarsChartJS() {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'All Dishes'
            },
        },
    }

    const data = {
        labels: ["Combo Special's Edwin", 'Empanadas Frias', 'Donas', 'Tortas Frias', 'Tacos de Don Toño', 'Pizza', 'Enchiladas', 'Coca Cola', 'Paletas de hielo', 'Dulces Luz', 'Nieve'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [135, 23, 16, 85, 129, 110, 95, 130, 19, 5, 122],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    return (
        <div className='w-[80%]'>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarsChartJS