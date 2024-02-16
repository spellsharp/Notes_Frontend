import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
  return (
    <div className="">
      <Router>
        <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
