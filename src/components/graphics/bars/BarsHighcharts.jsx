import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

function BarHighcharts() {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'All Dishes',
            style: {
                color: '#000000',
                fontSize: '28px'
            }
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Montserrat, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Earing'
            },
            labels: {
                format: '$ {value} USD'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Total Earing: $ {point.y:.1f} USD'
        },
        series: [{
            name: 'All Dishes',
            colorByPoint: true,
            groupPadding: 0,
            data: [
                ["Combo Special's Edwin", 135,],
                ['Empanadas Frias', 23],
                ['Donas', 16],
                ['Tortas Frias', 85],
                ['Tacos de Don Toño', 129],
                ['Pizza', 110],
                ['Enchiladas', 95],
                ['Coca Cola', 130],
                ['Paletas de hielo', 19],
                ['Dulces Luz', 5],
                ['Nieve', 122],
            ]
        }]
    }
    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}

export default BarHighcharts