import { useCart } from "@/contexts/CartProvider"
import { toast } from "@/hooks/use-toast"
import { useFetchData } from "@/hooks/useFetchData"
import { ServerUrl } from "@/utilities/utils"
import jwtDecode from "jwt-decode"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { io } from "socket.io-client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export const Checkout = () => {
  const [reservationDetails, setReservationDetails] = useState(null)
  const [prePayment, setPrePayment] = useState('25')
  const [paymentMethod, setPaymentMethod] = useState('CASH')
  const [totalDeposit, setTotalDeposit] = useState(0)
  const [loading, setLoading] = useState(false)
  const [decodedToken, setDecodeToken] = useState(() => {
    const token = localStorage.getItem("token")
    if (!token) return null
    return jwtDecode(token)
  })
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { data: userDiscounts } = useFetchData(
    `${ServerUrl}/api/userDiscount/reservation/client/getAvailableStatus/${decodedToken?.id}`
  )
  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem("postData")) || []
    setReservationDetails(storedDetails)
  }, [])

  useEffect(() => {
    const socket = io("http://localhost:1111")
    socket.on("notification", (notification) => {
      if (decodedToken?.id) {
        navigate(`/history/${decodedToken.id}`)
        return toast({
          variant: "success",
          title: "Thanh Toán thành công",
        })
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [decodedToken.id, navigate])
  console.log({reservationDetails})
  console.log({userDiscounts})
  // Tính tổng tiền món ăn
  const computeTotalAmount = useMemo(() => {
    return reservationDetails?.dishs.reduce((total, dish) => total + dish.price * dish.quantity, 0)
  }, [reservationDetails]);
   // Tính số tiền giảm giá
   const discountAmount = useMemo(()=>{
    if(Number(prePayment) === 100 && reservationDetails.couponValue){
      if (!userDiscounts || userDiscounts.length === 0) {
        return 0
      }
  
      const discount = userDiscounts.find((item) => item._id === reservationDetails.couponValue)
      if (!discount) return 0
      // Tính toán theo loại giảm giá
      if (discount.discountId.discountType === "PERCENTAGE") {
        // Giảm theo phần trăm
        return (computeTotalAmount * discount.discountId.discountValue) / 100
      } else if (discount.discountId.discountType === "FIXEDAMOUNT") { 
        // Giảm theo số tiền cố định
        return discount.discountId.discountValue
      }
    }
   return 0
  },[prePayment, reservationDetails, computeTotalAmount])
  // Tính tiền VAT
  const vat = useMemo(() => {
    const afterDiscountedAmount = computeTotalAmount - discountAmount
    return (afterDiscountedAmount * 5) / 100
  }, [prePayment]);
  // Tính số tiền cọc trước 
  useEffect(()=>{
    setTotalDeposit((computeTotalAmount * Number(prePayment)) / 100) 
    if(discountAmount){
      setTotalDeposit(pre=> pre - discountAmount)
    }
  },[prePayment, computeTotalAmount, discountAmount])
  // Tính số tiền cọc trước 
  useEffect(()=>{
    if(Number(prePayment) === 100){
      setTotalDeposit(pre=> pre + vat)
    }
  },[prePayment])
 
  const handlePayment = async () => {
    if (!reservationDetails) {
      return toast({
        variant: "destructive",
        title: "Không tìm thấy thông tin đặt bàn.",
      })
    }
    if (Number(totalDeposit) === 0 && paymentMethod !== 'CASH') {
      return toast({
        variant: "destructive",
        title: "Số tiền đặt cọc phải tồn tại",
      })
    }
    if(type === "UPDATE" && paymentMethod === 'CASH') 
      return toast({
        variant: "destructive",
        title: "Bạn phải thanh toán online",
      })

    const url = paymentMethod === 'CASH' ?
     `${ServerUrl}/api/reservations/v2/client` :
     paymentMethod === "ZALOPAY" ?
     `${ServerUrl}/api/payment/zalo`:
     `${ServerUrl}/api/payment`
    try {
      setLoading(true)
      const isUsedDiscount = reservationDetails.couponValue && Number(prePayment) === 100
      const res = await fetch(url,{
        method: "POST",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify({
           ...reservationDetails,
           type,
           totalPrice: totalDeposit,
           payment_method: paymentMethod,
           deposit: paymentMethod === "CASH" ? 0 : totalDeposit,
           isUsedDiscount,
           isOrderedOnline: true,
          })
      })
      const data = await res.json()
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: data.message,
        })
      }
      setLoading(false)
      clearCart()
     if(paymentMethod === 'CASH') return navigate(`/history/${decodedToken.id}`)

     if(paymentMethod === 'MOMO') window.location = data.data.payUrl
     if(paymentMethod === 'ZALOPAY') window.location = data.data.order_url
     
    } catch (error) {
      console.log({error})
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something went wrong with create reservation",
      })
      
    } finally {
      setLoading(false)
    }
  }
  if (!reservationDetails) {
    return <div>Loading...</div>
  }
  const formattedDate = new Date(
    reservationDetails.startTime
  ).toLocaleDateString()
  const formattedTime = new Date(
    reservationDetails.startTime
  ).toLocaleTimeString()
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }
  const handleBack = () => {
    navigate(`/reservation`)
  }
  return (
    <div>
      <div className="relative w-full h-[200px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/imgs/pagetitle-reservation.jpg')",
            backgroundAttachment: "fixed",
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold">
            Thanh Toán
          </h1>
          <p className="text-4xl md:text-xl sm:text-xl mt-4 flex items-center justify-center">
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
            <span className="ml-4">Vui lòng thanh toán trước 25% hóa đơn</span>
            <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
          </p>
        </div>
      </div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
          <div className="flex items-start flex-col gap-6 xl:flex-row">
            <div className="order-2 xl:order-1 w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200">
                  Thông tin đặt bàn
                </h2>
                <div className="data pt-6 pb-3 border-b border-gray-200">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Họ tên
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {reservationDetails.userName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Số điện thoại
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-600">
                      {reservationDetails.phoneNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Ngày đặt
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Giờ đặt
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {formattedTime}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Số người
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {reservationDetails.guests_count} người
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Tổng tiền
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {formatCurrency(computeTotalAmount)}{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Giảm giá
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {formatCurrency(discountAmount)} 
                    </p>
                  </div>
                 {
                  Number(prePayment) === 100 && 
                  <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                   VAT
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">
                  (5%) {formatCurrency(vat)} 
                  </p>
                </div>
                 }
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      {`Thanh toán trước ( ${prePayment}% )`}
                    </p>
                    <p className="font-medium text-lg leading-8 text-gray-900">
                      {formatCurrency(totalDeposit)}
                    </p>
                  </div>
                  {Number(prePayment)!== 100} <div className="text-sm text-red-1">Thanh toán 100% sẽ áp mã giảm giá và tính thuế</div>
                </div>

                <div className="flex items-center justify-between gap-4 mb-5 pt-3">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Thanh toán trước
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">
                    <Select value={prePayment} onValueChange={setPrePayment}>
                      <SelectTrigger className="w-[180px] focus-visible::border-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:border-b-blue-1">
                        <SelectValue placeholder="Theme" className="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25%</SelectItem>
                        <SelectItem value="50">50%</SelectItem>
                        <SelectItem value="75">75%</SelectItem>
                        <SelectItem value="100">100%</SelectItem>
                      </SelectContent>
                    </Select>
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 mb-5 ">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    PTTT
                  </p>
                  <p className="font-medium text-lg leading-8 text-gray-900">
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="w-[180px] focus-visible::border-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:border-b-blue-1">
                        <SelectValue placeholder="Theme" className="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASH">Tiền mặt</SelectItem>
                        <SelectItem value="MOMO">MoMo</SelectItem>
                        <SelectItem value="ZALOPAY">ZaloPay</SelectItem>
                      </SelectContent>
                    </Select>
                  </p>
                </div>

              </div>
            </div>
            <div className="w-full order-1 xl:order-2 2xl:min-w-[824px] max-w-sm md:max-w-3xl max-xl:mx-auto  ">
              <div className="grid grid-cols-1 gap-6">
                {Array.isArray(reservationDetails.dishs) &&
                reservationDetails.dishs.length > 0 ? (
                  reservationDetails.dishs.map((orderedDish, index) => (
                    <div
                      key={orderedDish._id}
                      className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400"
                    >
                      <div className="img-box">
                        {orderedDish.image ? (
                          <img
                            src={orderedDish.image}
                            alt={orderedDish.name}
                            className="w-full md:max-w-[122px] rounded-lg object-cover"
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                        <div>
                          <h2 className="font-medium text-xl leading-8 text-black mb-3">
                            {orderedDish.dish_id.name}
                          </h2>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                          <h6 className="font-medium text-xl leading-8 text-600">
                            Số lượng: {orderedDish.quantity}
                          </h6>
                          <h6 className="font-medium text-xl leading-8 text-600">
                            Giá : {formatCurrency(orderedDish.price)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No dishes found</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={handleBack}
          >
            Quay lại
          </button>

          {reservationDetails && (
            <button
              disabled={loading}
              className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={handlePayment}
            >
              {Number(prePayment) === 100 ? "Thanh toán hết" : paymentMethod === "CASH" ? "Tạo đơn" : "Cọc"}
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
