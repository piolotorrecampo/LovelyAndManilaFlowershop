import React, { useState } from 'react' 
import DeleteIcon from '@mui/icons-material/Delete';
import { GetCategories, GetFlowers, GetOcassions, GetProducts, AddProduct, DeleteProduct } from '../../../FetchData';

export default function ProductSection(props) {
  return (
    <div className="lg:mx-40 md:mx-20 py-10 gap-10 flex items-center flex-col">
      <h1 className="text-6xl">{props.pageName}</h1>
      <ProductForm 
        pageName={props.pageName}
      />
    </div>
  )
}

const ProductForm = (props) => {
  const [photo, setPhoto] = useState(null)
  const [imageBase64, setImageBase64] = useState('')
  const [title, setTitle] = useState('')
  const [flowerType, setFlowerType] = useState(null)
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [ocassion, setOcassion] = useState([])
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const listProducts = GetProducts()
  const listOcassions = GetOcassions()
  const listCategories = GetCategories()
  const listFlowers = GetFlowers()

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhoto(e.target.result)
      }
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImageBase64(reader.result)
      }
    }
  }

  // Add and update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const views = 0;
    const addToCart = 0;
    const purchased = 0;
    
    const items = { title, flowerType, price, description, ocassion, category, views, addToCart, purchased, image: imageBase64 }
    setLoading(true);
  
    try {
      const res = await AddProduct(items)
      console.log(res);
      alert('added');
      setPhoto(null)
      setTitle('')
      setPrice('')
      setDescription('')
    } catch (error) {
      setError(error)
      console.error('Error:', error)
    }
    setLoading(false)
  };

  function handleChange(event) {
    const {value, checked} = event.target

    if(checked){
      setOcassion(pre => [...pre,value])
    }else{
      setOcassion(pre => {
        return [...pre.filter(item => item!==value)]
      })
    }
  }

  return (
    <div className='flex justify-around gap-5 lg:flex-row md:flex-col-reverse'>
      <div className='flex flex-col w-1/2 md:w-full gap-5'>
        <h2 className='text-2xl'>List of {props.pageName}</h2>
        {listProducts && listProducts.map((item) => (
          <div className="justify-between p-3 items-center flex border flex-row gap-10">
            <button>
              <div className='flex flex-row items-center gap-10'>
                <img className="w-24 h-24" src={item.image.url} alt={`${props.pageName}`} />
                <p className='font-bold uppercase' key={item._id}>{item.title}</p>
              </div>
            </button>
            <button className='px-5' onClick={() => DeleteProduct(item._id)}><DeleteIcon/></button>  
          </div>
        ))}
      </div>
      <div className='w-1/2 md:w-full'>
        <h2 className='pb-5 text-2xl'>Add Product</h2>
        <form className="flex flex-col border p-5 gap-5">  
          <label className="font-bold"> Photo</label>
          <div> 
            <div className="flex flex-row justify-center gap-10">
              <label htmlFor="dropzone-file" className="overflow-hidden flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark:hover-border-gray-500 dark:hover-bg-gray-600">
                <div className={ photo ? 'hidden' : 'flex flex-col items-center justify-center pt-5 pb-6' } >
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" > <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /> </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"> <span className="font-semibold">Click to upload</span> or drag and drop </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"> SVG, PNG, JPG, or GIF</p>
                </div>
                {photo && (
                  <div> 
                    <img src={photo} alt="Preview" className="w-full h-full object-fill"/> 
                  </div>
                )}
                <input onChange={handleImageChange} id="dropzone-file" type="file"className="hidden" accept="image/*" />
              </label>
            </div>
          </div>
          <label className="font-bold">Name</label>
          <input className="border" type="text"
            onChange={(e) => setTitle(e.target.value)} 
            placeholder={`Enter an ${props.pageName}`} 
            value={title} 
          />
          {listFlowers && listFlowers.map((item) => (
              <div className="flex items-center" key={item._id}>
                  <input id="default-radio-1" type="radio"  name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setFlowerType(e.target.value)}
                    value={item.title} 
                  />
                  <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.title}</label>
              </div>
            ))
          }
          <label className="font-bold">Price</label>
          <input className="border" type="text"
            onChange={(e) => setPrice(e.target.value)} 
            value={price} 
            placeholder={`Enter price`}/>
          <label className="font-bold">Description</label>
          <textarea className="border" type="text" rows="4" cols="50"
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
            placeholder={`Enter description`} 
          />
          <label className="font-bold">Ocassion</label>
          {listOcassions && listOcassions.map((item) => (
            <div className="flex items-center gap-2" key={item._id}>
              <input id={`checkbox-${item.id}`} type="checkbox"
                value={item.title}
                onChange={handleChange}
              />
              <label>{item.title}</label>
            </div>
          ))}
          <label className="font-bold">Categories</label>
          {listCategories && listCategories.map((item) => (
            <div className="flex items-center" key={item.key}>
              <input id="default-radio-1" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                value={item.title} 
                onChange={(e) => setCategory(e.target.value)} 
              />
              <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.title}</label>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
          {error && (<div><p>{error}</p></div>)}
          {loading && <p>loading</p>}
        </form>
      </div>
    </div>
  )
}