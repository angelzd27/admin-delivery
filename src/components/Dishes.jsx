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
            description: "Descripción del platillo 1",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        {
            name: "Platillo 2",
            description: "Descripción del platillo 2",
            photoUrl: "https://assets.kraftfoods.com/recipe_images/opendeploy/118961_640x428.jpg",
        },
        
    ];

    return (
        <div className='flex flex-col items-center gap-6'>
            <Typography variant='h4' color='primary' align='center'>
                Dishes
            </Typography>
            <div className='w-full'>
                {dishesData.map((dish, index) => (
                    <Card key={index} className='mb-6 rounded-lg'>
                        <CardActionArea>
                            <div className='flex'>
                                <CardContent className='flex flex-col'>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        {dish.name}
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>
                                        {dish.description}
                                    </Typography>
                                </CardContent>
                                <div className='flex-grow'></div>
                                <CardMedia
                                    component='img'
                                    style={{ width: '100px', height: '100px' }} // Ajusta estos valores
                                    image={dish.photoUrl}
                                    alt={dish.name}
                                />
                            </div>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dishes;
