import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { admins, login } = useContext(DataContext)

  console.log(admins);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Search for the provided username in the list of admin users
      const adminUser = admins.find((admin) => admin.username === username);

      if (adminUser) {
        // Compare the provided password with the stored password
        if (adminUser.password === password) {
          // Successful login logic (redirect, set state, etc.)
          console.log('Login successful');
          login();
          setError('');
          navigate('/admin/orders', { replace: true });
        } else {
          // Incorrect password
          setError('Incorrect password. Please try again.');
        }
      } else {
        // Username not found
        setError('Username not found. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login. Please try again later.');
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="w-80">
        <form onSubmit={handleLogin}>
          <h1 className='text-6xl mb-10 text-center leading-20'>
            Lovely and Manila Flowershop
          </h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={(e) => handleLogin(e)}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
