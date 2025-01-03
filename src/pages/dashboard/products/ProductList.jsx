import Navbar from "@/components/Admin/Navbar";
import Pagination from "@/components/Pagination";
import { useList } from "@/hooks/dashboard/products/useList";
import { formatCurrency, formatDateNoTime } from "@/utilities/utils";
import { debounce } from "lodash";
import { useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ProductList = () => {
  const { productsData, isLoading, error, deleteProducts } = useList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueDebounced = debounce((value) => {
    setSearchValue(value);
  }, 300);

  const handleSearchValue = (e) => {
    handleSearchValueDebounced(e.target.value);
  };

  // Xử lý khi dữ liệu đang tải hoặc gặp lỗi
  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error loading product list.</p>;

  // Hàm xóa người dùng
  const handleDeleteProduct = (productID) => {
    Swal.fire({
      title: "Xác nhận xóa sản phẩm?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducts(productID)
          .then(() => {
            Swal.fire({
              title: "Đã xóa!",
              text: "Sản phẩm đã được xóa thành công.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Lỗi!",
              text: "Không thể xóa sản phẩm. Vui lòng thử lại.",
              icon: "error",
            });
            console.error(err);
          });
      }
    });
  };

  // Lọc người dùng theo vai trò và tìm kiếm
  const filteredProducts = productsData?.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Tính toán cho phân trang
  const totalItems = filteredProducts?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Danh sách thực phẩm</h1>
          <Link to="/admin/products/create">
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sl font-semibold hover:bg-green-300 transition">
              Thêm mới +
            </div>
          </Link>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            {/* Input Tìm Kiếm */}
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
                <button type="button" className="text-gray-600 hover:text-gray-700">
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
        </div>

        {/* Bảng danh sách người dùng */}
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-sl font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:table-cell py-3 px-6 text-sl font-semibold text-gray-700 text-center">STT</th>
                <th className="py-3 px-6 text-left text-sl font-semibold text-gray-700">Thông tin SP</th>
                <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">Danh mục</th>
                <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">Đơn vị</th>
                <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">Giá</th>
                <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">Ngày hết hạn</th>
                <th className="py-3 px-6 text-center text-sl font-semibold text-gray-700">NV phụ trách</th>
                <th className="py-3 px-6 text-sl font-semibold text-gray-700 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((product, index) => (
                <tr key={product._id} className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition">
                  <td className="py-3 px-6 text-sl text-gray-800 break-words font-medium text-center">
                    {index + 1 + startIndex}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words">
                    <div>{product?.code}</div>
                    <div>{product?.name}</div>
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">{product?.category}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">{product?.unit}</td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">
                    {formatCurrency(product?.price)}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">
                    {formatDateNoTime(product?.expiryDate)}
                  </td>
                  <td className="py-3 px-6 text-sl text-gray-800 break-words text-center">
                    {product?.createdBy?.userName}
                  </td>

                  <td className="py-3 px-6 text-sl flex items-center gap-3 justify-center">
                    <Link to={`/admin/products/update/${product?._id}`}>
                      <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg text-sl font-semibold hover:bg-yellow-300 transition">
                        <FaPenToSquare size={18} />
                      </div>
                    </Link>
                    <div
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-sl font-semibold hover:bg-red-300 transition"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaRegTrashCan size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={(e) => setCurrentPage(e.selected + 1)} />}
      </div>
    </div>
  );
};
