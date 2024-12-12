import { cn } from "@/lib/utils"
import { formatDateNoTime, shortenNumber } from "@/utilities/utils"

function Discount({_id, status, expriedDate, discountValue, minOrderValue, type, handleClick, buttonTitle, code = "Điện tử", loading}) {
  return (
    <div className={cn(
      "w-full max-w-[400px] min-w-[320px] h-auto rounded-md flex flex-col sm:flex-row items-center shadow-coupon overflow-hidden",
    )}>
      {/* Left Section (Logo & Code) */}
      <div className='flex-1 h-full bg-orange-1 relative p-4'>
        <div className='w-[80px] h-[80px] bg-[url("/imgs/logoGolden.webp")] bg-cover bg-center bg-no-repeat mx-auto'></div>
        <p className={cn(code !== "Điện tử" && "tracking-wider text-center mt-2")}>{code}</p>
        
        {/* Decorative Circles */}
        <div className='absolute top-0 left-0 translate-x-[-50%] h-full w-fit flex flex-col justify-around'>
          {[...Array(7).keys()].map(item => (
            <div key={item} className='w-[10px] h-[10px] rounded-full bg-white mb-2'></div>
          ))}
        </div>
      </div>

      {/* Right Section (Details & Button) */}
      <div className='flex-[2] flex flex-col sm:flex-row gap-3 h-full py-4 px-3'>
        <div className='flex-[2.5] flex flex-col justify-between'>
          <p className='font-medium text-lg'>
            Giảm tối đa
            <span className='text-xl'>
              {type === 'FIXEDAMOUNT' ? 
                <><span className="text-red-1">{shortenNumber(discountValue)}k</span> <span>đơn {shortenNumber(minOrderValue)}k</span></> :
                <><span className="text-red-1">{discountValue}%</span> <span>đơn {shortenNumber(minOrderValue)}k</span></>
              }
            </span>
          </p>
          
          {/* Status or Minimum Order Info */}
          {code !== "Điện tử" ? (
            <p className='font-medium text-base text-gray-1'>
              TT: 
              {status === "USED" ? 
                <span className="text-red-1"> Đã dùng</span> :
                <span className="text-yellow-1"> Có sẵn</span>
              }
            </p>
          ) : (
            <p className='font-medium text-base text-gray-1'>Đơn tối thiểu {shortenNumber(minOrderValue)}k</p>
          )}
          
          {/* Expiry Date */}
          <p className='text-base text-gray-1 text-nowrap'>
            HSD: {formatDateNoTime(expriedDate)} 
            <span className='text-sm pl-1 text-[#1b74e4] cursor-pointer hover:underline'>điều kiện</span>
          </p>
        </div>

        {/* Button */}
        <div className='flex-1 flex items-center justify-center'>
          <button 
            disabled={loading} 
            onClick={() => handleClick(_id)} 
            className='w-full border border-orange-1 text-orange-1 text-lg rounded-sm transition-all duration-300 ease-in-out hover:shadow-panel'
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Discount
