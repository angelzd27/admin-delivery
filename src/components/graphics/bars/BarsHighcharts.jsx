import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useLayoutEffect, useState } from 'react'
import { data_chart } from '../../../services/charts'
import { io } from 'socket.io-client'

const socket = io('http://127.0.0.1:4003')

function BarHighcharts() {
    const [datasets, setDatasets] = useState([])
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
            data: datasets
        }]
    }

    useEffect(() => {
        const bar_highcharts = async () => {
            const data = await data_chart('column', 'highcharts')
            setDatasets(data)
        }

        bar_highcharts()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        socket.on('update-column', (data) => {
            setDatasets(data.highcharts)
        })

        return () => {
            socket.off('update-column')
        }
    }, [])

    return (
        <>
            <div className='w-[100%]'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </>
    )
}

export default BarHighcharts