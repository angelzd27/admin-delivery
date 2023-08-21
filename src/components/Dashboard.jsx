import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Rating } from '@mui/material'
import styled from '@emotion/styled'
import { MdStar } from 'react-icons/md'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { graphics_avable } from '../services/graphics_avable'

// ! Elimar importacion de imagenes cuando pase a producción
import Tacos from '../assets/food/TacosDonTono.jpg'
import DulcesLuz from '../assets/food/DulcesLuz.jpg'
import { useState } from 'react'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
})

function Dashboard() {
    const [selectedGraphic, setSelectedGraphic] = useState(graphics_avable[0].value)
    const image_url = 'https://th.bing.com/th/id/R.eecf01ce2268ef8843815048bf2b3561?rik=00vIjP0S7WYVeA&pid=ImgRaw&r=0'

    const options_line = {
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'Earling'
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
        series: [
            {
                name: 'Total',
                marker: {
                    symbol: 'diamond'
                },
                data: [5, 2.99, 13, 8, 8.55, 4.23, 3, 7, 1, 4, 2, 1]
            }
        ]
    }

    const options_pie = {
        title: {
            text: 'Top Popularity Dishes',
            style: {
                color: '#000000',
                fontSize: '28px'
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            zoomType: ''
        },
        tooltip: {
            pointFormat: 'Popularity: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [
                {
                    name: "Combo Special's Edwin",
                    y: 100,
                }, {
                    name: 'Empanadas',
                    y: 25
                }, {
                    name: 'Donas',
                    y: 19
                }, {
                    name: 'Tortas Frias',
                    y: 64
                }, {
                    name: 'Tacos de Don Toño',
                    y: 98
                }, {
                    name: 'Pizza',
                    y: 88
                }, {
                    name: 'Enchiladas',
                    y: 88
                },
            ]
        }]
    }

    const option_bars = {
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
            data: [
                ["Combo Special's Edwin", 135,],
                ['Empanadas Frias', 23],
                ['Donas', 16],
                ['Tortas Frias', 85],
                ['Tacos de Don Toño', 129],
                ['Pizza', 110],
                ['Enchiladas', 95],
                ['Coca Cola', 130],
                ['Paletas de hielo', 19],
                ['Dulces Luz', 5],
                ['Nieve', 122],
            ]
        }]
    }

    let total_usd = '5,583.12'
    let total_mex = '96,084.55'
    let total_order = '126'
    let total_visitor = '96'
    let customer_satisfaction = 4.5
    let better_dish = {
        id: 1,
        name: 'Tacos Don Toño',
        image: Tacos,
        ranking: 4.9,
        categories: 'Fast Food'
    }
    let worst_dish = {
        id: 2,
        name: 'Dulces Doña Luz',
        image: DulcesLuz,
        ranking: 1.2,
        categories: 'Others'
    }

    const handleGraphicChange = (event) => {
        setSelectedGraphic(event.target.value)
    }

    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-center justify-between'>
                    <h1 className='text-2xl'>Dashboard</h1>
                    <TextField
                        select
                        label="Graphics Avable"
                        variant='standard'
                        value={selectedGraphic}
                        onChange={handleGraphicChange}
                        className='w-[25%]'
                    >
                        {
                            graphics_avable.map((graphic, index) => (
                                <MenuItem key={index} value={graphic.value}>{graphic.emoji} {graphic.name}</MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>$ {total_usd} USD</span>
                            <span>Total Earning (USD)</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>$ {total_mex} MEX</span>
                            <span>Total Earning (MEX)</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>{total_order}</span>
                            <span>Total Orders</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>{total_visitor}</span>
                            <span>Total Visitor</span>
                        </div>
                    </div>
                </div>
                <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='flex flex-col items-center bg-white shadow-md rounded-lg gap-4 py-5'>
                        <span className='text-2xl'>Better Ranking Dish</span>
                        <div className='flex flex-col gap-3'>
                            <img src={better_dish.image} className='w-52 rounded-3xl hover:scale-105 transition-all' />
                            <h1 className='text-lg font-bold'>{better_dish.name}</h1>
                            <div className='flex flex-row items-center gap-1 text-gray-500'>
                                <span><MdStar /></span>
                                <span className='font-montserrat'>{better_dish.ranking}</span>
                                <span className='ml-10'>{better_dish.categories}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center bg-white shadow-md rounded-lg gap-4 py-5'>
                        <span className='text-2xl'>Worst Ramking Dish</span>
                        <div className='flex flex-col gap-3'>
                            <img src={worst_dish.image} className='w-52 rounded-3xl hover:scale-105 transition-all' />
                            <h1 className='text-lg font-bold'>{worst_dish.name}</h1>
                            <div className='flex flex-row items-center gap-1 text-gray-500'>
                                <span><MdStar /></span>
                                <span className='font-montserrat'>{worst_dish.ranking}</span>
                                <span className='ml-10'>{worst_dish.categories}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg xl:col-span-1 md:col-span-2 py-5'>
                        <span className='text-2xl'>Customer Satisfaction</span>
                        <div className='flex gap-3 items-center mb-6 rounded-lg'>
                            <span className='text-4xl font-montserrat'>{customer_satisfaction}</span>
                            <StyledRating
                                defaultValue={customer_satisfaction}
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-row shadow-lg p-5 bg-slate-50 gap-5 items-center rounded-lg max-w-[80%]'>
                            <img src={image_url} className='w-10 h-10 rounded-full' />
                            <div className='flex flex-col'>
                                <span className='font-bold'>@ DeicideSuici</span>
                                <StyledRating
                                    defaultValue="2.5"
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    readOnly
                                    size='small'
                                />
                                <span className='text-sm'>Mi torta estaba bien fria y mi coca caliente, ademas huele a mecanica, a pura gasolina y aceite quemado</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='bg-white flex flex-col items-center py-5 rounded-md shadow-md'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options_line}
                        />
                    </div>
                    <div className='bg-white flex flex-col items-center py-5 rounded-md shadow-md'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options_pie}
                        />
                    </div>
                </div>
                <div className='bg-white flex flex-col items-center py-5 rounded-md shadow-md'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={option_bars}
                    />
                </div>
            </div>
        </>
    )
}

export default Dashboard