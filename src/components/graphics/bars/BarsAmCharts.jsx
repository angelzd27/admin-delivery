import { useLayoutEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

function BarsAmCharts() {
    useLayoutEffect(() => {
        am4core.useTheme(am4themes_animated)

        let chart = am4core.create('chart-bar', am4charts.XYChart)

        chart.data = [
            {
                product: "Combo Special's Edwin",
                total: 135,
            },
            {
                product: 'Empanadas Frias',
                total: 23
            },
            {
                product: 'Donas',
                total: 16
            },
            {
                product: 'Tortas Frias',
                total: 85
            },
            {
                product: 'Tacos de Don Toño',
                total: 129
            },
            {
                product: 'Pizza',
                total: 110
            },
            {
                product: 'Enchiladas',
                total: 95
            },
            {
                product: 'Coca Cola',
                total: 130
            },
            {
                product: 'Paletas de hielo',
                total: 19
            },
            {
                product: 'Dulces Luz',
                total: 5
            },
            {
                product: 'Nieve',
                total: 122
            },
        ]

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'product'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 30

        categoryAxis.renderer.labels.template.adapter.add('dy', function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25
            }
            return dy
        })

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = 'total'
        series.dataFields.categoryX = 'product'
        series.name = 'total'
        series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
        series.columns.template.fillOpacity = .8

        let columnTemplate = series.columns.template
        columnTemplate.strokeWidth = 2
        columnTemplate.strokeOpacity = 1
        return () => { }
    }, [])
    return (
        <div id='chart-bar' className='w-[100%] h-[300px]'></div>
    )
}

export default BarsAmCharts