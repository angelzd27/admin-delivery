import { useEffect, useLayoutEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import { BD_ACTION_GET } from '../../../services/master'

function PieAmCharts() {
    const [dataPie, setDataPie] = useState([])

    useEffect(() => {
        const get_pie_data = async () => {
            const data = await BD_ACTION_GET('chart', 'chart_pie')
            setDataPie(data.msg)
            console.log(data.msg)
        }

        get_pie_data()

        return () => { }
    }, [])

    useLayoutEffect(() => {
        const create_pie_chart = () => {
            let root = am5.Root.new('pie-chart')

            root.setThemes([
                am5themes_Animated.new(root)
            ])

            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    endAngle: 270
                })
            )

            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: 'y',
                    categoryField: 'name',
                    endAngle: 270
                })
            )

            series.states.create('hidden', {
                endAngle: -90
            })

            let data = [
                {
                    name: "Lithuania",
                    y: 501.9
                },
                {
                    name: "Czechia",
                    y: 301.9
                },
                {
                    name: "Ireland",
                    y: 201.1
                },
                {
                    name: "Germany",
                    y: 165.8
                },
                {
                    name: "Australia",
                    y: 139.9
                },
                {
                    name: "Austria",
                    y: 128.3
                },
                {
                    name: "UK",
                    y: 99
                }
            ];

            series.data.setAll(data)
            series.appear(1000, 100)
        }

        create_pie_chart()

        return () => { }
    }, [dataPie])

    // useLayoutEffect(() => {
    //     let root = am5.Root.new('chart-pie')

    //     root.setThemes([
    //         am5themes_Animated.new(root)
    //     ])

    //     let chart = root.container.children.push(
    //         am5percent.PieChart.new(root, {
    //             layout: root.verticalLayout
    //         })
    //     )

    //     let data = [
    //         {
    //             name: "Combo Special's Edwin",
    //             y: 100
    //         },
    //         {
    //             name: "Empanadas",
    //             y: 25
    //         },
    //         {
    //             name: "Donas",
    //             y: 19
    //         },
    //         {
    //             name: "Tortas Frías",
    //             y: 64
    //         },
    //         {
    //             name: "Tacos Don Toño",
    //             y: 98
    //         },
    //         {
    //             name: "Pizza",
    //             y: 88
    //         },
    //         {
    //             name: "Enchiladas",
    //             y: 81
    //         }
    //     ]

    //     const series = chart.series.push(
    //         am5percent.PieSeries.new(root, {
    //             name: "Products",
    //             categoryField: "name",
    //             valueField: "y"
    //         })
    //     )

    //     series.data.setAll(data)

    //     let legend = chart.children.push(am5.Legend.new(root, {
    //         centerX: am5.percent(50),
    //         x: am5.percent(50),
    //         layout: root.horizontalLayout
    //     }))

    //     legend.data.setAll(series.dataItems)
    // }, [])

    return (
        <div id='pie-chart' className='w-[100%] h-[300px]'></div>
    )
}

export default PieAmCharts