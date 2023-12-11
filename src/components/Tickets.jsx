import { useState, useEffect, useLayoutEffect } from 'react'
import moment from 'moment'
import { BD_ACTION_GET } from '../services/master'
import { MdBorderColor, MdDateRange, MdTimer } from 'react-icons/md'
import { FaHourglassStart, FaHourglassEnd, FaUserCircle, FaMoneyBill, FaInfoCircle } from 'react-icons/fa'

export default function Tickets() {
    const [orders, setOrders] = useState([])
    const [headers, setHeaders] = useState(['Order ID', 'Username', 'Order Date', 'Aprox. Time', 'Start Order', 'End Order', 'Status', 'Total'])

    useEffect(() => {
        async function getOrders() {
            const data = await BD_ACTION_GET('order', 'get_all_orders')
            if (!data.error) {
                setOrders(data.msg.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)))
                console.log(data.msg.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)))
            }
        }

        getOrders()

        return () => { }
    }, [])

    return (
        <>
            <div className='flex flex-col gap-8'>
                <table className='bg-white w-full rounded-xl'>
                    <thead className='text-left'>
                        <tr>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><FaUserCircle /> Username</span></th>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><MdDateRange /> Order Date</span></th>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><MdTimer />Aprox. Time</span></th>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><FaHourglassStart />Start Order</span></th>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><FaHourglassEnd />End Order</span></th>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><FaInfoCircle />Status</span></th>
                            <th className='py-6 px-6 border-b-[1px] font-montserrat'><span className='flex items-center gap-2'><FaMoneyBill />Total</span></th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            orders.map((order, index) => (
                                <tr key={index} className='hover:bg-gray-200 transition-all'>
                                    <td className='py-4 px-6 text-sky-600'>{order.user}</td>
                                    <td className='py-4 px-6 font-montserrat'>{moment(order.order_date).format('MMMM D YYYY, [at] h:mm A z')}</td>
                                    <td className='py-4 px-6 font-montserrat'>{order.approx_time == null ? '' : `${order.approx_time} min`}</td>
                                    <td className={`py-4 px-6 font-montserrat ${order.start_order == null ? 'text-gray-400' : 'text-black'}`}>{order.start_order == null ? 'Not Taked...' : moment(order.start_order).format('h:mm A z')}</td>
                                    <td className={`py-4 px-6 font-montserrat ${order.end_order == null ? 'text-gray-400' : 'text-black'}`}>{order.end_order == null ? 'Not Taked...' : moment(order.end_order).format('h:mm A z')}</td>
                                    <td className='py-4 px-6'><span className={`px-4 py-1 rounded-xl text-white ${order.id_status == 1 ? 'bg-status-pending-light' : order.id_status == 2 ? 'bg-status-onProcess-light' : order.id_status == 3 ? 'bg-status-completed-light' : order.id_status == 4 ? 'bg-status-rejected-light' : order.id_status == 5 ? 'bg-status-cancelled-light' : ''}`}>{order.status}</span></td>
                                    <td className='py-4 px-6'><span className={`font-montserrat ${order.id_status == 1 ? 'text-status-pending-light' : order.id_status == 2 ? 'text-status-onProcess-light' : order.id_status == 3 ? 'text-status-completed-light' : order.id_status == 4 ? 'text-status-rejected-light' : order.id_status == 5 ? 'text-status-cancelled-light' : ''}`}>$ {order.order_total}</span></td>
                                    {/* <td className='py-4 px-6 font-montserrat'>$ {order.order_total}</td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}