import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
            name: "Platillo 2",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 2",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 2",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },{
            name: "Platillo 2",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        
    ];

    return (
        <div className='flex flex-col items-center gap-6'>
            <Typography variant='h4' color='primary' align='center'>
                Dishes
            </Typography>
            <div className='w-4/5'>
                {dishesData.map((dish, index) => (
                    <Card key={index} className='mb-6'>
                        <CardActionArea>
                            <div className='flex'>
                                <CardMedia
                                    component='img'
                                    style={{ width: '100px', height: '100px' }} 
                                    image={dish.photoUrl}
                                    alt={dish.name}
                                />
                                <CardContent className='flex items-center'>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        <a href={`#${dish.name}`} className='text-blue-500 hover:underline'>
                                            {dish.name}
                                        </a>
                                    </Typography>
                                </CardContent>
                            </div>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dishes;
