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
                                <span className='bg-yummy-400 w-14 h-14 flex items-center justify-center rounded-2xl text-xl select-none'>{category.emoji}</span>
                                <h1 className='text-3xl'>{category.name}</h1>
                                <p className='text-md'>{category.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}