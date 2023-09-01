import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState, useLayoutEffect } from 'react'
import { io } from 'socket.io-client'
import { data_chart } from '../../../services/charts'

const socket = io('http://127.0.0.1:4003')

function LineHighcharts() {
    const [categories, setCategories] = useState([])
    const [datasets, setDatasets] = useState([])
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
            categories: categories,
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'Earling $USD'
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
        series: datasets
    }

    useEffect(() => {
        const line_highcharts = async () => {
            const data = await data_chart('line', 'highcharts')
            setCategories(data.categories)
            setDatasets(data.data)
        }

        line_highcharts()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        socket.on('update-line', (data) => {
            setCategories(data.highcharts.categories)
            setDatasets(data.highcharts.data)
        })

        return () => {
            socket.off('update-line')
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

export default LineHighcharts