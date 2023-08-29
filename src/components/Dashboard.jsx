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
import LineChartJS from './graphics/line/LineChartJS'
import LineHighcharts from './graphics/line/LineHighcharts'
import BarHighcharts from './graphics/bars/BarsHighcharts'
import PieHighcharts from './graphics/pie/PieHighcharts'
import PieChartJS from './graphics/pie/PieChartJS'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
})

function Dashboard() {
    const [graphic, setGraphic] = useState(graphics_avable[0])
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

    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-start justify-between'>
                    <h1 className='text-2xl'>Dashboard</h1>
                    <TextField
                        select
                        label="Graphics Avable"
                        variant='standard'
                        value={graphic}
                        onChange={event => setGraphic(event.target.value)}
                        className='w-[25%]'
                    >
                        {
                            graphics_avable.map((graphic_avable, index) => (
                                <MenuItem key={index} value={graphic_avable}>{graphic_avable.emoji} {graphic_avable.name}</MenuItem>
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
                        <span className='text-2xl'>Worst Ranking Dish</span>
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
                            <img src={''} className='w-10 h-10 rounded-full' />
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
                        {
                            graphic.value === 'chartjs' ? (
                                <>
                                    <LineChartJS />
                                </>
                            ) : graphic.value === 'highcharts' ? (
                                <>
                                    <LineHighcharts />
                                </>
                            ) : graphic.value === 'amcharts' ? (
                                <>
                                    <h1>AMCharts</h1>
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className='bg-white flex flex-col items-center py-5 rounded-md shadow-md'>
                        {
                            graphic.value === 'chartjs' ? (
                                <>
                                    <PieChartJS />
                                </>
                            ) : graphic.value === 'highcharts' ? (
                                <>
                                    <PieHighcharts />
                                </>
                            ) : graphic.value === 'amcharts' ? (
                                <>
                                    <h1>AMCharts</h1>
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
                <div className='bg-white flex flex-col items-center py-5 rounded-md shadow-md'>
                    {
                        graphic.value === 'chartjs' ? (
                            <>
                                <h1>Chart.Js</h1>
                            </>
                        ) : graphic.value === 'highcharts' ? (
                            <>
                                <BarHighcharts />
                            </>
                        ) : graphic.value === 'amcharts' ? (
                            <>
                                <h1>AMCharts</h1>
                            </>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard