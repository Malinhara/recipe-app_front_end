import axios from 'axios';
import { validateLogin } from '../Validations/loginValidate'; 
import BACKEND_URL from '../config'; 

export const handleLogin = async (emailRef, passwordRef, setError, navigate) => {
  const email = emailRef.current.value;
  const password = passwordRef.current.value;

  const { valid, errors } = validateLogin(email, password);
  if (!valid) {
    setError(errors); // Display validation errors (if needed)
    return false;
  }

  try {
    const response = await axios.post(`${BACKEND_URL}/user/login`, {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      setTimeout(() => navigate('/'), 100);
      return true; 
    } else {
      setError(true); 
      alert(response.data.message || 'Login failed. Please try again.');
      return false;
    }
  } catch (error) {
    setError(true); 
    if (error.response && error.response.data) {
      alert(error.response.data.message || 'An error occurred while logging in.');
    } else {
      alert('An unexpected error occurred. Please check your network connection.');
    }
    return false; 
  }
};

export default handleLogin;
