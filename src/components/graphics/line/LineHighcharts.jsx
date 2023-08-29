import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

function LineHighcharts() {
    const options = {
        title: {
            text: 'Total Earing',
            style: {
                color: '#000000',
                fontSize: '28px'
            }
        },
        chart: {
            type: 'spline'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'Earling'
            },
            labels: {
                format: '$ {value} USD'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: '$ {point.y} USD in {categories.x}'
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineWidth: 1
                }
            }
        },
        series: [
            {
                name: 'Total',
                marker: {
                    symbol: 'diamond'
                },
                data: [5, 2.99, 13, 8, 8.55, 4.23, 3, 7, 1, 4, 2, 1]
            }
        ]
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

export default LineHighcharts