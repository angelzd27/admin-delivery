import { useEffect, useLayoutEffect, useState } from 'react'
import { io } from 'socket.io-client'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Rating } from '@mui/material'
import styled from '@emotion/styled'
import { MdStar } from 'react-icons/md'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { graphics_avable } from '../services/graphics_avable'
import { comments } from '../services/comments'
import { BD_ACTION_GET } from '../services/master'
import LineChartJS from './graphics/line/LineChartJS'
import LineHighcharts from './graphics/line/LineHighcharts'
import BarHighcharts from './graphics/bars/BarsHighcharts'
import PieHighcharts from './graphics/pie/PieHighcharts'
import PieChartJS from './graphics/pie/PieChartJS'
import BarsChartJS from './graphics/bars/BarsChartJS'
import PieAmCharts from './graphics/pie/PieAmCharts'
import BarsAmCharts from './graphics/bars/BarsAmCharts'
import LineAmCharts from './graphics/line/LineAmCharts'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
})

const socket = io('http://127.0.0.1:4003')

function Dashboard() {
    const [totalUSD, setTotalUSD] = useState(0)
    const [totalMXN, setTotalMXN] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalVisitors, setTotalVisitors] = useState(0)
    const [selectedChart, setSelectedChart] = useState(graphics_avable[0])
    const [dataIndex, setDataIndex] = useState(0)
    const [comment, setComment] = useState(comments[dataIndex])
    const [betterProduct, setBetterProduct] = useState({
        id: '',
        name: '',
        picture: '',
        rating: 0
    })
    const [worstProduct, setWorstProduct] = useState({
        id: '',
        name: '',
        picture: '',
        rating: 0
    })
    let customer_satisfaction = 4.5

    useEffect(() => {
        const get_all_information = async () => {
            const data_earing = await BD_ACTION_GET('dashboard', 'get_earnings')
            const data_order_visitors = await BD_ACTION_GET('dashboard', 'get_orders_customers')
            const data_better_product = await BD_ACTION_GET('dashboard', 'get_best_product')
            const data_worst_product = await BD_ACTION_GET('dashboard', 'get_worst_product')

            if (data_earing.error || data_order_visitors.error || data_better_product.error || data_worst_product.error) {
                console.log('Error In Database')
            } else {
                setTotalUSD(data_earing.msg[0].earnings_usd)
                setTotalMXN(data_earing.msg[0].earnings_mxn)
                setTotalOrders(data_order_visitors.msg[0].total_orders)
                setTotalVisitors(data_order_visitors.msg[0].total_visitors)
                setBetterProduct(data_better_product.msg[0])
                setWorstProduct(data_worst_product.msg[0])
            }
        }

        get_all_information()

        const intervalId = setInterval(() => {
            const nextIndex = (dataIndex + 1) % comments.length
            setDataIndex(nextIndex)
            setComment(comments[nextIndex])
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [dataIndex])


    useLayoutEffect(() => {
        socket.on('update-dashboard', (data) => {
            console.log(data)
            setTotalUSD(data.earnings_usd)
            setTotalMXN(data.earnings_mxn)
            setTotalOrders(data.total_orders)
            setTotalVisitors(data.total_visitors)
            setBetterProduct(data.best_product)
            setWorstProduct(data.worst_product)
        })

        return () => {
            socket.off('update-dashboard')
        }
    }, [])

    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-start justify-between'>
                    <h1 className='text-2xl'>Dashboard</h1>
                    <TextField
                        select
                        label="Graphics Avable"
                        variant='standard'
                        value={selectedChart}
                        onChange={event => setSelectedChart(event.target.value)}
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
                            <span className='text-4xl font-montserrat'>$ {totalUSD} USD</span>
                            <span>Total Earning (USD)</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>$ {totalMXN} MEX</span>
                            <span>Total Earning (MEX)</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>{totalOrders}</span>
                            <span>Total Orders</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='flex flex-col items-center justify-center gap-5 py-5'>
                            <span className='text-4xl font-montserrat'>{totalVisitors}</span>
                            <span>Total Visitor</span>
                        </div>
                    </div>
                </div>
                <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='flex flex-col items-center bg-white shadow-md rounded-lg gap-4 py-5'>
                        <span className='text-2xl'>Better Ranking Dish</span>
                        <div className='flex flex-col gap-3'>
                            <img src={betterProduct.picture} className='w-52 rounded-3xl hover:scale-105 transition-all' />
                            <h1 className='text-lg font-bold'>{betterProduct.name}</h1>
                            <div className='flex flex-row items-center gap-1 text-gray-500'>
                                <span><MdStar /></span>
                                <span className='font-montserrat'>{betterProduct.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center bg-white shadow-md rounded-lg gap-4 py-5'>
                        <span className='text-2xl'>Worst Ranking Dish</span>
                        <div className='flex flex-col gap-3'>
                            <img src={worstProduct.picture} className='w-52 rounded-3xl hover:scale-105 transition-all' />
                            <h1 className='text-lg font-bold'>{worstProduct.name}</h1>
                            <div className='flex flex-row items-center gap-1 text-gray-500'>
                                <span><MdStar /></span>
                                <span className='font-montserrat'>{worstProduct.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg xl:col-span-1 md:col-span-2 py-5'>
                        <span className='text-2xl'>Customer Satisfaction</span>
                        <div className='flex gap-3 items-center mb-6 rounded-lg'>
                            <span className='text-4xl font-montserrat'>{customer_satisfaction}</span>
                            <StyledRating
                                value={4.9}
                                readOnly
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            />
                        </div>
                        <div className='flex flex-row shadow-lg p-5 bg-slate-50 gap-5 items-center rounded-lg max-w-[80%]'>
                            <img src={comment.image_url} className='w-10 h-10 rounded-full' />
                            <div className='flex flex-col'>
                                <span className='font-bold'>@ {comment.username}</span>
                                <StyledRating
                                    size='small'
                                    value={comment.ranking}
                                    readOnly
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                />
                                <span className='text-sm'>{comment.comment}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='bg-white flex flex-col items-center justify-center xl:py-5 rounded-md shadow-md'>
                        {
                            selectedChart.value === 'chartjs' ? (
                                <>
                                    <LineChartJS />
                                </>
                            ) : selectedChart.value === 'highcharts' ? (
                                <>
                                    <LineHighcharts />
                                </>
                            ) : selectedChart.value === 'amcharts' ? (
                                <>
                                    <LineAmCharts />
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className='bg-white flex flex-col items-center justify-center xl:py-5 rounded-md shadow-md'>
                        {
                            selectedChart.value === 'chartjs' ? (
                                <>
                                    <PieChartJS />
                                </>
                            ) : selectedChart.value === 'highcharts' ? (
                                <>
                                    <PieHighcharts />
                                </>
                            ) : selectedChart.value === 'amcharts' ? (
                                <>
                                    <PieAmCharts />
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
                <div className='bg-white flex flex-col items-center justify-center xl:py-5 rounded-md shadow-md'>
                    {
                        selectedChart.value === 'chartjs' ? (
                            <>
                                <BarsChartJS />
                            </>
                        ) : selectedChart.value === 'highcharts' ? (
                            <>
                                <BarHighcharts />
                            </>
                        ) : selectedChart.value === 'amcharts' ? (
                            <>
                                <BarsAmCharts />
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