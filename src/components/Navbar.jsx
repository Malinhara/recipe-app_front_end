import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/navbar.css';

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/login">
          <img 
            src="https://i.ibb.co/NSc6XX2/Screenshot-2024-10-30-131018.jpg" 
            alt="Main Logo" 
            className="main-logo-img" 
          />
        </a>

        <div className="nav-links">
          <a href="/" className="nav-link">HOME</a>
          <a href="/favourite" className="nav-link">FAVOURITE</a>
        </div>


        <div className="right-logo">
          <button className="plain-button" onClick={handleLogout}>
            <img 
              src="https://i.ibb.co/hR7PQW3/Screenshot-2024-10-30-210156.jpg" 
              alt="Secondary Logo" 
              className="secondary-logo" 
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
