import { useFetchData } from "@/hooks/useFetchData";
import { formatCurrency, formatDate, ServerUrl } from "@/utilities/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "../Navbar";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

function ListDiscount() {
  const router = useNavigate()
  const [discounts, setDiscounts] = useState([])
  const { data: discountsData } = useFetchData(`${ServerUrl}/api/discount`);
  useEffect(()=>{
   if(discountsData) setDiscounts(discountsData)
  },[discountsData])

const deleteDiscountById = async (id) =>{
   try {
    const res = await fetch(`${ServerUrl}/api/discount/${id}`,{
      method: "DELETE"
    })
    const data = await res.json()
    if(!res.ok){
      toast({
        variant: "destructive",
        title: data.message,
      })
    }
    toast({
      variant: "success",
      title: data.message,
    })
    setDiscounts(preData=>[...preData.filter(item=> item._id !== id)])
   } catch (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong with delete discount",
    })
   }
  }
  const handleUpdateActive = async (currentIsActive, id)=>{
   const url =  ServerUrl + "/api/discount/"+id
    try {
      const res = await fetch(url, {
        headers: {
          'Content-type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({isActive: !currentIsActive})
      })
      const data = await res.json()
      if(!res.ok){
        return toast({
          variant: "destructive",
          title: data.message,
        })
      }
      setDiscounts(preVal=>[...preVal.map(item=> item._id === id ? {...item, isActive: !currentIsActive} : item)])
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <div className="w-full py-5">
          <Table>
            <TableCaption>Danh sách phiếu giảm giá</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px] text-lg truncate">
                  Tạo bởi
                </TableHead>
                <TableHead className="text-lg">Loại phiếu</TableHead>
                <TableHead className="text-lg">Giá trị phiếu</TableHead>
                <TableHead className="text-lg">Đơn hàng tối thiểu</TableHead>
                <TableHead className="text-lg">Ngày hết hạn</TableHead>
                <TableHead className="text-center w-[150px] text-lg">
                  Số lượng tạo
                </TableHead>
                <TableHead className="text-center w-[200px] text-lg">
                  Số lượng còn lại
                </TableHead>
                <TableHead className="text-lg min-w-[200px]">Trạng thái</TableHead>
                <TableHead className="text-lg ">Hoạt động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts &&
                discounts.map((discount) => (
                  <TableRow>
                    <TableCell className="text-lg">
                      {discount.createdBy.userName}
                    </TableCell>
                    <TableCell className="text-lg">
                      {discount.discountType === "FIXEDAMOUNT"
                        ? "Số tiền cố định"
                        : "Phần trăm"}
                    </TableCell>
                    <TableCell className="text-lg">
                      {discount.discountType === "FIXEDAMOUNT"
                        ? formatCurrency(discount.discountValue)
                        : `${discount.discountValue} %`}
                    </TableCell>
                    <TableCell className="text-lg">
                      {formatCurrency(discount.minOrderValue)}
                    </TableCell>
                    <TableCell className="text-lg">
                      {formatDate(discount.expireDate)}
                    </TableCell>
                    <TableCell className="text-center text-xl">
                      {discount.totalQuantity}
                    </TableCell>
                    <TableCell className="text-center text-xl">
                      {discount.remainingQuantity}
                    </TableCell>
                    <TableCell className="text-lg">
                      {discount.isActive ? (
                        <div className="py-1 px-3 rounded-lg bg-light-warning text-white w-fit">
                          Đang hoạt động
                        </div>
                      ) : (
                        <div className="py-1 px-3 rounded-lg bg-red-1 text-white w-fit">
                          Ngừng hoạt động
                        </div>
                      )}
                    </TableCell >
                    <TableCell className="text-center text-xl">
                      {/* <Button onClick={()=>deleteDiscountById(discount._id)}>Xóa</Button>
                      <Button onClick={()=>router('/admin/updateDiscount/'+discount._id)}>Sửa</Button> */}
                    <Switch 
                     className={'bg-blue-1'}
                    checked={discount.isActive} 
                    onCheckedChange={()=>handleUpdateActive(discount.isActive, discount._id)}
                     />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ListDiscount;
