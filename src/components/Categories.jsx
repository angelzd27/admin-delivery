
import { categories_db } from '../services/categories'

export default function Categories() {

    return (
        <>
            <div className='flex flex-col items-start gap-8'>
                <h1 className='text-2xl'>All Categories</h1>
                <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8'>
                    {
                        categories_db.map((category, index) => (
                            <div key={index} className='flex flex-col gap-3 bg-white p-10 rounded-2xl shadow-md hover:scale-105 transition-all'>
                                <span className='bg-yummy-400 w-14 h-14 flex items-center justify-center rounded-2xl text-xl'>{category.emoji}</span>
                                <h1 className='text-3xl'>{category.name}</h1>
                                <p className='text-md'>{category.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )

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

