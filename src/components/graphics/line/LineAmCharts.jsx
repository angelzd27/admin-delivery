import { useEffect, useLayoutEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { socket } from '../../../services/master'
import { data_chart } from '../../../services/master'

function LineAmCharts() {
    const [datasets, setDatasets] = useState([])
    const [years, setYears] = useState([])

    useEffect(() => {
        const get_data = async () => {
            const data = await data_chart('line', 'amcharts')
            setDatasets(data.data)
            setYears(data.anios)
            console.log(data.data)
        }

        get_data()

        return () => { }

    }, [])


    useEffect(() => {
        let root = am5.Root.new("chart-line");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
        }));

        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        let xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(datasets);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));

        function makeSeries(name, fieldName) {
            let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "category"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}: $ {valueY} USD",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.data.setAll(datasets);

            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        years.forEach((year) => {
            makeSeries(year.toString(), year.toString())
        })

        chart.appear(1000, 100);

        return () => {
            root.dispose()
        }
    }, [datasets, years])

    useLayoutEffect(() => {
        socket.on('update-line', (data) => {
            setDatasets(data.amcharts.data)
            setYears(data.amcharts.anios)
            console.log(data)
        })

        return () => {
            socket.off('update-column')
        }
    }, [])

    return (
        <div id='chart-line' className='w-[90%] h-[400px]'></div>
    )
}

export default LineAmCharts