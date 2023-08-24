import * as React from 'react';
import { useState } from 'react';
import { BD_ACTION_GET } from '../services/master'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FastFood from '../assets/categories/FastFood.jpg';
import Drinks from '../assets/categories/Drinks.jpg';
import Snacks from '../assets/categories/Snacks.jpg';
import Desserts from '../assets/categories/Desserts.jpg';
import FreshFood from '../assets/categories/FastFood.jpg';

const get_categories = async () => {
    const body = {
      name: name,
      description: description
    }
    const data = await BD_ACTION_GET('get_categories', body)
    
  }

const categories = [
    {
        id: 1,
        name: "Fast Food",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        img: FastFood
    },
    {
        id: 2,
        name: "Drinks",
        description: "Lorem2222222 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        img: Drinks
    },
    {
        id: 3,
        name: "Snacks",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        img: Snacks
    },
    {
        id: 4,
        name: "Dessert",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        img: Desserts
    },
    {
        id: 5,
        name: "Fresh Food",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        img: FreshFood
    },
];


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className='flex justify-between items-start'>
                <h1 className='text-2xl'>Categories</h1>
            </div>

            <div className='mt-6 ml-auto mr-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categories.map((category) => (
                    <Card key={category.id} sx={{ maxWidth: 345, borderRadius: 3, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
                        <CardHeader title={category.name} />
                        <CardMedia
                            component="img"
                            sx={{ height: 200, width: '100%'}}
                            image={category.img}
                            alt={category.name}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {category.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                {/* Contenido adicional colapsable si es necesario */}
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </div>
        </>
    );
}