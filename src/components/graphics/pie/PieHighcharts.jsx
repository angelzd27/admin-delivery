import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

function PieHighcharts() {
    const options = {
        title: {
            text: 'Top Popularity Dishes',
            style: {
                color: '#000000',
                fontSize: '28px'
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            zoomType: ''
        },
        tooltip: {
            pointFormat: 'Popularity: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: "Combo Special's Edwin",
                    y: 100,
                }, {
                    name: 'Empanadas',
                    y: 25
                }, {
                    name: 'Donas',
                    y: 19
                }, {
                    name: 'Tortas Frias',
                    y: 64
                }, {
                    name: 'Tacos de Don Toño',
                    y: 98
                }, {
                    name: 'Pizza',
                    y: 88
                }, {
                    name: 'Enchiladas',
                    y: 81
                },
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

export default PieHighcharts