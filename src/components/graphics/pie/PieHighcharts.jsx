import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { BD_ACTION_GET } from '../../../services/master'

function PieHighcharts() {
    const [dataPie, setDataPie] = useState([])

    useEffect(() => {
        const get_pie_data = async () => {
            const data = await BD_ACTION_GET('chart', 'chart_pie')
            setDataPie(data.msg)
        }

        get_pie_data()

        return () => { }
    }, [])

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
            data: dataPie
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