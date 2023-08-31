import { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function LineAmCharts() {
    useLayoutEffect(() => {
        var root = am5.Root.new('chart-line')

        root.setThemes([
            am5themes_Animated.new(root)
        ])

        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                wheelY: 'zoomX',
                layout: root.verticalLayout,
                maxTooltipDistance: 0
            })
        )

        var data = [{
            date: new Date(2023, 0, 1).getTime(),
            value: 100
        }, {
            date: new Date(2023, 0, 2).getTime(),
            value: 320
        }, {
            date: new Date(2023, 0, 3).getTime(),
            value: 270
        }, {
            date: new Date(2023, 0, 4).getTime(),
            value: 150
        }, {
            date: new Date(2023, 0, 5).getTime(),
            value: 156
        }, {
            date: new Date(2023, 0, 6).getTime(),
            value: 199
        }, {
            date: new Date(2023, 0, 7).getTime(),
            value: 114
        }, {
            date: new Date(2023, 0, 8).getTime(),
            value: 320
        }, {
            date: new Date(2023, 0, 9).getTime(),
            value: 90
        }, {
            date: new Date(2023, 0, 10).getTime(),
            value: 300
        }, {
            date: new Date(2023, 0, 11).getTime(),
            value: 150
        }, {
            date: new Date(2023, 0, 12).getTime(),
            value: 320
        }, {
            date: new Date(2023, 0, 13).getTime(),
            value: 185
        }, {
            date: new Date(2023, 0, 14).getTime(),
            value: 100
        }]

        data = data.filter(function (item) {
            return item.date !== null
        })

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                extraTooltipPrecision: 1,
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        )

        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: 'day', count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        )

        xAxis.get('dateFormats')['day'] = 'MM/dd'
        xAxis.get('periodChangeDateFormats')['day'] = 'MMM'

        function createSeries(name, field) {
            var series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: field,
                    valueXField: 'date',
                    tooltip: am5.Tooltip.new(root, {}),
                    connect: false
                })
            )

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: series.get('fill')
                    })
                })
            })

            series.strokes.template.set('strokeWidth', 2)

            series.get('tooltip').label.set('text', '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}')
            series.data.setAll(data)
        }

        createSeries('Series', 'value')

        chart.set('cursor', am5xy.XYCursor.new(root, {
            behavior: 'zoomXY',
            xAxis: xAxis
        }))

        xAxis.set('tooltip', am5.Tooltip.new(root, {
            themeTags: ['axis']
        }))

        yAxis.set('tooltip', am5.Tooltip.new(root, {
            themeTags: ['axis']
        }))

        return () => { }
    }, [])

    return (
        <div id='chart-line' className='w-[100%] h-[300px]'></div>
    )
}

export default LineAmCharts