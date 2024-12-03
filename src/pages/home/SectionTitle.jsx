import React from 'react'

function SectionTitle({title, desc}) {
  return (
    <div className="py-4 md:py-6 flex items-center justify-center ">
    <div className="w-fit min-w-[200px] flex flex-col place-items-center">
      <div className="w-full flex items-center justify-center">
        <div className="h-[1px] relative w-full bg-orange-1 flex-1">
          <span className="w-1 h-1 rounded-full bg-orange-1 absolute top-0 left-0 translate-y-[-50%]"></span>
        </div>
        <h5 className="text-[28px] text-orange-1 mx-1">{title} </h5>
        <div className="relative h-[1px] w-full bg-orange-1 flex-1">
          <span className="w-1 h-1 rounded-full bg-orange-1 absolute top-0 right-0 translate-y-[-50%]"></span>
        </div>
      </div>
      <h5 className="text-[35px] rancho">{desc}</h5>
    </div>
  </div>
  )
}

export default SectionTitle