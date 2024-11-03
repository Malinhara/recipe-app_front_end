import axios from 'axios';
import { validateRegistration } from '../Validations/regiterValidate';
import BACKEND_URL from '../config'; 

export const handleRegister = async (formValues, navigate) => {
    const { valid, errors } = validateRegistration(formValues);
    if (!valid) {
        return { valid, errors }; 
    }


    const { confirmPassword, ...dataToSubmit } = formValues;

    try {
        const response = await axios.post(`${BACKEND_URL}/user/register`, dataToSubmit);
        
        if (response.data.success) {
            alert('Registration successful!');
            setTimeout(() => navigate('/login'), 100);
            return { valid: true }; 
        } else {

            return { valid: false, errors: { server: response.data.error || 'An unexpected error occurred.' } };
        }
    } catch (error) {
        console.error('Registration failed:', error);
        if (error.response && error.response.data && error.response.data.message) {
            return { valid: false, errors: { server: error.response.data.message } };
        } else {
            return { valid: false, errors: { server: 'Registration failed, please try again.' } };
        }
    }
};

export default handleRegister;
