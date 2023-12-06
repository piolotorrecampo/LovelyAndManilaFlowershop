import React from 'react'

const TopBanner = (props) => {
  return (
    <div className="w-full lg:flex lg:flex-row md:flex md:flex-row lg:justify-between md:justify-between items-center bg-topbanner p-1 px-4 sm:hidden xs:hidden">
      <div>
        <p>{props.leftContent}</p>
      </div>
      <div>
        <p>{props.centerContent}</p>
      </div>
      <div>
        <p>{props.rightContent}</p>
      </div>
    </div>
  )
}

export default TopBanner
