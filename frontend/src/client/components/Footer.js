import React from 'react'
import CustomLink from './CustomLink'

const Footer = (props) => {
  return (
    <footer className="bg-footer w-full">
      <div className="mx-40 flex flex-col xjustify-center items-center gap-3">
        <div className="text-white py-3 flex flex-row justify-between w-full gap-3">
          <div className="flex flex-col gap-3 w-40">
            <FooterHeaderSection title="" />
            <p>
              Stall#3 J. Chanyungco St., Marikina City, 1800 Metro Manila,
              Marikina City
            </p>
            <p>+63 123 456 1234</p>
            <p>lovelymanila@gmail.com</p>
          </div>
          <div className="flex flex-col gap-3 w-40">
            <FooterHeaderSection title="Information" />
            <CustomLink title="About Us" />
            <CustomLink title="Blog Posts" />
          </div>
          <div className="flex flex-col gap-3 w-40">
            <FooterHeaderSection title="Contact Us" />
            <CustomLink title="Contact Us" />
            <CustomLink title="Message Us" />
            <CustomLink title="Location" />
          </div>
        </div>
        <div className="w-full bg-white h-0.5"></div>
        <div className="pb-2 flex flex-col text-white justify-center items-center">
          <p>Copyright © Lovely & Manila Flowershop. All Rights Reserved.</p>
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
