import React from 'react';

function Dishes() {
    const dishesData = [
        {
            name: "Platillo 1",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 2",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 3",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 4",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 5",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 6",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
     
    ];

    return (
        <div className='flex flex-col items-center gap-6'>
            <h1 className='text-2xl text-yummy-800 text-center'>Dishes</h1>
            <div className='w-4/5'>
                {dishesData.map((dish, index) => (
                    <div key={index} className='border p-4 flex items-center mb-6'>
                        <img src={dish.photoUrl} alt={dish.name} className='w-24 h-auto mr-4' />
                        <a href={`#${dish.name}`} className='text-blue-500 hover:underline'>
                            <h2 className='text-xl'>{dish.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dishes;
