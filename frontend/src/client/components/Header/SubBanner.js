import React from 'react'

const SubBanner = (props) => {
  return (
    <div className="bg-center bg-cover bg-no-repeat bg-banner-img">
      <div className="py-10 flex flex-col text-white justify-center items-center gap-3">
        <h2 className="text-4xl">{props.title}</h2>
        <p>home | {props.page}</p>
      </div>
    </div>
  )
}

export default SubBanner;