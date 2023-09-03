import { useEffect, useLayoutEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { io } from 'socket.io-client'
import { data_chart } from '../../../services/charts'

const socket = io('http://127.0.0.1:4003')

function BarsAmCharts() {
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        const set_data = async () => {
            const data = await data_chart('column', 'amcharts')
            setDatasets(data)
        }

        set_data()
        return () => { }
    }, [])

    useEffect(() => {
        let root = am5.Root.new('chart-bar')

        root.setThemes([
            am5themes_Animated.new(root)
        ])

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: 'panX',
            wheelY: 'zoomX',
            pinchZoomX: true
        }))

        let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
        cursor.lineY.set('visible', false)

        let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
        xRenderer.labels.template.setAll({
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        })

        xRenderer.grid.template.setAll({
            location: 1
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: 'name',
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }))

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }))

        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: 'Series 1',
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: 'amount',
            sequencedInterpolation: true,
            categoryXField: 'name',
            tooltip: am5.Tooltip.new(root, {
                labelText: '{valueY}'
            })
        }))

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 })
        series.columns.template.adapters.add('fill', function (fill, target) {
            return chart.get('colors').getIndex(series.columns.indexOf(target))
        })

        series.columns.template.adapters.add('stroke', function (stroke, target) {
            return chart.get('colors').getIndex(series.columns.indexOf(target))
        })

        xAxis.data.setAll(datasets)
        series.data.setAll(datasets)

        series.appear(1000)
        chart.appear(1000, 100)

        return () => {
            root.dispose()
        }
    }, [datasets])

    useLayoutEffect(() => {
        socket.on('update-column', (data) => {
            setDatasets(data.amcharts)
            console.log(data)
        })

        return () => {
            socket.off('update-column')
        }
    }, [])

    return (
        <div id='chart-bar' className='w-[90%] h-[500px]'></div>
    )
}

export default BarsAmCharts