import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';

const useAdminHandler = () => {
  const navigate = useNavigate();

  const handleAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated. Please log in.');
        navigate('/login'); 
        return false;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Use the BACKEND_URL here
      const response = await axios.get(`${BACKEND_URL}/user/dashboard`, config);

      if (response.data.success) {
        return true; // Return true if the check is successful
      } else {
        alert(response.data.message);
        navigate('/'); 
        return false;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
        navigate('/'); 
      }
      return false;
    }
  };

  return handleAdmin;
};

export default useAdminHandler;
