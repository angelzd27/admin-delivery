import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState, useLayoutEffect } from 'react'
import { socket } from '../../../services/master'
import { data_chart } from '../../../services/master'

function PieHighcharts() {
    const [datasets, setDatasets] = useState([])
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
            data: datasets
        }]
    }

    useEffect(() => {
        const get_pie_data = async () => {
            const data = await data_chart('pie', 'highcharts')
            setDatasets(data)
        }

        get_pie_data()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        socket.on('update-pie', (data) => {
            setDatasets(data.highcharts)
        })

        return () => {
            socket.off('update-pie')
        }
    }, [])

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