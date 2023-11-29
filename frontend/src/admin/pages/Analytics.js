import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { Bar } from 'react-chartjs-2'

const Analytics = () => {


  return (
    <div>
      <NavbarAdmin/>
      <form>
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-medium mb-2">Username</label>
          <input type="text" id="username" name="username" class="w-full px-3 py-2 border rounded-md" placeholder="Enter your username" required/>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input type="password" id="password" name="password" class="w-full px-3 py-2 border rounded-md" placeholder="Enter your password" required/>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Login
        </button>
      </form>
    </div>
  )
}

export default Analytics