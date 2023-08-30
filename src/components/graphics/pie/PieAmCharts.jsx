import { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function PieAmCharts() {
    useLayoutEffect(() => {
        let root = am5.Root.new('chart-pie')

        root.setThemes([
            am5themes_Animated.new(root)
        ])

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            })
        )

        let data = [
            {
                product: "Combo Special's Edwin",
                total: 100
            },
            {
                product: "Empanadas",
                total: 25
            },
            {
                product: "Donas",
                total: 19
            },
            {
                product: "Tortas Frías",
                total: 64
            },
            {
                product: "Tacos Don Toño",
                total: 98
            },
            {
                product: "Pizza",
                total: 88
            },
            {
                product: "Enchiladas",
                total: 81
            }
        ]

        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Products",
                categoryField: "product",
                valueField: "total"
            })
        )

        series.data.setAll(data)

        let legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.horizontalLayout
        }))

        legend.data.setAll(series.dataItems)
    }, [])

    return (
        <div id='chart-pie' className='w-[100%] h-[300px]'></div>
    )
}

export default PieAmCharts