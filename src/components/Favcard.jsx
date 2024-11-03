import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendFavoriteItem from '../LogicHandles/Handlefav';
import '../Styles/card.css';

function Favcard() {
  const [meals, setMeals] = useState([]);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // Use the environment variable

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${BACKEND_URL}/item/favmeal/ids`, config);
        const fetchedMeals = response.data.recipes || [];
        setMeals(fetchedMeals);

        const initialFavorites = {};
        fetchedMeals.forEach(recipe => {
          initialFavorites[recipe.idMeal] = true; 
        });
        setFavorites(initialFavorites);
      } catch (error) {
        console.error('Error fetching favorite meals:', error);
      }
    };

    fetchMeals();
  }, [BACKEND_URL]); // Add BACKEND_URL to dependencies if it changes (e.g., in testing)

  const handleCardClick = (recipe) => {
    navigate(`/itemdesc/${recipe.idMeal}`);
  };

  const toggleFavorite = (recipe) => {
    const isCurrentlyFavorited = favorites[recipe.idMeal] || false;
    const updatedFavorites = { ...favorites, [recipe.idMeal]: !isCurrentlyFavorited };
    setFavorites(updatedFavorites);

    sendFavoriteItem(recipe.idMeal, !isCurrentlyFavorited, navigate); 
  };
  
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-6 g-4">
        {meals.map((recipe) => (
          <div className="col" key={recipe.idMeal}>
            <div className="card h-100" onClick={() => handleCardClick(recipe)}>
              <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <span className="card__title small-title">{recipe.strMeal}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleFavorite(recipe);
                    }}
                    className={`favorite-btn ${favorites[recipe.idMeal] ? 'favorited' : ''}`}
                    aria-label="Favorite Button"
                  >
                    <svg className="heart-icon" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 20.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <p className="card__sub-head">{recipe.description || "No description available."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favcard;
