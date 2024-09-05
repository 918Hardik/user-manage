import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/create-user" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
