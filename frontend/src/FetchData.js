import { useState, useEffect } from 'react';

const useDataFetcher = (url) => {
  const [data, setData] = useState(null);  

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      fetchData();
    }, 5000); 
    
    return () => {
      clearInterval(timerId);
    }
  }, []);

  return data;
};

const useDeleteItem = async (url, id) => {
  const res = await fetch(url, {
    method: 'DELETE',
  });
    
  if(res.ok){
    console.log(id, ' was sucessfully deleted.');
    alert('Successfully deleted.');
  }else {
    console.error('Failed to delete')
  }
}

const AddItem = async (url, items) => {
  const itemContent = items
  console.log(items)

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(itemContent),
    headers: { 'Content-Type': 'application/json', },
  })

  const json = await res.json()

  console.log(items)
  console.log(json)
  
  if (!res.ok) {
    return json
  }

  if (res.ok) {
    return true
  }
}

const updateProductViews = async (url, id) => {
  try {
    const currentRes = await fetch(url);
    if (!currentRes.ok) {
      throw new Error(`Failed to fetch product data for ID ${id}`);
    }

    const currentData = await currentRes.json();
    const updatedViews = (currentData.views || 0) + 1;

    const updateRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ views: updatedViews }),
    });

    if (!updateRes.ok) {
      throw new Error(`Failed to update views for product with ID ${id}`);
    }

    console.log('updatedViews ->', updatedViews);
    console.log(`Views for product with ID ${id} updated successfully.`);
  } catch (error) {
    console.error(error.message);
  }
}

const updateAddToCart= async (url, id) => {
  try {
    const currentRes = await fetch(url);
    if (!currentRes.ok) {
      throw new Error(`Failed to fetch product data for ID ${id}`);
    }

    const currentData = await currentRes.json();
    const updatedAddToCart = (currentData.addToCart || 0) + 1;

    const updateRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addToCart: updatedAddToCart }),
    });

    if (!updateRes.ok) {
      throw new Error(`Failed to update views for product with ID ${id}`);
    }

    console.log('updatedAddToCard ->', updatedAddToCart);
    console.log(`Views for product with ID ${id} updated successfully.`);
  } catch (error) {
    console.error(error.message);
  }
}

const updateProductPurchased = async (url, id) => {
  try {
    const currentRes = await fetch(url);
    if (!currentRes.ok) {
      throw new Error(`Failed to fetch product data for ID ${id}`);
    }

    const currentData = await currentRes.json();
    const updatedPurchased = (currentData.purchased || 0) + 1;

    const updateRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purchased: updatedPurchased }),
    });

    if (!updateRes.ok) {
      throw new Error(`Failed to update views for product with ID ${id}`);
    }

    console.log('updatedPurchased ->', updatedPurchased);
    console.log(`Views for product with ID ${id} updated successfully.`);
  } catch (error) {
    console.error(error.message);
  }
}

const successfulPurchased = async (url, id) => {
  try {
    const currentRes = await fetch(url);
    if (!currentRes.ok) {
      throw new Error(`Failed to fetch order data for ID ${id}`);
    }

    const updateRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: 'successful' }),
    });

    if (!updateRes.ok) {
      throw new Error(`Failed to update views for order with ID ${id}`);
    }

    console.log(`Order state (successful) with ID ${id} updated successfully.`);
  } catch (error) {
    console.error(error.message);
  }
}

//Update order state
export const SuccessfulPurchased = (id) => {
  return successfulPurchased(`/api/order/${id}`, id);
};

//Update product add to cart
export const UpdateAddToCart = (id) => {
  return updateAddToCart(`/api/product/${id}`, id);
};

//Update product views
export const UpdateProductViews = (id) => {
  return updateProductViews(`/api/product/${id}`, id);
};

//Update product purchased 
export const UpdateProductPurchased = (id) => {
  return updateProductPurchased(`/api/product/${id}`, id);
};

// Retrieve Function
export const GetOcassions = () => {
  return useDataFetcher('/api/ocassion');
};

export const GetFlowers = () => {
  return useDataFetcher('/api/flower');
};

export const GetProducts = () => {
  return useDataFetcher('/api/product');
};

export const GetCategories = () => {
  return useDataFetcher('/api/category');
};

export const GetOrder = () => {
  return useDataFetcher('/api/order');
};

export const GetBlogs = () => {
  return useDataFetcher('/api/blog');
};

export const GetAdmin = () => {
  return useDataFetcher('/api/admin');
};

// Create Function
export const AddCategory = (items) => {
  return AddItem('/api/category', items)
}

export const AddBlog = (items) => {
  return AddItem('/api/blog', items)
}

export const AddOccassion = (items) => {
  return AddItem('/api/ocassion', items)
}

export const AddFlower= (items) => {
  return AddItem('/api/flower', items)
}

export const AddProduct = (items) => {
  return AddItem('/api/product', items)
}

export const AddOrder = (items) => {
  return AddItem('/api/order', items)
}

export const AddAdmin = (items) => {
  return AddItem('/api/admin', items)
}

export const PredictImage = (items) => {
  return AddItem('/api/predict', items)
}

// Delete Function
export const DeleteCategory = (id) => {
  return useDeleteItem(`/api/category/${id}`, id);
};

export const DeleteOcassion = (id) => {
  return useDeleteItem(`/api/ocassion/${id}`, id);
};

export const DeleteFlower = (id) => {
  return useDeleteItem(`/api/flower/${id}`, id);
};

export const DeleteProduct = (id) => {
  return useDeleteItem(`/api/product/${id}`, id);
};

export const DeleteOrder = (id) => {
  return useDeleteItem(`/api/order/${id}`, id);
};

export const DeleteBlog = (id) => {
  return useDeleteItem(`/api/blog/${id}`, id);
};

export const DeleteAdmin = (id) => {
  return useDeleteItem(`/api/admin/${id}`, id);
};