// src/LogicHandles/Handlerecipes.js
import axios from 'axios';
import BACKEND_URL from '../config';

// Fetch recipes by category
export const fetchRecipesByCategory = async (name, updateRecipes) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/item/categories/${name}`);
    if (response.data && Array.isArray(response.data.recipes)) {
      updateRecipes(response.data.recipes);
    } else {
      throw new Error('Recipes not found in response');
    }
  } catch (err) {
    console.error("Error fetching recipes:", err);
    alert('Failed to fetch recipes. Please try again later.');
  }
};

// Fetch meal details by meal ID
export const fetchRecipesByMealId = async (id, updateMealDetails, navigate) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized access. Redirecting to login...');
      navigate('/login');
      return; // Exit the function if no token is found
    }

    const response = await axios.get(`${BACKEND_URL}/item/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.success && response.data.meal) {
      updateMealDetails(response.data.meal);
    } else {
      throw new Error('Meal details not found in response');
    }
  } catch (error) {
    console.error('Error fetching meal details:', error);
    updateMealDetails(null); // Reset meal details on error
    if (error.response) {
      if (error.response.status === 401) {
        alert('Unauthorized access. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Wait 2 seconds before navigating
      } else {
        alert(error.response.data.message || 'Failed to fetch meal details. Please try again later.');
      }
    } else {
      alert('An unexpected error occurred. Please try again later.');
    }
  }
};
