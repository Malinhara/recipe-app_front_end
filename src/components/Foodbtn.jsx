import React from 'react';
import useFetchCategories from '../LogicHandles/Handlecategories';
import { fetchRecipesByCategory } from '../LogicHandles/Handlerecipes';
import '../Styles/foodbtn.css';

function Foodbtn({ updateRecipes }) { 
  const { categories} = useFetchCategories();

  const handleCategoryClick = (name) => {
    fetchRecipesByCategory(name, updateRecipes); 
  };

  return (
    <div className="container">
      <div className="button-row">
        {categories.map((category) => (
          <button key={category.id} onClick={() => handleCategoryClick(category.name)}>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Foodbtn;
