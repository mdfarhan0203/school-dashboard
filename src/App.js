import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import PageNotFound from "./component/PageNotFound";
import Account from "./pages/Account";
import Syllabus from "./pages/Syllabus";
import DashBoard from "./pages/DashBoard";
import Logout from "./pages/Logout";



let login = true;

function App() {
  return (
    <Router>
      <div className="container">
        {login ? (
          <Routes>
            <Route path="/" exact element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/syllabus" element={<Syllabus />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            {/* If Page URL is Not Found */}
            <Route path="*" element={<PageNotFound />}></Route>

          </Routes>
        ) : (
          <Routes>
            <Route path="/" exact element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>

          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
