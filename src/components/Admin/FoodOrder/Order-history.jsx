import Pagination from "@/components/Pagination";
import { toast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { usePatchData } from "@/hooks/usePatchData";
import { usePostData } from "@/hooks/usePostData";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, getOrderHistoryUniqueAndLatest, getStatusMessage, ServerUrl } from "@/utilities/utils";
import { Button } from "antd";
import jwtDecode from "jwt-decode";
import { debounce } from "lodash";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderHistory() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([])
  const [decodedToken, setDecodeToken] = useState(() => {
    const token = localStorage.getItem('token')
    return jwtDecode(token)
  })
  const { data: orderDishHistory, loading: OrderDishHistoryLoading } = useFetchData(`${ServerUrl}/order-dish-history/${id}`)
  // Xử lý khi dữ liệu đang tải hoặc gặp lỗi
  useEffect(() => {
    if (orderDishHistory) setProducts([...orderDishHistory.map(item => {
      if (item.ordered_dish) return { ...item, name: item.ordered_dish.dish_id.name }
      if (item.ordered_combo) return { ...item, name: item.ordered_combo.setComboProduct_id.combo_id.name }
      return item
    })])
  }, [orderDishHistory])
  const handleSearchValueDebounced = debounce((value) => {
    setSearchValue(value);
  }, 300);
  const handleSearchValue = (e) => {
    handleSearchValueDebounced(e.target.value);
  };
  // Lọc lịch sử đặt món theo code
  const filteredUsers = products
    .filter((item) =>
      item.code.toLowerCase().includes(searchValue.toLowerCase())
    );

  // Tính toán cho phân trang
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // Xử lý khi thay đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  // Xử lý xóa order
  const handleChangeStatusDish = async (orderedFoodId, reservation_id, code, newStatus, order_history_id) => {
    const orderHistory = products.find(orderHistory => orderHistory._id === order_history_id)
    if (orderHistory.currentStatus !== "ORDERED") {
      usePostData(`${ServerUrl}/api/notification`,
        {
          title: 'Yêu Cầu Hủy Đơn',
          message: `${orderHistory.reservation_id.table_id.name} muốn hủy món ăn có mã ${orderHistory.code}`,
          orderedCode: code,
          orderHistoryId: order_history_id
        })
      setProducts(pre => [...pre.map(item => item._id === order_history_id ? { ...item, isRequiredToCancel: true } : item)])
      return toast({ variant: 'success', title: 'Yêu cầu của bạn đã được gửi đến quản lí nhà bếp và chờ xác nhận' })
    }
    const { success } = await usePatchData(`${ServerUrl}/api/orderedFood`, {
      orderedFoodId,
      newStatus,
      reservation_id,
      changer_id: decodedToken.id,
      code,
    })

    if (success) {
      toast({
        variant: "success",
        title: `Trạng thái đã đổi -> ${getStatusMessage(newStatus)}`
      })
      // Thành công thì tạo thêm 1 order history ở client
      const orderHistory = products.find(orderHistory => orderHistory._id === order_history_id)
      setProducts(pre => [...pre, {
        code,
        reservation_id,
        currentStatus: newStatus,
        previousStatus: orderHistory.currentStatus,
        changer_id: { ...orderHistory.changer_id },
        ordered_dish: { ...orderHistory.ordered_dish },
        createdAt: new Date()
      }])
    }
    if (!success) return toast({
      variant: "destructive",
      title: `Cập nhật không thành công`
    })
  }
  const handleChangeStatusCombo = async (orderedFoodId, reservation_id, code, newStatus, order_history_id) => {
    const orderHistory = products.find(orderHistory => orderHistory._id === order_history_id)
    if (orderHistory.currentStatus !== "ORDERED") {
      usePostData(`${ServerUrl}/api/notification`,
        {
          title: 'Yêu Cầu Hủy Đơn',
          message: `${orderHistory.reservation_id.table_id.name} muốn hủy món ăn có mã ${orderHistory.code}`,
          orderedCode: code,
          orderHistoryId: order_history_id
        })
      setProducts(pre => [...pre.map(item => item._id === order_history_id ? { ...item, isRequiredToCancel: true } : item)])
      return toast({ variant: 'success', title: 'Yêu cầu của bạn đã được gửi đến quản lí nhà bếp và chờ xác nhận' })
    }
    const { success } = await usePatchData(`${ServerUrl}/api/orderedCombo`, {
      orderedFoodId,
      newStatus,
      reservation_id,
      changer_id: decodedToken.id,
      code,
    })
    if (success) {
      toast({
        variant: "success",
        title: `Trạng thái đã đổi -> ${getStatusMessage(newStatus)}`
      })
      // Thành công thì tạo thêm 1 order history ở client
      setProducts(pre => [...pre, {
        code,
        reservation_id,
        currentStatus: newStatus,
        previousStatus: orderHistory.currentStatus,
        changer_id: { ...orderHistory.changer_id },
        ordered_combo: { ...orderHistory.ordered_combo },
        createdAt: new Date()
      }])
    }
    if (!success) return toast({
      variant: "destructive",
      title: `Cập nhật không thành công`
    })
  }
  console.log({ products })
  if (OrderDishHistoryLoading) return <p className="text-center text-blue-600">Loading...</p>;
  return (

    <div >
      <p className="text-3xl font-semibold text-gray-800">
        Danh sách người dùng
      </p>
      {/* Bộ lọc người dùng */}
      <div className="mb-4">
        <div className="relative w-full max-w-sm min-w-[200px]">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>

          <input
            type="text"
            id="Search"
            placeholder="Tìm kiếm..."
            className="bg-white border border-gray-300 text-gray-900 text-sl rounded-lg w-full p-2.5"
            onChange={handleSearchValue}
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-700"
            >
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="overflow-x-auto rounded-xl border ">
        <table className="min-w-full">
          <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
            <tr>
              <th className="hidden lg:table-cell py-3 px-6 text-left text-sl font-semibold text-gray-700 w-[50px]">
                STT
              </th>
              <th className="hidden lg:table-cell py-3 px-6 text-left text-sl font-semibold text-gray-700 w-[100px]">
                Code
              </th>
              <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">
                Món ăn
              </th>
              <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700 w-[200px]">
                Người thao tác
              </th>
              <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700 w-[200px]">
                Thao tác lúc
              </th>
              <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700 w-[200px]">
                Trạng thái
              </th>
              <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                Trạng thái thay đổi
              </th>
              <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item._id}
                className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium">
                  {index + 1 + startIndex}
                </td>
                <td className="py-3 px-6 text-sl text-gray-800 break-words">
                  <div
                    onClick={() => {
                      toast({
                        variant: "info",
                        title: `Copy thành công ${item.code}`,
                      })
                      navigator.clipboard.writeText(item.code)
                    }}
                    className="cursor-pointer group flex items-center gap-1"
                  >
                    <p>{item.code}</p>
                    <Copy
                      width={15}
                      height={15}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </td>
                <td className="py-3 px-6 text-sl text-gray-800 break-words">
                  {item.ordered_combo && (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-[80px] h-[80px] rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={
                            item.ordered_combo.setComboProduct_id.combo_id
                              .images[0]
                          }
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className={"font-medium font-mono text-lg"}>
                          {
                            item.ordered_combo.setComboProduct_id.combo_id
                              .name
                          }
                        </p>
                        <p className="font-mono">
                          {formatCurrency(
                            item.ordered_combo.setComboProduct_id.combo_id
                              .price
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  {item.ordered_dish && (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-[80px] h-[80px] rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={item.ordered_dish.dish_id.images[0]}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className={"font-medium font-mono text-lg"}>
                          {item.ordered_dish.dish_id.name}
                        </p>
                        <p className="font-mono">
                          {formatCurrency(
                            item.ordered_dish.dish_id.price
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-6 text-sl text-gray-800 break-words">
                  {item.changer_id?.userName}
                </td>
                <td className="py-3 px-6 text-sl text-gray-800 break-words">
                  {formatDate(item.createdAt)}
                </td>
                <td className="py-3 px-6 text-sl text-gray-800 break-words">
                  {item.currentStatus && (
                    <div
                      className={cn(
                        "w-full px-2 py-1 rounded-lg text-white text-center text-lg",
                        item.currentStatus === "ISPREPARED" &&
                        "bg-light-warning",
                        item.currentStatus === "ORDERED" && "bg-purple-1",
                        item.currentStatus === "ISCOMPLETED" &&
                        "bg-light-success ",
                        item.currentStatus === "ISCANCELED" && "bg-red-1"
                      )}
                    >
                      {getStatusMessage(item.currentStatus)}
                    </div>
                  )}
                </td>
                <td className="py-3 px-6 text-sl text-gray-800 break-words">
                  {item.currentStatus && item.previousStatus && (
                    <div className="w-full items-center justify-between">
                      <span>{getStatusMessage(item.previousStatus)}</span>
                      <span className="px-10">{"->"}</span>
                      <span>{getStatusMessage(item.currentStatus)}</span>
                    </div>
                  )}
                </td>
                <td className="h-full py-3 px-6 text-sl  gap-3">
                  {
                    getOrderHistoryUniqueAndLatest(products).includes(item._id) && item.currentStatus !== "ISCANCELED" && !item.isRequiredToCancel
                    && (<Button
                      onClick={() => {
                        item.ordered_dish ?
                          handleChangeStatusDish(item.ordered_dish._id, item.reservation_id, item.code, "ISCANCELED", item._id) :
                          handleChangeStatusCombo(item.ordered_combo._id, item.reservation_id, item.code, "ISCANCELED", item._id)
                      }}
                      type="button"
                      className="mr-4 font-medium text-[16px] bg-red-1 text-white hover:opacity-80 transition-all duration-300 ease-in-out"
                    >
                      Hủy món
                    </Button>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          onPageChange={handlePageClick}
        />
      )}
    </div>

  )
}

export default OrderHistory