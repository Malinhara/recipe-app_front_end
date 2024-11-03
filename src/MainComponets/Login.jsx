import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { handleLogin } from '../LogicHandles/Handlelogin';
import '../Styles/login.css';
import { validateLogin } from '../Validations/loginValidate';


const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, errors } = validateLogin(emailRef.current.value, passwordRef.current.value);
    if (!valid) {
      setValidationErrors(errors);
      return;
    }

    await handleLogin(emailRef, passwordRef, setError, navigate);
  };

  return (
    <div className="login d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: "25rem" }}>
        <div className="log-card-body text-center">
          <img src='https://i.ibb.co/NSc6XX2/Screenshot-2024-10-30-131018.jpg' alt="Logo" className="logo-img" />
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                ref={emailRef}
                required
              />
              {validationErrors.email && <div className="error">{validationErrors.email}</div>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={passwordRef}
                required
              />
              {validationErrors.password && <div className="error">{validationErrors.password}</div>}
            </div>
            <button type="submit" className="custom-btn w-100">SIGN IN</button>
          </form>

          {error && (
            <div className="error">
              <p>Your Password or Username is Incorrect</p>
            </div>
          )}

          <div className="log-footer mt-5">
            <p><span style={{ color: 'black' }}>Don't have an account? </span><a href="/register">Create a new account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
