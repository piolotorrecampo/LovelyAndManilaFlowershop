import React, { useState } from 'react'

import Footer from '../components/Footer';
import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import Button from '../components/Button';

function AiFinder() {
  const [isPhoto, setIsPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flowerPrediction, setFlowerPrediction] = useState();
  const [imageBase64, setImageBase64] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setIsPhoto(e.target.result)
      }
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImageBase64(reader.result)
      }
    }
  }

  const handlePress = async (e) => {
    e.preventDefault();
    const items = { image: imageBase64 };
    setLoading(true);
  
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });
  
      if (!res.ok) {
        throw new Error('Failed to predict image');
      }
  
      const result = await res.json();
      setFlowerPrediction(result.prediction);
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setLoading(false);
  };

  return (
    <div>
      <div className='sticky top-0 w-full'>
        <TopBanner
	  leftContent="+63 917 3277 116"
          centerContent="Open at 6 am to 8 pm"
          rightContent="manilaflowershop@yahoo.com"
        />
      </div>  
      <LogoBanner />
      <div className='lg:sticky lg:top-8 md:sticky md:top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title="AI Finder"
        page="ai-finder"
      />
      <div className="lg:mx-40 md:mx-20 sm:mx-4 xs:mx-4 py-16 xs:py-10 flex flex-col items-center gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-5xl text-center">AI Finder</h2>
          <p className="text-center">
            Try uploading a picture below and wait for the Artificial
            Intelligence to choose the right flower for you.
          </p>
        </div>
        <div className="flex flex-row sm:flex-col justify-center gap-10 lg:w-3/6 sm:w-full xs:w-full">
          <label htmlFor="dropzone-file" className="overflow-hidden flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark:hover-border-gray-500 dark:hover-bg-gray-600">
            <div
              className={ isPhoto
                  ? 'hidden'
                  : 'flex flex-col items-center justify-center pt-5 pb-6'
              }
            >
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400"> SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
            </div>
            {isPhoto && (
              <div>
                <img
                  src={isPhoto}
                  alt="Preview"
                  className="w-full h-full object-fill"
                />
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {loading &&
            <div className="px-10 flex-row justify-center align-center">
              <h4 className="text-2xl text-center">loading...</h4>
            </div>
          }
          {!loading && flowerPrediction && (
            <div className="px-10 flex-row justify-center align-center">
              <h4 className="text-2xl text-center">Your photo is most likely a '{flowerPrediction}'.</h4>
            </div>
          )}
        </div>
        <Button 
          title='Identify Flower'
          onClick={handlePress}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AiFinder
