import axios from 'axios';
import BACKEND_URL from '../config'; 

const sendFavoriteItem = async (idMeal, isFavorited, navigate) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated. Redirecting to login...');
      navigate('/login');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const endpoint = `${BACKEND_URL}/user/favitems`;

    if (isFavorited) {
     
      const response = await axios.post(endpoint, { idMeal }, config);
      if (response.data.success) {
        alert('Item added to favorites!');
      } else {
        alert(response.data.message || 'Failed to add item to favorites.');
      }
    } else {
      // DELETE request to remove item from favorites
      const response = await axios.delete(endpoint, {
        ...config,
        data: { idMeal },
      });
      if (response.data.success) {
        alert('Item removed from favorites!');
      } else {
        alert(response.data.message || 'Failed to remove item from favorites.');
      }
    }
  } catch (err) {
    if (err.response && err.response.data) {
      alert(err.response.data.message || 'An error occurred on the server.');
      if (err.response.status === 401) {
        navigate('/login');
      }
    } else {
      alert('An unexpected error occurred. Please try again later.');
    }
  }
};

export default sendFavoriteItem;
