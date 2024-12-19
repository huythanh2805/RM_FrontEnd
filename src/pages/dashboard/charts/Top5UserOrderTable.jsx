import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

function Top5UserOrderTable({top5UserOrder}) {
    console.log({top5UserOrder})
  return (
    <Table>
      <TableCaption>Top 5 người dùng ăn lên đơn nhiều nhất</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Tên</TableHead>
          <TableHead>SDT</TableHead>
          <TableHead className="text-nowrap">Số lượng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {top5UserOrder.map((item) => (
          <TableRow>
            <TableCell className="font-medium">{item.userName}</TableCell>
            <TableCell>{item.phoneNumber}</TableCell>
            <TableCell className="text-right">{item.totalOrders}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Top5UserOrderTable