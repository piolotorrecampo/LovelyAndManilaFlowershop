import React, {useState } from 'react' 
import DeleteIcon from '@mui/icons-material/Delete';
import { GetFlowers, DeleteFlower, AddFlower } from '../../../FetchData'

export default function OcassionSection(props) {
  const [photo, setPhoto] = useState(null)
  const [imageBase64, setImageBase64] = useState('')
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Get the list of ocassion from the API
  const list = GetFlowers();

  // Load the uploaded photo and return a base64 photo value
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

  // Add and update ocassion
  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = { title, color, image: imageBase64 };
    setLoading(true);
 
try {
    const res = await AddFlower(items);
    console.log('API Response:', res);

    // Check if the response is valid JSON
    const parsedResponse = JSON.parse(res);
    console.log('Parsed Response:', parsedResponse);

    alert('added');
    setPhoto(null);
    setTitle('');
    setColor('');
  } catch (error) {
    setError(error.message); // Assuming error.message contains a user-friendly error message
    console.error('Error:', error);
  }
}

  return (
    <div className="lg:mx-40 md:mx-20 py-10 gap-10 flex items-center flex-col">
      <h1 className="text-6xl">{props.pageName}</h1>
      <div className='flex justify-around w-full gap-5 lg:flex-row md:flex-col-reverse'>
        <div className='flex flex-col w-1/2 gap-5 md:w-full'>
          <h2 className='text-2xl'>List of {props.pageName}</h2>
          {list &&
            list.map((item) => (
              <div className="justify-between p-3 items-center flex border flex-row gap-10">
                <button>
                  <div className='flex flex-row items-center gap-10'>
                    <img className="w-24 h-24" src={item.image.url} alt={`${props.pageName}`} />
                    <p className='font-bold uppercase' key={item._id}>{item.title}</p>
                  </div>
                </button>
                <button className='px-5' onClick={() => DeleteFlower(item._id)}><DeleteIcon/></button>  
              </div>
            ))}
        </div>
        <div className='w-1/2 md:w-full'>
          <h2 className='text-2xl pb-5'>Add Flowers</h2>
          <form className="flex flex-col border p-5 gap-5">  
            <label className="font-bold"> Photo</label>
            <div className="flex flex-row justify-center gap-10">
              <label htmlFor="dropzone-file" className="overflow-hidden flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark:hover-border-gray-500 dark:hover-bg-gray-600" >
                <div className={ photo ? 'hidden' : 'flex flex-col items-center justify-center pt-5 pb-6'} >
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" > <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /> </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"> <span className="font-semibold">Click to upload</span> or drag and drop </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"> SVG, PNG, JPG, or GIF </p>
                </div>
                {photo && ( 
                  <div>
                    <img className="w-full h-full object-fill" src={photo} alt={props.pageName} />
                  </div>
                )}
                <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" accept="image/*" />
              </label>
              </div>
            <label className="font-bold">{props.pageName} Name</label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} className="border" type="text" placeholder={`Enter an ${props.pageName}`}/>
            <label className="font-bold">Color</label>
            <input onChange={(e) => setColor(e.target.value)} value={color} className="border" type="text" placeholder={`Enter an ${props.pageName}`}/>
            <button onClick={handleSubmit}>Add {props.pageName}</button>
            {error && (<div><p>{error}</p></div>)}
            {loading && <p>loading</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
