import React, { useState } from 'react'

import Footer from '../components/Footer';
import Filterbar from '../components/Filterbar';
import FlowerCard from '../components/FlowerCard';
import flowerImage from '../assets/images/flower.png';

import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import Button from '../components/Button';

function AiFinder() {
  const [isPhoto, setIsPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [flowerPrediction, setFlowerPrediction] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file);

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setIsPhoto(e.target.result)
        }
        reader.readAsDataURL(file);
      }
    }

  const handlePress = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      if (!photo) {
        console.log('No file selected.');
        return;
      }

      const formData = new FormData();
      formData.append('file', photo);

      const response = await fetch('http://localhost:9000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error communicating with the Flask API:', response.statusText);
        return;
      }

      const result = await response.json();
      setFlowerPrediction(result);
      console.log('Prediction result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className='sticky top-0 w-full'>
        <TopBanner
          leftContent="+63 123 123 1234"
          centerContent="Open at 7 am to 10 pm"
          rightContent="example@gmail.com"
        />
      </div>  
      <LogoBanner />
      <div className='sticky top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title="AI Finder"
        page="ai-finder"
      />
      <div className="mx-40 sm:mx-10 py-16 flex flex-col items-center gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-5xl text-center">AI Finder</h2>
          <p className="text-center">
            Try uploading a picture below and wait for the Artificial
            Intelligence to choose the right flower for you.
          </p>
        </div>
        <div className="flex flex-row sm:flex-col justify-center gap-10 w-3/6">
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
              <h4 className="text-2xl text-center">Your photo is most likely a '{flowerPrediction.prediction}'.</h4>
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
