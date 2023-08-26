import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import FastFood from '../assets/categories/FastFood.jpg';
import Drinks from '../assets/categories/Drinks.jpg';
import Snacks from '../assets/categories/Snacks.jpg';
import Desserts from '../assets/categories/Desserts.jpg';
import FreshFood from '../assets/categories/FreshFood.jpg';

import { BD_ACTION_GET } from '../services/master'

//Funcion para traer las categorias de la BD
const get_categories = async () => {
    try {
        //Hacer la peticion a la BD
        const data = await BD_ACTION_GET('category', 'get_categories');

        //Si la peticion es correcta
        if (data.error === false && data.msg && Array.isArray(data.msg)) {
            const categories = data.msg;

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
    const [readMoreMap, setReadMoreMap] = useState({});

    //Funcion para mostrar o esconder la descripcion completa de la categoria
    const handleReadMoreClick = (categoryID) => {
        setReadMoreMap((prevReadMoreMap) => ({
            ...prevReadMoreMap,
            [categoryID]: !prevReadMoreMap[categoryID],
        }));
    };

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

    //Imagenes de las categorias
    //Si en un futuro se desea cambiar la imagen de una categoria, se debe cambiar en la BD y en este objeto
    const categoryImages = {
        'Fast Food': FastFood,
        'Drinks': Drinks,
        'Snacks': Snacks,
        'Dessert': Desserts,
        'Fresh Food': FreshFood
    };

    return (
        <>
            <div className='flex justify-between items-start'>
                <h1 className='text-2xl'>Categories</h1>
            </div>

            <div className='mt-6 ml-auto mr-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categories.map((category) => (
                    <Tooltip title="Ver categoría" key={category.id}>
                        <Card key={category.id} sx={{
                            maxWidth: 345,
                            borderRadius: 4,
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s', // Agregar transición
                            ':hover': {
                                cursor: 'pointer',
                                transform: 'scale(1.04)', // Aplicar la escala al hacer hover
                            },
                        }}>
                            {/* Renderizar los nombres de la categoria */}
                            <CardHeader
                                title={category.name}
                                sx={{
                                    textAlign: 'center',
                                }}
                            />
                            <CardMedia
                                component="img"
                                sx={{ height: 200, width: '100%' }}
                                image={categoryImages[category.name]}
                                alt={category.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {/* Render the full description if it's shorter than the truncation limit */}
                                    {category.description.length <= 200 || readMoreMap[category.id]
                                        ? category.description // Show full text if "Read More" clicked or if it's short
                                        : (
                                            <>
                                                {category.description.slice(0, 200) + "..."} {/* Truncate text */}
                                                <button
                                                    onClick={() => handleReadMoreClick(category.id)}
                                                    className="text-blue-500 hover:underline focus:outline-none"
                                                >
                                                    {readMoreMap[category.id] ? "Read Less" : "Read More"}
                                                </button>
                                            </>
                                        )}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Tooltip>))}
            </div>
        </>
    );
}