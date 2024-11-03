import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]); // State to hold recipes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://recipe-app-back-end.vercel.app/item/categories');
        
        // Ensure you're accessing the categories array correctly
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories); 
        } else {
          throw new Error('Categories not found in response');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Function to fetch recipes based on selected category
  const handleCategorySelect = async (name) => {
    try {
      const response = await axios.get(`https://recipe-app-back-end.vercel.app/item/categories/${name}`);
      if (response.data && Array.isArray(response.data.recipes)) {
        setRecipes(response.data.recipes); 

      } else {
        throw new Error('not found in response');
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError(err.message); 
    }
  };

  return { categories, loading, error, recipes, handleCategorySelect };
};

export default useFetchCategories;
