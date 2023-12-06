import React from 'react'
import CustomLink from './CustomLink'

const Footer = (props) => {
  return (
    <footer className="bg-footer w-full">
      <div className="lg:mx-40 md:mx-20 xs:mx-4 sm:mx-4 flex flex-col items-center gap-3 p-5">
        <div className="text-white py-3 flex flex-row justify-between w-full gap-3 xs:flex-col xs:items-center xs:gap-14">
          <div className="flex flex-col gap-3 w-3/5 xs:w-full xs:gap-5 xs:items-center">
            <h1 className='text-5xl xs:text-5xl xs:text-center'>Lovely and Manila Flowershop</h1>
            <p className='xs:text-center text-sm'>
              Stall#3 J. Chanyungco St., Marikina City, 1800 Metro Manila, Marikina City
            </p>
            <div className='flex flex-col gap-3 xs:justify-center xs:items-center'>
              <p>+63 123 456 1234</p>
              <p>lovelymanila@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mx-5 xs:items-center">
            <FooterHeaderSection title="Information" />
            <CustomLink destination='/about-us' title="About Us" />
          </div>
          <div className="flex flex-col gap-3 mx-5 xs:items-center">
            <FooterHeaderSection title="Contact Us" />
            <CustomLink destination='/contact' title="Contact Us" />
          </div>
        </div>
        <div className="w-full bg-white h-0.5"></div>
        <div className="pb-2 flex flex-col text-white justify-center items-center">
          <p className='text-center'>Copyright © Lovely & Manila Flowershop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const FooterHeaderSection = (props) => {
  return (
    <div className="">
      <h3 className="text-3xl">{props.title}</h3>
    </div>
  )
}

export default Footer
