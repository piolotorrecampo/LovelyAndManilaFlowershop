import React from 'react'
import Button from './Button'

const Map = () => {
  return (
    <div className="bg-location-img bg-cover bg-no-repeat bg-center">
      <div className='lg:mx-40 md:mx-20 xs:mx-4 py-10 gap-10 flex justify-center xs:flex-col-reverse xs:items-center'>
        <iframe className="lg:h-96 w-3/5 md:h-80 xs:h-60 xs:w-4/5" src="https://maps.google.com/maps?q=4-111%20J.%20Chanyungco%20St,%20Marikina,%201800%20Metro%20Manila&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>
        <div className="flex flex-col justify-center gap-8 text-white xs:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-6xl xs:text-5xl xs:text-center">Where are we located?</h2>
            <p className="text-xl xs:text-sm xs:text-center">
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
