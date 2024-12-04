import React from 'react'
import DiscountForm from './DiscountForm'

function CreateDiscount() {
  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md flex justify-start flex-col">
        <div className="w-full lg:w-1/2 px-3 py-4 md:px-6 md:py-6">
        
            <DiscountForm/>

        </div>
      
      </div>
    </div>
  )
}

export default CreateDiscount