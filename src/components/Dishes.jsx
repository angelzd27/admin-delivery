import { useState } from 'react'
import { TextField } from '@mui/material'
import { MdSearch, MdStar } from 'react-icons/md'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

// Eliminar imports de imagenes cuando se pase a producción
import Burger from '../assets/food/Burger.jpg'
import ChickenNuggets from '../assets/food/ChickenNuggets.jpg'
import DulcesLuz from '../assets/food/DulcesLuz.jpg'
import Fries from '../assets/food/Fries.jpg'
import Pizza from '../assets/food/Pizza.jpg'
import Shushi from '../assets/food/Shushi.jpg'
import TacosDonTono from '../assets/food/TacosDonTono.jpg'
import Wings from '../assets/food/Wings.jpg'

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
    image: Burger,
    description: 'Introducing our classic burger: a timeless combo of juicy beef, melted cheese, fresh toppings, all in a soft bun.',
    rating: 4.4,
    categories: 'Burger',
    stock: 10
  },
  {
    id: 2,
    title: 'Margarita Pizza',
    image: Pizza,
    description: 'Indulge in the essence of Italy with our Margherita pizza.Thin crust, tomato, melted mozzarella, and fresh basil.Delight in every bite.',
    rating: 4.1,
    categories: 'Pizza',
    stock: 4
  },
  {
    id: 3,
    title: 'Wings',
    image: Wings,
    description: 'Dive into flavor with our wings. Crispy, tender, and sauced to perfection, each bite is a savory journey.',
    rating: 4.2,
    categories: 'Chicken',
    stock: 12
  },
  {
    id: 4,
    title: 'Fries',
    image: Fries,
    description: "Savor simplicity with our fries. Golden, crispy perfection that's irresistibly satisfying.",
    rating: 4.6,
    categories: 'Vegetables',
    stock: 3
  },
  {
    id: 5,
    title: 'Chicken Nuggts',
    image: ChickenNuggets,
    description: 'Enjoy our chicken nuggets – bite-sized bliss. Crispy outside, tender inside, a taste that delights.',
    rating: 4.0,
    categories: 'Chicken, Fries',
    stock: 0
  },
  {
    id: 6,
    title: 'Shushi',
    image: Shushi,
    description: 'Delight in our sushi. Fresh, flavorful, and expertly crafted – a true culinary experience.',
    rating: 4.2,
    categories: 'Shushi, Oriental',
    stock: 14
  },
  {
    id: 7,
    title: 'Dulces Luz',
    image: DulcesLuz,
    description: 'Indulge in sweetness with our candies. Bursting with flavors that bring joy to every moment.',
    rating: 1.2,
    categories: 'Other',
    stock: 43
  },
  {
    id: 8,
    title: 'Tacos Don Toño',
    image: TacosDonTono,
    description: "Savor Mexico's essence with street tacos. Handmade tortillas, flavorful fillings. True taste of the streets.",
    rating: 4.9,
    categories: 'Shushi, Oriental',
    stock: 2
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
      <div className='w-full flex flex-col gap-6 mb-20 select-none'>
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
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8'>
          {dishes.map((dish, index) => (
            <div key={index} className='flex flex-col gap-3'>
              <img className='rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300' src={dish.image} onClick={() => viewDish(dish.id)} />
              <h1 className='text-lg font-bold'>{dish.title}</h1>
              <div className='flex flex-row items-center gap-1 text-gray-500'>
                <span><MdStar /></span>
                <span className='font-montserrat'>{dish.rating}</span>
                <span className='ml-10'>{dish.categories}</span>
              </div>
              <span className={`font-montserrat text-sm ${dish.stock == 0 ? 'text-red-500' : dish.stock > 0 && dish.stock <= 5 ? 'text-amber-500' : 'text-green-500'}`} >Total Stock: {dish.stock}</span>
              <span className='text-sm text-sky-500 flex items-center gap-2 cursor-pointer w-fit' onClick={() => toggleDescription(dish.id)}>
                Watch More
                {
                  wathcMore[dish.id] ? (
                    <BsChevronCompactDown />
                  ) : (
                    <BsChevronCompactUp />
                  )
                }
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