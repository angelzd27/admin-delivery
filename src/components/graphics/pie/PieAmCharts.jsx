import { useEffect, useLayoutEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import { BD_ACTION_GET } from '../../../services/master'

function PieAmCharts() {
    // const [dataPie, setDataPie] = useState([])

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
        let root = am5.Root.new("chart-pie");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.horizontalLayout
            })
        );

        // Define data
        let data = [{
            country: "France",
            sales: 100000
        }, {
            country: "Spain",
            sales: 160000
        }, {
            country: "United Kingdom",
            sales: 80000
        }, {
            country: "Netherlands",
            sales: 90000
        }, {
            country: "Portugal",
            sales: 25000
        }, {
            country: "Germany",
            sales: 70000
        }, {
            country: "Austria",
            sales: 75000
        }, {
            country: "Belgium",
            sales: 40000
        }, {
            country: "Poland",
            sales: 60000
        }];

        // Create series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "sales",
                categoryField: "country",
                legendLabelText: "[{fill}]{category}[/]",
                legendValueText: "[bold {fill}]{value}[/]"
            })
        );
        series.data.setAll(data);
        series.labels.template.set("forceHidden", true);
        series.ticks.template.set("forceHidden", true);

        // Add legend
        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerY: am5.percent(50),
                y: am5.percent(50),
                layout: root.verticalLayout
            })
        );

        legend.data.setAll(series.dataItems);
    }, [])

    return (
        <div id='chart-pie' className='w-[90%] h-[300px]'></div>
    )
}

export default PieAmCharts