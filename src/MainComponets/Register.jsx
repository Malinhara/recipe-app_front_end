import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleRegister from '../LogicHandles/Handleregister'; // Import the register handler
import '../Styles/register.css';

const Register = () => {
  const [formValues, setFormValues] = useState({
    Firstname: '',
    Lastname: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = await handleRegister(formValues,navigate);
    
    if (!valid) {
      setValidationErrors(errors); 
    }
  };

  return (
    <div className="register d-flex align-items-center justify-content-center">
      <div className="register-card text-center">
        <div className="register-card-body">
          <img 
            src="https://i.ibb.co/NSc6XX2/Screenshot-2024-10-30-131018.jpg" 
            alt="Logo" 
            className="reg-logo-img mb-3" 
          />
          <h5 className="reg-card-title text-left mb-6">Register</h5>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  name="Firstname"
                  value={formValues.Firstname}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="First Name"
                  required
                />
                <div className="error mt-1">{validationErrors.Firstname}</div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  name="Lastname"
                  value={formValues.Lastname}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Last Name"
                  required
                />
                <div className="error mt-1">{validationErrors.Lastname}</div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Email"
                  required
                />
                <div className="error mt-1">{validationErrors.email}</div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="tel"
                  name="contact"
                  value={formValues.contact}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Phone"
                  required
                />
                <div className="error mt-1">{validationErrors.contact}</div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div className="error mt-1">{validationErrors.password}</div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
                <div className="error mt-1">{validationErrors.confirmPassword}</div>
              </div>
            </div>
            <button type="submit" className="custom-btn mb-3 text-left">Create Account</button>
          </form>

          {validationErrors.server && (
            <div className="error mt-1">
              <p>{validationErrors.server}</p>
            </div>
          )}

          <p className="reg-footer text-center">
            Already have an account? <a href="/login" style={{ color: "#fe5e7f" }}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
