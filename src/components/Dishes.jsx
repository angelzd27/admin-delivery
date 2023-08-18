import React, { useState } from 'react';
import { TextField, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import burgerIcon from '../assets/icons/burger.png'; 
import pastaIcon from '../assets/icons/pasta.png'; 
import pizzaIcon from '../assets/icons/pizza.png'; 
import steakIcon from '../assets/icons/steak.png'; 
import SearchIcon from '@mui/icons-material/Search';

const categories = [
  { name: "Hamburguesa", icon: burgerIcon }, 
  { name: "Pizza", icon: pizzaIcon },  
  { name: "Carne", icon: steakIcon}, 
  { name: "Pasta", icon: pastaIcon }, 
 
];



const dishes = [
    {
      id: 1,
      title: "Hamburguesa Clásica",
      image: "https://thefoodtech.com/wp-content/uploads/2023/05/sabrosa-hamburguesa-papas-fritas.jpg",
      description: "Una deliciosa hamburguesa con ingredientes frescos y sabrosos."
    },
    {
      id: 2,
      title: "Pizza Margarita",
      image: "https://assets.unileversolutions.com/recipes-v2/244028.jpg",
      description: "Una pizza clásica con tomate, mozzarella y albahaca."
    },
    {
        id: 3,
        title: "Sushi",
        image: "https://assets.unileversolutions.com/recipes-v2/244028.jpg",
        description: "Una pizza clásica con tomate, mozzarella y albahaca."
    },
    {
        id: 4,
        title: "Elote",
        image: "https://assets.unileversolutions.com/recipes-v2/244028.jpg",
        description: "Una pizza clásica con tomate, mozzarella y albahaca."
    },
    {
        id: 5,
        title: "Nachos",
        image: "https://assets.unileversolutions.com/recipes-v2/244028.jpg",
        description: "Una pizza clásica con tomate, mozzarella y albahaca."
    },
    {
        id: 6,
        title: "Nuggets",
        image: "https://assets.unileversolutions.com/recipes-v2/244028.jpg",
        description: "Una pizza clásica con tomate, mozzarella y albahaca."
    },

   
  ];

const MenuComponent = () => {
  const [expandedDish, setExpandedDish] = useState(null);

  const handleExpand = (dishId) => {
    if (expandedDish === dishId) {
      setExpandedDish(null);
    } else {
      setExpandedDish(dishId);
    }
  };

  return (
    <div className="bg-ff6d75 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg p-4">
        <div className="flex items-center mb-8">
          <Typography variant="h4" className="mr-4">
            <span className="font-semibold">Ordena</span> algo
          </Typography>
          <div className="flex-grow rounded-full overflow-hidden border border-gray-300 flex">
            <TextField className="flex-grow px-2" variant="outlined" placeholder="Busca algo" />
            <button className="p-2 bg-gray-200">
              <SearchIcon />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          {categories.map((category, index) => (
            <div key={index} className="rounded-lg overflow-hidden bg-gray-100 p-3 hover:bg-red-200 transition duration-300 border border-red-400">
              <div className="flex flex-col items-center text-center">
                <img src={category.icon} alt={category.name} className="w-6 h-6 mb-2" />
                <span>{category.name}</span>
              </div>
            </div>
          ))}
        </div>
        <Typography variant="h5" className="mb-4">
          Platillos populares
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {dishes.map((dish) => (
            <Card key={dish.id} variant="outlined">
              <CardContent>
                <img src={dish.image} alt={dish.title} className="w-full mb-2 rounded-md" />
                <Typography variant="h6">{dish.title}</Typography>
                
                <Accordion expanded={expandedDish === dish.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleExpand(dish.id)} aria-controls={`dish-description-${dish.id}`} id={`dish-description-${dish.id}`}>
                    Ver más
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{dish.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
