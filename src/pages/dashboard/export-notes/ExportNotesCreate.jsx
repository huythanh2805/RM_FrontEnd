import { useCreateExportNotes } from "@/hooks/dashboard/export-notes/useCreate";
import { TYPE_EXPORT_NOTES_OBJECT } from "@/utilities/const";
import { formatCurrency } from "@/utilities/utils";
import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ExportNotesCreate = () => {
  const { TextArea } = Input;

  // State để quản lý từ khóa tìm kiếm trong modal
  const [searchKeyword, setSearchKeyword] = useState("");

  const calculateTimeLeft = (expiryDate) => {
    if (!expiryDate) return { text: "Không xác định", color: "text-gray-500" };
    const now = new Date();
    const expiry = new Date(expiryDate);
    const nowStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const expiryStartOfDay = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
    const timeDifference = expiryStartOfDay - nowStartOfDay;
    if (timeDifference < 0) {
      return { text: "Đã hết hạn", color: "text-red-600" };
    }
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysLeft > 2) {
      return { text: `${daysLeft} ngày nữa hết hạn`, color: "text-green-600" };
    } else if (daysLeft > 0) {
      return { text: `${daysLeft} ngày nữa hết hạn`, color: "text-yellow-600" };
    } else {
      const hoursLeft = Math.floor((expiry - now) / (1000 * 60 * 60));
      if (hoursLeft > 0) {
        return { text: `${hoursLeft} giờ nữa hết hạn`, color: "text-yellow-600" };
      }
      const minutesLeft = Math.floor((expiry - now) / (1000 * 60));
      return { text: `${minutesLeft} phút nữa hết hạn`, color: "text-yellow-600" };
    }
  };

  const {
    stocksDataStatus = [], // Đảm bảo giá trị mặc định là mảng
    listProduct,
    form,
    initialValues,
    isModalOpen,
    rowSelection,
    showModal,
    handleOk,
    handleCancel,
    handleCreateExportNotes,
  } = useCreateExportNotes();

  // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
  const filteredStocksData = Array.isArray(stocksDataStatus)
    ? stocksDataStatus.filter((item) => {
      const productName = item.product?.name?.toLowerCase() || "";
      const productCode = item.product?.code?.toLowerCase() || "";
      const keyword = searchKeyword.toLowerCase();

      return productName.includes(keyword) || productCode.includes(keyword);
    })
    : [];

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Thêm mới phiếu xuất</h2>
        <Form layout="vertical" form={form} initialValues={initialValues}>
          {/* Form Nhập thông tin */}
          <Form.Item label="Mã phiếu xuất" name="code" rules={[{ required: true, message: "Please input!" }]}>
            <Input placeholder="Nhập mã phiếu xuất" />
          </Form.Item>
          <Form.Item label="Loại phiếu xuất" name="type" rules={[{ required: true, message: "Please input!" }]}>
            <Select
              showSearch
              placeholder="Chọn loại phiếu xuất"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={TYPE_EXPORT_NOTES_OBJECT.map((item) => ({
                value: item?.value,
                label: item?.title,
              }))}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="notes">
            <TextArea rows={4} placeholder="Nhập ghi chú" />
          </Form.Item>

          {/* Bảng danh sách sản phẩm */}
          <div className="bg-white px-4 py-6 rounded-lg">
            <Button type="primary" onClick={showModal}>
              Chọn sản phẩm
            </Button>
            <Modal
              title="Chọn sản phẩm"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width="80%"
            >
              {/* Bộ lọc sản phẩm */}
              <div className="mb-4">
                <Input
                  placeholder="Tìm kiếm sản phẩm theo tên hoặc mã sản phẩm..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Table
                rowKey="_id"
                rowSelection={rowSelection}
                dataSource={filteredStocksData}
                columns={[
                  {
                    title: "Mã sản phẩm",
                    dataIndex: "code",
                    key: "code",
                    render: (_, record) => record?.product?.code,
                  },
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "name",
                    key: "name",
                    render: (_, record) => record?.product?.name,
                  },
                  {
                    title: "Giá SP",
                    dataIndex: "price",
                    key: "price",
                    render: (_, record) => formatCurrency(record?.price),
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                    render: (_, record) => record?.quantity,
                  },
                  {
                    title: "Ngày hết hạn",
                    dataIndex: "expiryDate",
                    key: "expiryDate",
                    render: (_, record) => {
                      const { text, color } = calculateTimeLeft(record?.expiryDate);
                      return <span className={color}>{text}</span>;
                    },
                  },
                ]}
              />
            </Modal>
            <Form.Item name="items">
              <Table
                className="mt-5"
                dataSource={listProduct}
                rowKey="_id"
                columns={[
                  {
                    title: "Mã sản phẩm",
                    dataIndex: "code",
                    key: "code",
                    render: (_, record) => record?.product?.code,
                  },
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "name",
                    key: "name",
                    render: (_, record) => record?.product?.name,
                  },
                  {
                    title: "Giá sản phẩm",
                    dataIndex: "price",
                    key: "price",
                    render: (_, record) => record?.price,
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "export_quantity",
                    key: "export_quantity",
                    render: (_, record, index) => (
                      <Form.Item
                        name={["items", index, "export_quantity"]}
                        rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
                      >
                        <InputNumber
                          type="number"
                          placeholder="Nhập số lượng"
                          min={1}
                          max={record?.quantity}
                        />
                      </Form.Item>
                    ),
                  },
                ]}
              />
            </Form.Item>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-2 mt-5">
            <Link
              to="/admin/export-notes"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
            >
              Quay lại
            </Link>

            <button
              type="submit"
              className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition"
              onClick={() => handleCreateExportNotes()}
            >
              Tạo mới +
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
