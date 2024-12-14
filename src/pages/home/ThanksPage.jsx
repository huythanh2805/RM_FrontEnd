import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useCart } from '@/contexts/CartProvider';
function ThanksPage() {
  const { clearCart } = useCart()
    // const [searchParams] = useSearchParams();
    // const extraData = searchParams.get("extraData");

    // // Giải mã extraData
    // const data = JSON.parse(Buffer.from(extraData, "base64").toString("utf-8"));
    // console.log({data})
    useEffect(()=>{
      clearCart()
    },[])
  return (
    <div>ThanksPage</div>
  )
}

export default ThanksPage