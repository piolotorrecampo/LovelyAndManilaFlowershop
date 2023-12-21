import React, { createContext, useState, useEffect} from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const storedCartData = localStorage.getItem('cart');
  const cartFromLocalStorage = storedCartData ? JSON.parse(storedCartData) : [];
  const [items, setItems] = useState(cartFromLocalStorage);
  const [products, setProducts] = useState([]);
  const [ocassions, setOcassions] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const LoginStateFromLocalStorage = JSON.parse(localStorage.getItem('loginState') || false);
  const [isLogin, setIsLogin] = useState(LoginStateFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  },[items])

  useEffect(() => {
    localStorage.setItem('loginState', JSON.stringify(isLogin))
  },[isLogin])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/product/`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
        console.error(error);
      }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/category/`);
      if (res.ok) {
        const json = await res.json();
        setCategories(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
        console.error(error);
      }
  }

  const fetchFlowers = async () => {
    try {
      const res = await fetch(`/api/flower/`);
      if (res.ok) {
        const json = await res.json();
        setFlowers(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
        console.error(error);
      }
  }

  const fetchOcassion = async () => {
    try {
      const res = await fetch(`/api/ocassion/`);
      if (res.ok) {
        const json = await res.json();
        setOcassions(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
        console.error(error);
      }
  }

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`/api/admin/`);
      if (res.ok) {
        const json = await res.json();
        setAdmins(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    fetchProduct()
    fetchFlowers()
    fetchOcassion()
    fetchCategories()
    fetchAdmins()
  }, [])

  const addToCart = (productId, title, flowerType, price, description, ocassion, category, imageUrl) => {
    const existingProductIndex = items.findIndex(item => item.productId === productId);
  
    if (existingProductIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingProductIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      setItems((prevItems) => [
        ...prevItems,
        {
          productId,
          quantity: 1,
          title,
          flowerType,
          price,
          description,
          ocassion,
          category,
          imageUrl,
        },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedItems = items.filter(item => item.productId !== productId);
    setItems(updatedItems);
  };

  const emptyCart = () => {
    setItems([]);
  }

  const login = () => {
    setIsLogin(true);
  }

  const logout = () => {
    setIsLogin(false);
  }


  return (
    <DataContext.Provider value={{ items, products, flowers, ocassions, categories, admins, addToCart, isLogin, login, logout, emptyCart, removeFromCart}}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
