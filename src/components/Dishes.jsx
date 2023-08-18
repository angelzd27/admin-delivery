import { useState } from 'react'
import { TextField } from '@mui/material'
import { MdSearch, MdStar } from 'react-icons/md'
import { BsChevronCompactDown } from 'react-icons/bs'

const categories = [
  {
    name: 'All',
    emoji: '🍽️'
  },
  {
    name: 'Burger',
    emoji: '🍔'
  },
  {
    name: 'Pizza',
    emoji: '🍕'
  },
  {
    name: 'Salad',
    emoji: '🥗'
  },
  {
    name: 'Drinks',
    emoji: '🥤'
  },
]



const dishes = [
  {
    id: 1,
    title: 'Classic Burger',
    image: 'https://thefoodtech.com/wp-content/uploads/2023/05/sabrosa-hamburguesa-papas-fritas.jpg',
    description: 'Introducing our classic burger: a timeless combo of juicy beef, melted cheese, fresh toppings, all in a soft bun.',
    rating: 4.6,
    categories: 'Burger'
  },
  {
    id: 2,
    title: 'Margarita Pizza',
    image: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg',
    description: 'Indulge in the essence of Italy with our Margherita pizza.Thin crust, tomato, melted mozzarella, and fresh basil.Delight in every bite.',
    rating: 4.8,
    categories: 'Pizza'
  },
  {
    id: 3,
    title: 'Wings',
    image: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg',
    description: 'Dive into flavor with our wings. Crispy, tender, and sauced to perfection, each bite is a savory journey.',
    rating: 4.2,
    categories: 'Chicken'
  },
  {
    id: 4,
    title: 'Fries',
    image: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg',
    description: "Savor simplicity with our fries. Golden, crispy perfection that's irresistibly satisfying.",
    rating: 4.6,
    categories: 'Vegetables'
  },
  {
    id: 5,
    title: 'Chicken Nuggts',
    image: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg',
    description: 'Enjoy our chicken nuggets – bite-sized bliss. Crispy outside, tender inside, a taste that delights.',
    rating: 4.0,
    categories: 'Chicken, Fries'
  },
  {
    id: 6,
    title: 'Shushi',
    image: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg',
    description: 'Una pizza clásica con tomate, mozzarella y albahaca.',
    rating: 4.2,
    categories: 'Shushi, Oriental'
  },
]

const MenuComponent = () => {
  const [selectButton, setSelectButton] = useState([0])

  const handleClick = (index) => {
    setSelectButton([index === selectButton ? null : index])
  }

  const [wathcMore, setWatchMore] = useState({})

  const viewDish = (id) => {
    console.log(id)
  }

  const toggleDescription = (dishId) => {
    setWatchMore((prevState) => ({
      ...prevState,
      [dishId]: !prevState[dishId]
    }))
  }

  return (
    <>
      <div className='w-full flex flex-col gap-6 mb-20'>
        <h1 className='text-2xl'>Dishes</h1>
        <div className='flex flex-grow overflow-hidden'>
          <TextField className='flex-grow' variant='standard' placeholder='Search...' />
          <button>
            <MdSearch />
          </button>
        </div>
        <div className='flex gap-5'>
          {categories.map((category, index) => (
            <div key={index} className='flex flex-col items-center gap-1'>
              <span className={`${selectButton.includes(index) ? 'bg-black pointer-events-none' : 'bg-gray-200 pointer-events-auto'} hover:bg-black transition-colors select-none duration-200 w-12 h-12 flex items-center justify-center rounded-full`} onClick={() => handleClick(index)}>{category.emoji}</span>
              <span className='select-none'>{category.name}</span>
            </div>
          ))}
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-6'>
          {dishes.map((dish, index) => (
            <div key={index} className='flex flex-col gap-3'>
              <img className='rounded-3xl cursor-pointer hover:opacity-95 transition-all duration-300' src={dish.image} onClick={() => viewDish(dish.id)} />
              <h1 className='text-lg font-bold'>{dish.title}</h1>
              <div className='flex flex-row items-center gap-1 text-gray-500'>
                <span><MdStar /></span>
                <span className='font-montserrat'>{dish.rating}</span>
                <span className='ml-10'>{dish.categories}</span>
              </div>
              <span className='text-sm text-sky-500 flex items-center gap-2 cursor-pointer w-fit' onClick={() => toggleDescription(dish.id)}>
                Watch More
                <BsChevronCompactDown />
              </span>
              {
                wathcMore[dish.id] && (
                  <div className='text-gray-500'>{dish.description}</div>
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