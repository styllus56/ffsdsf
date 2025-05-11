import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default Login;
