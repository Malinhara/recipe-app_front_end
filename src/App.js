import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Itemdesc from './components/Itemdesc';
import NavigationBar from './components/Navbar';
import Dashboard from './MainComponets/Dashboard';
import Favorite from './MainComponets/Favourite';
import Home from "./MainComponets/Home";
import LoginForm from './MainComponets/Login';
import Register from './MainComponets/Register';

function AppContent() {
  const location = useLocation();
  
  const hideNavbarPaths = ['/login', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div style={{ backgroundColor: 'white' }}>
      {showNavbar && <NavigationBar />}
      <h1>hai<h1/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/favourite" element={<Favorite />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/itemdesc/:id" element={<Itemdesc />} /> 
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
