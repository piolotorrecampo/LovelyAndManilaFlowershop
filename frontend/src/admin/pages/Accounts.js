import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import NavbarAdmin from '../components/NavbarAdmin';
import { AddAdmin, DeleteAdmin, GetAdmin } from '../../FetchData'

const Accounts = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const list = GetAdmin();

  // Add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      setLoading(true);
      await AddAdmin({ username, password });
      setUsername('');
      setPassword('');
      console.error('Registration sucessful.');
    } catch (error) {
      setError(error)
      console.error('Error:', error)
    }
    setLoading(false)
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await DeleteAdmin(id);
    } catch (error) {
      setError(error.message);
      console.error('Deletion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="mx-40 py-10 gap-10 flex items-center flex-col">
        <h1 className="text-5xl">User Management</h1>
        <div className="flex justify-around w-full gap-5">
          <div className="flex flex-col w-1/2 gap-5">
            <h2 className="text-2xl">List of Users</h2>
            {list &&
              list.map((user) => (
                <div className="justify-between p-3 items-center flex border flex-row gap-10" key={user._id}>
                  <div className="flex flex-row items-center gap-10">
                    <p className="font-bold uppercase">{user.username}</p>
                  </div>
                  <button className="px-5" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </button>
                </div>
              ))}
          </div>
          <form className="flex flex-col border p-5 gap-5 w-1/2">
            <label className="font-bold">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border"
              type="text"
              placeholder="Enter username"
            />
            <label className="font-bold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border"
              type="password"
              placeholder="Enter password"
            />
            <button onClick={handleSubmit}>Register</button>
            {error && <div><p>{error}</p></div>}
            {loading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
