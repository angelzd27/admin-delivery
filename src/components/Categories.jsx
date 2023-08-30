import React from 'react'
import { useState, useEffect } from 'react'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

import FastFood from '../assets/categories/FastFood.jpg';
import Drinks from '../assets/categories/Drinks.jpg'
import Snacks from '../assets/categories/Snacks.jpg'
import Desserts from '../assets/categories/Desserts.jpg'
import FreshFood from '../assets/categories/FreshFood.jpg'

import { BD_ACTION_GET } from '../services/master'


//Funcion para traer las categorias de la BD
const get_categories = async () => {
    try {
        //Hacer la peticion a la BD
        const data = await BD_ACTION_GET('category', 'get_categories');


        //Si la peticion es correcta
        if (data.error === false && data.msg && Array.isArray(data.msg)) {
            const categories = data.msg;


            console.log(categories);
            return categories;
        } else {
            console.error("Error response from server");
            return [];
        }


    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};  
 
  export default function Categories() {
    const [categories, setCategories] = useState([]);
  const [wathcMore, setWatchMore] = useState({})


    //Cargar las categorias al cargar el componente
    useEffect(() => {
    //Funcion para cargar las categorias
    const ctg = async () => {
    //Hacer llamado de la funcion para traer las categorias
    const categoriesData = await get_categories();
    //Guardar las categorias en el estado
    setCategories(categoriesData);
    };
        ctg();
    }, [])


    const categoryImages = {
        'Fast Food': FastFood,
        'Drinks': Drinks,
        'Snacks': Snacks,
        'Dessert': Desserts,
        'Fresh Food': FreshFood
    };


  const viewCategory = (id) => {
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
      <h1 className='text-2xl'>Categories</h1>
     
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8'>
        {categories.map((category) => (
          <div key={category.id} className='flex flex-col gap-3'>
            <img className='rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300' src={categoryImages[category.name]} onClick={() => viewCategory(category.id)} />
            <h1 className='text-lg font-bold'>{category.name}</h1>


            <span className='text-sm text-sky-500 flex items-center gap-2 cursor-pointer w-fit' onClick={() => toggleDescription(category.id)}>
              Watch More
              {
                wathcMore[category.id] ? (
                  <BsChevronCompactDown />
                ) : (
                  <BsChevronCompactUp />
                )
              }
            </span>
            {
              wathcMore[category.id] && (
                <div className='text-gray-500'>{category.description}</div>
              )
            }
          </div>
        ))}
      </div>
    </div >
  </>
  )
}
