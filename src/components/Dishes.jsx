import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { MdSearch, MdStar } from 'react-icons/md'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'
import { BD_ACTION_GET } from '../services/master'
import Loader from './Loader'

const categories = [
  {
    id: 0,
    name: 'All',
    emoji: '🍽️'
  },
  {
    id: 1,
    name: 'Fast Food',
    emoji: '🍕'
  },
  {
    id: 2,
    name: 'Drinks',
    emoji: '🥤'
  },
  {
    id: 3,
    name: 'Snacks',
    emoji: '🍿'
  },
  {
    id: 4,
    name: 'Dessert',
    emoji: '🧁'
  },
  {
    id: 5,
    name: 'Fresh Food',
    emoji: '🥗'
  }
]

const MenuComponent = () => {
  const [load, setLoad] = useState(false)
  const [products, setProducts] = useState([])
  const [selectButton, setSelectButton] = useState([0])
  const [wathcMore, setWatchMore] = useState({})
  const [dataDisplay, setDataDisplay] = useState([])

  useEffect(() => {
    const get_data_products_categories = async () => {
      setLoad(true)
      const data_prducts = await BD_ACTION_GET('product', 'get_products')
      if (!data_prducts.error) {
        setProducts(data_prducts.msg)
      }
      setLoad(false)
    }

    get_data_products_categories()

    return () => { }

  }, [])

  const handleClick = (index) => {
    setSelectButton([index === selectButton ? null : index])
  }

  const viewproduct = (id) => {
    console.log(id)
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
        <h1 className='text-2xl'>Products</h1>
        <div className='flex flex-grow overflow-hidden'>
          <TextField className='flex-grow' variant='standard' placeholder='Search...' />
          <button>
            <MdSearch />
          </button>
        </div>
        <div className='flex'>
          {categories.map((category, index) => (
            <div key={index} className='flex flex-col items-center w-20 text-center'>
              <span className='w-12 h-12 bg-yummy-600 flex items-center justify-center rounded-full hover:scale-110 hover:bg-black transition-all'>{category.emoji}</span>
              <span className='text-sm'>{category.name}</span>
            </div>
          ))}
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8'>
          {products.map((product, index) => (
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
          ))}
        </div>
      </div >
    </>
  )
}

export default MenuComponent