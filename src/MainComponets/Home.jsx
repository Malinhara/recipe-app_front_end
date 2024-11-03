import React, { useEffect, useState } from 'react';
import ItemCard from '../components/Card'; // Import the ItemCard component
import Foodbtn from '../components/Foodbtn';
import { fetchRecipesByCategory } from '../LogicHandles/Handlerecipes';

function Home() {
  const [recipes, setRecipes] = useState([]);


  const updateRecipes = (newRecipes) => {
    setRecipes(newRecipes);
  };

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      const defaultCategory = 'Beef';
      await fetchRecipesByCategory(defaultCategory, updateRecipes);
    };

    fetchDefaultRecipes();
  }, []);

  return (
    <div>
      <Foodbtn updateRecipes={updateRecipes} />
      <ItemCard recipes={recipes} />
    </div>
  );
}

export default Home;
