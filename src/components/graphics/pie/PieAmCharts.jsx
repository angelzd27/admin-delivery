import { useEffect, useLayoutEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { io } from 'socket.io-client'
import { data_chart } from '../../../services/charts'

const socket = io('http://127.0.0.1:4003')

function PieAmCharts() {
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        const get_chart_data = async () => {
            const data = await data_chart('pie', 'amcharts')
            setDatasets(data)
        }

        get_chart_data()

        return () => { }
    }, [])


    useEffect(() => {
        let root = am5.Root.new('chart-pie')

        root.setThemes([
            am5themes_Animated.new(root)
        ])

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.horizontalLayout
            })
        )

        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: 'Series',
                valueField: 'y',
                categoryField: 'name',
                legendLabelText: '[{fill}]{category}[/]',
                legendValueText: '[bold {fill}]{value}[/]'
            })
        )
        series.data.setAll(datasets)
        series.labels.template.set('forceHidden', true)
        series.ticks.template.set('forceHidden', true)

        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerY: am5.percent(50),
                y: am5.percent(50),
                layout: root.verticalLayout
            })
        )

        legend.data.setAll(series.dataItems)

        series.appear(1000)
        chart.appear(1000, 100)

        return () => {
            root.dispose()
        }
    }, [datasets])

    useLayoutEffect(() => {
        socket.on('update-pie', (data) => {
            setDatasets(data.amcharts)
        })

        return () => {
            socket.off('update-pie')
        }
    }, [])

    return (
        <div id='chart-pie' className='w-[90%] h-[300px]'></div>
    )
}

export default PieAmCharts