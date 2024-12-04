import { cn } from "@/lib/utils"
import { formatDateNoTime, shortenNumber } from "@/utilities/utils"

function Discount({_id ,status, expriedDate, discountValue, minOrderValue, type, handleClick, buttonTitle, code = "Điện tử", loading}) {
  return (
        <div className={cn(
          "w-[400px] min-w-[400px] h-[130px] min-h-[130px] rounded-md flex items-center shadow-coupon overflow-hidden",
          // code !== 'Điện tử' ? 'h-[130px]' : 'h-[130px]' 
        )}>
          <div className='flex-1 h-full bg-orange-1 relative'>
            <div className='w-full h-full flex flex-col items-center justify-center text-white'>
              <div className="w-[100px] h-[80px] bg-[url('/imgs/logoGolden.webp')] bg-cover bg-center bg-no-repeat">
              </div>
               <p className={cn(
                code !== "Điện tử" && "tracking-wider"
               )}>{code}</p>
            </div>
            <div className='absolute top-0 left-0 translate-x-[-50%] h-full w-fit flex flex-col justify-around'>
             {
                [...Array(7).keys()].map(item=>(
                    <div className='w-[10px] h-[10px] rounded-full bg-white'></div>
                ))
             }
            </div>
          </div>
          <div className='flex-[2] flex gap-2 h-full py-4 px-3 '>
            <div className='flex-[2.5] flex flex-col justify-between text-wrap'>
              <div>
              <p className='font-medium text-lg'>Giảm tối đa
                <span className=' text-xl'>{
                type === 'FIXEDAMOUNT'? 
                <><span className="text-red-1"> {shortenNumber(discountValue)}k</span> <span>đơn {shortenNumber(minOrderValue)}k</span></>:
                <><span className="text-red-1"> {discountValue}%</span> <span>đơn {shortenNumber(minOrderValue)}k</span></>
                }</span>
              </p>
              {
                code !== "Điện tử" ? (
                  <p className='font-medium text-base text-gray-1'>
                    TT: 
                    {
                      status === "USED" ? 
                      <span className="text-red-1"> Đã dùng</span>:
                      <span className="text-yellow-1"> Có sẵn</span>
                    }
                  </p>
                ) : (
                 <p className='font-medium text-base text-gray-1'>Đơn tối thiểu {shortenNumber(minOrderValue)}k</p>
                )
              }
              </div>
              <p className='text-base text-gray-1 text-nowrap'>HSD: {formatDateNoTime(expriedDate )} <span className='text-sm pl-1 text-[#1b74e4] cursor-pointer hover:underline'>điều kiện</span></p>
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <button disabled={loading} onClick={()=>handleClick(_id)} className='w-full border border-orange-1 text-orange-1 text-lg rounded-sm transition-all duration-300 ease-in-out hover:shadow-panel'>
                  {buttonTitle}
                </button>
            </div>

            
          </div>
        </div>
  )
}

export default Discount