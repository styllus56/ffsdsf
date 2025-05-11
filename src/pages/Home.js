import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the E-commerce</h1>
      <p>Browse and shop for the best products!</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/admin">
        <button>Admin Panel</button>
      </Link>
    </div>
  );
};

export default Home;
