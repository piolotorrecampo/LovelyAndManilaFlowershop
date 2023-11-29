import React from 'react'
import Button from './Button'

const Map = () => {
  return (
    <div className="bg-location-img bg-cover bg-no-repeat bg-center">
      <div className='mx-40 py-10 gap-10 flex justify-center'>
        <iframe className="h-96 w-2/3" src="https://maps.google.com/maps?q=4-111%20J.%20Chanyungco%20St,%20Marikina,%201800%20Metro%20Manila&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>
        <div className="flex flex-col justify-center gap-8 text-white">
          <div className="flex flex-col">
            <h2 className="text-6xl">Where are we located?</h2>
            <p className="text-xl">
              Stall#3 J. Chanyungco St., Marikina City, 1800 Metro Manila,
              Marikina City, Philippines
            </p>
          </div>
          <div>
            <Button to='/contact' title="Contact Us" />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Map
