import { useEffect, useLayoutEffect, useState } from 'react'
import { socket } from '../services/master'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Rating } from '@mui/material'
import styled from '@emotion/styled'
import { MdStar } from 'react-icons/md'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { graphics_avable } from '../services/graphics_avable'
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
import Comment from './Comment'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
})

function Dashboard() {
    const [totalUSD, setTotalUSD] = useState(0)
    const [totalMXN, setTotalMXN] = useState(0)
    const [orders, setOrders] = useState([
        {
            id_status: 0,
            status: '',
            total_orders: 0
        },
        {
            id_status: 0,
            status: '',
            total_orders: 0
        },
        {
            id_status: 0,
            status: '',
            total_orders: 0
        },
        {
            id_status: 0,
            status: '',
            total_orders: 0
        },
        {
            id_status: 0,
            status: '',
            total_orders: 0
        },
    ])
    const [selectedChart, setSelectedChart] = useState(graphics_avable[0])
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
            const data_orders = await BD_ACTION_GET('dashboard', 'get_orders_dashboard')
            const data_better_product = await BD_ACTION_GET('dashboard', 'get_best_product')
            const data_worst_product = await BD_ACTION_GET('dashboard', 'get_worst_product')

            if (data_earing.error || data_orders.error || data_better_product.error || data_worst_product.error) {
                console.log('Error In Database')
            } else {
                setTotalUSD(data_earing.msg[0].earnings_usd)
                setTotalMXN(data_earing.msg[0].earnings_mxn)
                setOrders(data_orders.msg)
                setBetterProduct(data_better_product.msg[0])
                setWorstProduct(data_worst_product.msg[0])
            }
        }

        get_all_information()

        return () => {
        }
    }, [])


    useLayoutEffect(() => {
        socket.on('update-dashboard', (data) => {
            console.log(data)
            setTotalUSD(data.earnings_usd)
            setTotalMXN(data.earnings_mxn)
            setOrders(data.orders)
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
                    <div className='bg-white shadow-md rounded-lg col-span-2 flex xl:flex-row md:flex-row flex-col items-center justify-center py-5 gap-16 text-center'>
                        <div className='flex flex-col items-center justify-center gap-1'>
                            <span className='xl:text-4xl text-2xl font-montserrat underline underline-offset-4'>$ {totalUSD} USD</span>
                            <span>Total Earning (USD)</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-1'>
                            <span className='xl:text-4xl text-2xl font-montserrat underline underline-offset-4'>$ {totalMXN} MEX</span>
                            <span>Total Earning (MEX)</span>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg flex justify-center gap-8 col-span-2 text-center xl:flex-row md:flex-row flex-col py-5'>
                        <div className='flex flex-col items-center justify-center text-status-pending-light'>
                            <span className='text-3xl font-montserrat'>{orders[0].total_orders}</span>
                            <span className='text-[12px]'>Pending</span>
                        </div>
                        <div className='flex flex-col items-center justify-center text-status-onProcess-light'>
                            <span className='text-3xl font-montserrat'>{orders[1].total_orders}</span>
                            <span className='text-[12px]'>On-Process</span>
                        </div>
                        <div className='flex flex-col items-center justify-center text-status-completed-light'>
                            <span className='text-3xl font-montserrat'>{orders[2].total_orders}</span>
                            <span className='text-[12px]'>Completed</span>
                        </div>
                        <div className='flex flex-col items-center justify-center text-status-rejected-light'>
                            <span className='text-3xl font-montserrat'>{orders[3].total_orders}</span>
                            <span className='text-[12px]'>Rejected</span>
                        </div>
                        <div className='flex flex-col items-center justify-center text-status-cancelled-light'>
                            <span className='text-3xl font-montserrat'>{orders[4].total_orders}</span>
                            <span className='text-[12px]'>Cancelled</span>
                        </div>
                    </div>
                </div>
                <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='flex flex-col items-center bg-white shadow-md rounded-lg gap-4 py-5'>
                        <span className='text-2xl'>Best Selling Product</span>
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
                        <span className='text-2xl'>Least Sold Product</span>
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
                                value={4.5}
                                readOnly
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            />
                        </div>
                        <Comment />
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