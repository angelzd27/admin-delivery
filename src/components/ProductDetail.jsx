import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Input } from '@mui/material'
import { InputAdornment } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { BiDollar, BiBox, BiTimer, BiText, BiTrash, BiArrowFromBottom } from 'react-icons/bi'
import { ImBoxAdd } from 'react-icons/im'
import { HiArrowCircleUp } from 'react-icons/hi'
import { categories_db } from '../services/categories'
import Rating from '@mui/material/Rating'
import { Alert } from '@mui/material'
import { BD_ACTION_GET, BD_ACTION_POST, BD_ACTION_PUT } from '../services/master'
import Loader from './Loader'
import WidgetCloud from './WidgetCloud'

function ProductDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [product, setProduct] = useState({
        id: '',
        name: '',
        id_category: 1,
        category: '',
        amount: 0,
        price: 0,
        description: '',
        rating: 0,
        picture: 'https://images.designtrends.com/wp-content/uploads/2016/03/29085131/White-Grunge-Texture.jpg',
        approx_time: 0
    })

    useEffect(() => {
        const get_product_id = async () => {
            const id = params.id
            const body = {
                id: id
            }

            if (id != '') {
                const data = await BD_ACTION_GET('product', 'get_product_by_id', body)
                if (!data.error) {
                    setProduct(data.msg)
                }
            }
        }

        get_product_id()
    }, [params])

    const put_update_product = async () => {
        const data = await BD_ACTION_PUT('product', 'update_product', product)

        if (!data.error) {
            setProduct(data.msg)
            setSuccessAlert(true)
            setTimeout(() => {
                setSuccessAlert(false)
            }, 5000)
        }
    }

    const post_create_product = async () => {
        const data = await BD_ACTION_POST('product', 'create_product', product)

        if (!data.error) {
            setLoad(true)
            setTimeout(() => {
                navigate(`/home/dishes`)
            }, 2000)
        } else {
            setLoad(false)
        }
    }

    const valid_form = () => {
        if (product.name == '' || product.description == '' || product.price == 0 || product.approx_time == 0)
            return true

        return false
    }

    return (
        <>
            <Loader load={load} />
            <div className='flex flex-col gap-6'>
                {
                    params.id ? (
                        <div className='flex justify-between'>
                            <h1 className='text-2xl'>ID Product Detaild: <span className='text-lg font-bold font-montserrat'>{product.id}</span></h1>
                            <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-full hover:bg-yummy-600 transition-all shadow-lg disabled:bg-yummy-600' onClick={() => put_update_product()} disabled={valid_form()}>Update <ImBoxAdd /></button>
                        </div>
                    ) : (
                        <div className='flex justify-between'>
                            <h1 className='text-2xl'>Publish New Product</h1>
                            <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-full hover:bg-yummy-600 transition-all shadow-lg disabled:bg-yummy-600' onClick={()=> post_create_product()} disabled={valid_form()}>Publish <HiArrowCircleUp /></button>
                        </div>)
                }
                <div className='grid grid-cols-4 gap-6'>
                    <div className='col-span-1 flex flex-col gap-4'>
                        <img src={product.picture} className='rounded-3xl shadow-lg w-full h-full' />
                        {/* <button className='flex text-sky-500 items-center justify-center gap-1 hover:text-sky-300'>Upload <BiArrowFromBottom /></button> */}
                        <WidgetCloud />
                        {
                            params.id ? (
                                <div className='flex flex-col'>
                                    <span className='text-[12px] text-gray-500'>Rating:</span>
                                    <div className='flex gap-1 items-center'>
                                        <span className='text-5xl'>{product.rating}</span>
                                        <Rating name="read-only" value={product.rating} readOnly />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className='col-span-3 flex flex-col gap-6'>
                        <h1 className='text-xl'>Product Information</h1>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Name
                            </InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BiText />
                                    </InputAdornment>
                                }
                                value={product.name}
                                onChange={event => setProduct({ ...product, name: event.target.value })}
                                placeholder='Write Name Here...'
                            />
                        </FormControl>
                        <TextField variant="standard" value={product.description} rows={5} multiline label='Description' onChange={event => setProduct({ ...product, description: event.target.value })} placeholder='Write Description Here...' />
                        <div className='grid grid-cols-4 gap-6'>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Price (Dollars)
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <BiDollar />
                                        </InputAdornment>
                                    }
                                    type='number'
                                    value={product.price}
                                    onChange={event => setProduct({ ...product, price: event.target.value })}
                                    placeholder='USD'
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Total Amount
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <BiBox />
                                        </InputAdornment>
                                    }
                                    type='number'
                                    value={product.amount}
                                    onChange={event => setProduct({ ...product, amount: event.target.value })}
                                    placeholder='Total'
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Aprox. Time (Minutes)
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <BiTimer />
                                        </InputAdornment>
                                    }
                                    type='number'
                                    value={product.approx_time}
                                    onChange={event => setProduct({ ...product, approx_time: event.target.value })}
                                    placeholder='Time'
                                />
                            </FormControl>
                            <TextField
                                select
                                label='Category'
                                value={product.id_category}
                                variant='standard'
                                onChange={event => setProduct({ ...product, id_category: event.target.value })}
                            >
                                {
                                    categories_db.map((category, index) => (
                                        <MenuItem key={index} value={category.id}>
                                            {category.emoji} | {category.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                    </div>
                </div>
                {
                    params.id && (
                        <div className='flex flex-col gap-6 text-yummy-800 items-end'>
                            <span className='flex gap-2 items-center cursor-pointer hover:text-yummy-600 transition-colors'>Remove Product <BiTrash /></span>
                        </div>
                    )
                }
            </div >
            {
                successAlert && (
                    <Alert severity='success' className='absolute bottom-2 left-2 transition-all duration-300 z-50'>Product Updated! ID: {product.id}</Alert>
                )
            }
        </>
    )
}

export default ProductDetail