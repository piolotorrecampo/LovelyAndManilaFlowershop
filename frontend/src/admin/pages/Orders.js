import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { GetOrder, DeleteOrder, UpdateProductPurchased, SuccessfulPurchased } from '../../FetchData';

const Orders = () => {
  let list = GetOrder();

  if(list) {
    list = list.filter((order) => order.state === "pending");
  }
  
  const handleDone = (ids, orderId) => {
    ids.forEach((id) => {
      UpdateProductPurchased(id);
    });
    alert('Order finished');
    SuccessfulPurchased(orderId);
  };

  const handleReject = (id) => {
    DeleteOrder(id);
    alert('Order rejected.');
  }

  return (
    <div>
      <NavbarAdmin/>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='py-10 mx-40 text-6xl'>Orders</h1>
        <div className="mx-40 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact Information
                </th>
                <th scope="col" className="px-6 py-3">
                  Pickup Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
                <tbody>  
                  {list ? list.map((item) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.customerName}
                      </th>
                      <td className="px-6 py-4">
                        {item.phoneNumber} | {item.email}
                      </td>
                      <td className="px-6 py-4">
                        {item.pickupDate}
                      </td>
                      <td className="px-6 py-4">
                        {item.order.map((id) => (
                          <div>
                            {id.productId}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        {item.order.map((qty) => (
                          <div>
                            {qty.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        {item.order.map((price) => (
                          <div>
                            {price.price}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        {item.message}
                      </td>
                      <td className="px-6 py-4">
                        <button className='px-5' onClick={() => handleDone(item.order.map((id) => id.productId), item._id)}>Done</button>
                        <button className='px-5' onClick={() => handleReject(item._id)}>Reject</button>
                      </td>  
                    </tr>
                  )) : 
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <p>---</p>
                      </th>
                      <td className="px-6 py-4">
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

export default Orders
