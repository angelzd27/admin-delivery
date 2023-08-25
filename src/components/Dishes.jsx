import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { MdStar } from 'react-icons/md'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'
import { MdAdd } from 'react-icons/md'
import { Alert } from '@mui/material'
import { BD_ACTION_GET } from '../services/master'
import Loader from './Loader'
import { categories } from '../services/categories'
import { useNavigate } from 'react-router-dom'
import ServerError from '../assets/animations/500Error.mp4'

const MenuComponent = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)
  const [alert, setAlert] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedButton, setSelectedButton] = useState(0)
  const [categorySelected, setCategorySelected] = useState(0)
  const [wathcMore, setWatchMore] = useState({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    const get_data_products_categories = async () => {
      try {
        setLoad(true)
        const data = await BD_ACTION_GET('product', 'get_products')
        if (!data.error) {
          setProducts(data.msg)
          setLoad(false)
        } else {
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
          }, 5000);
        }
      } catch (error) {
        setAlert(true)
      }
    }

    get_data_products_categories()
    setLoad(false)

    return () => { }

  }, [])

  const dataToDisplay = () => {
    if (categorySelected == 0)
      return products

    let data_to_display = []

    products.forEach((product) => {
      if (categorySelected == product.id_category)
        data_to_display.push(product)
    })

    return data_to_display
  }

  const handleClick = (index) => {
    setSelectedButton(index === selectedButton ? null : index)
  }

  const viewproduct = (id) => {
    navigate(`/home/product-detail/${id}`)
  }

  const toggleDescription = (product_id) => {
    setWatchMore((prevState) => ({
      ...prevState,
      [product_id]: !prevState[product_id]
    }))
  }

  return (
    <>
      <Loader load={load} />
      <div className='w-full flex flex-col gap-6 mb-20 select-none'>
        <div className='flex justify-between'>
          <h1 className='text-2xl'>Products</h1>
          <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-full hover:bg-yummy-600 transition-all shadow-lg' onClick={() => navigate('/home/product-add')}>Add Product <MdAdd /></button>
        </div>
        <div className='flex flex-grow overflow-hidden'>
          <TextField className='flex-grow' variant='standard' placeholder='Search...' type='text' value={search} onChange={event => setSearch(event.target.value)} />
        </div>
        <div className='flex items-start'>
          {
            categories.map((category, index) => (
              <div key={index} className='flex flex-col items-center w-20 gap-1'>
                <span
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${selectedButton === index ? 'bg-black scale-110 text-lg' : 'bg-yummy-600 hover:bg-black hover:scale-110 hover:text-lg hover:cursor-pointer'}`} onClick={() => { setCategorySelected(category.id); handleClick(index) }}>{category.emoji}</span>
                <span className='text-sm'>{category.name}</span>
              </div>
            ))
          }
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8'>
          {
            dataToDisplay().filter(item => {
              if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return true
              }
            }).map((product, index) => (
              <div key={index} className='flex flex-col gap-3'>
                <img className='rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300' src={product.picture} onClick={() => viewproduct(product.id)} />
                <h1 className='text-lg font-bold'>{product.name}</h1>
                <div className='flex flex-row items-center gap-1 text-gray-500'>
                  <span><MdStar /></span>
                  <span className='font-montserrat'>{product.rating}</span>
                  <span className='ml-10'>{product.cateogory}</span>
                </div>
                <span className={`font-montserrat text-sm ${product.amount == 0 ? 'text-red-500' : product.amount > 0 && product.amount <= 5 ? 'text-amber-500' : 'text-green-500'}`} >Total Stock: {product.amount}</span>
                <span className='text-sm text-sky-500 flex items-center gap-2 cursor-pointer w-fit' onClick={() => toggleDescription(product.id)}>
                  Watch More
                  {
                    wathcMore[product.id] ? (
                      <BsChevronCompactDown />
                    ) : (
                      <BsChevronCompactUp />
                    )
                  }
                </span>
                {
                  wathcMore[product.id] && (
                    <div className='text-gray-500'>{product.description}</div>
                  )
                }
              </div>
            ))
          }
        </div>
        {
          alert && (
            <div className='w-full flex items-center justify-center flex-col gap-2'>
              <video loop autoPlay muted className='w-80'>
                <source src={ServerError} type='video/mp4' />
              </video>
              <h1 className='text-gray-500 text-xl'>Server Error</h1>
            </div>
          )
        }
      </div >
      {
        alert && (
          <Alert severity='error' className='absolute bottom-2 left-2 transition-all duration-300 z-50'>500 Server Error, Please comunicate with Developer</Alert>
        )
      }
    </>
  )
}

export default MenuComponent