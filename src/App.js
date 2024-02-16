import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <div className="">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <LoginPage />
                </>
              }
            />
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
