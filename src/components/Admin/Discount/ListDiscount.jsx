import { useFetchData } from "@/hooks/useFetchData"
import { formatCurrency, formatDate, ServerUrl } from "@/utilities/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function ListDiscount() {
  const { data: discounts } = useFetchData(`${ServerUrl}/api/discount`)
  console.log({ discounts })
  return (
    <div className="max-w-screen-2xl mx-auto pt-16">
      <Table>
        <TableCaption>Danh sách phiếu giảm giá.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px] text-lg truncate">Tạo bởi</TableHead>
            <TableHead className="text-lg">Loại phiếu</TableHead>
            <TableHead className="text-lg">Giá trị phiếu</TableHead>
            <TableHead className="text-lg">Đơn hàng tối thiểu</TableHead>
            <TableHead className="text-lg">Ngày hết hạn</TableHead>
            <TableHead className="text-center w-[150px] text-lg">Số lượng tạo</TableHead>
            <TableHead className="text-center w-[200px] text-lg">Số lượng còn lại</TableHead>
            <TableHead className="text-lg">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
           discounts && discounts.map(discount=>(
              <TableRow>
                <TableCell className="text-lg">{discount.createdBy.userName}</TableCell>
                <TableCell className="text-lg">{
                 discount.discountType === 'FIXEDAMOUNT' ?
                 'Số tiền cố định':
                 'Phần trăm' 
                }</TableCell>
                <TableCell className="text-lg">{
                 discount.discountType === 'FIXEDAMOUNT' ?
                 formatCurrency(discount.discountValue) :
                 `${discount.discountValue} %`
                }</TableCell>
                <TableCell className="text-lg">{formatCurrency(discount.minOrderValue)}</TableCell>
                <TableCell className="text-lg">{formatDate(discount.expireDate)}</TableCell>
                <TableCell className="text-center text-xl">{discount.totalQuantity}</TableCell>
                <TableCell className="text-center text-xl">{discount.remainingQuantity}</TableCell>
                <TableCell className="text-lg">{
                 discount.isActive ?
                  <div className="py-1 px-3 rounded-lg bg-light-warning text-white w-fit">Đang hoạt động</div> :
                  <div className="py-1 px-3 rounded-lg bg-red-1 text-white w-fit">Ngừng hoạt động</div>
                }</TableCell>
          </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ListDiscount
