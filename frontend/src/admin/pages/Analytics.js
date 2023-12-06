import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { GetProducts } from '../../FetchData';

const Analytics = () => {
  const products = GetProducts()

  return (
    <div>
      <NavbarAdmin />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='py-10 mx-40 text-6xl'>Analytics</h1>
        <div className="mx-40 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Views
                </th>
                <th scope="col" className="px-6 py-3">
                  Add to Cart
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchased
                </th>
              </tr>
            </thead>
            <tbody>
              {products ? products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    {item.views}
                  </td>
                  <td className="px-6 py-4">
                    {item.addToCart}
                  </td>
                  <td className="px-6 py-4">
                    {item.purchased}
                  </td>
                </tr>
              )) : 
                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p>---</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>---</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>---</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>---</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics