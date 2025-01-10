import { useCreateImportNotes } from "@/hooks/dashboard/import-notes/useCreate";
import { UNITS } from "@/utilities/const";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export const ImportNotesCreate = () => {
  const { TextArea } = Input;

  // Lấy dữ liệu từ hook
  const {
    productsData = [], // Giá trị mặc định là mảng rỗng
    listProduct = [], // Giá trị mặc định là mảng rỗng
    form,
    initialValues,
    isModalOpen,
    rowSelection,
    sellersData = [], // Giá trị mặc định là mảng rỗng
    showModal,
    handleOk,
    setCount,
    setListProduct,
    count,
    handleCancel,
    handleCreateImportNotes,
  } = useCreateImportNotes();

  // State cho tìm kiếm và lọc
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Lọc sản phẩm theo từ khóa và loại
  const filteredProducts = useMemo(() => {
    if (!productsData) return [];
    return productsData.filter((product) => {
      const matchesKeyword = product.name?.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesCategory = filterCategory === "" || product.category === filterCategory;
      return matchesKeyword && matchesCategory;
    });
  }, [productsData, searchKeyword, filterCategory]);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Xử lý lọc theo loại sản phẩm
  const handleFilterCategory = (value) => {
    setFilterCategory(value);
  };

  // Thêm một dòng mới vào bảng
  const handleAddRowTable = () => {
    const newData = {
      key: count,
      code: (
        <Form.Item
          name={["items", listProduct.length, "code"]}
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Input placeholder="Nhập mã sản phẩm" />
        </Form.Item>
      ),
      name: (
        <Form.Item
          name={["items", listProduct.length, "name"]}
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
      ),
      category: (
        <Form.Item
          name={["items", listProduct.length, "category"]}
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Input placeholder="Nhập loại sản phẩm" />
        </Form.Item>
      ),
      unit: (
        <Form.Item
          name={["items", listProduct.length, "unit"]}
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Select
            showSearch
            placeholder="Chọn đơn vị"
            options={UNITS?.map((item) => {
              return { value: item, label: item };
            })}
          />
        </Form.Item>
      ),
    };
    setListProduct([...listProduct, newData]);
    setCount(count + 1);
  };

  // Xóa một dòng khỏi bảng
  const handleDeleteRow = (key) => {
    setListProduct(listProduct.filter((item) => item.key !== key));
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Thêm mới phiếu nhập</h2>
        <Form layout="vertical" form={form} initialValues={initialValues}>
          {/* Thông tin phiếu nhập */}
          <Form.Item label="Mã phiếu nhập" name="code" rules={[{ required: true, message: "Vui lòng nhập!" }]}>
            <Input placeholder="Nhập mã phiếu nhập" />
          </Form.Item>
          <Form.Item label="Nhà cung cấp" name="seller" rules={[{ required: true, message: "Vui lòng nhập!" }]}>
            <Select
              showSearch
              placeholder="Chọn nhà cung cấp"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={sellersData.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="notes">
            <TextArea rows={4} placeholder="Nhập ghi chú" />
          </Form.Item>

          {/* Bảng sản phẩm */}
          <div className="bg-white px-4 py-6 rounded-lg">
            <Button type="primary" onClick={showModal}>
              Chọn sản phẩm có sẵn
            </Button>
            <Modal
              title="Chọn sản phẩm"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width="50%"
            >
              {/* Bộ lọc trong modal */}
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Tìm kiếm tên sản phẩm..."
                  value={searchKeyword}
                  onChange={handleSearch}
                  className="w-1/2"
                />
                <Select
                  placeholder="Lọc theo loại sản phẩm"
                  value={filterCategory}
                  onChange={handleFilterCategory}
                  className="w-1/2"
                >
                  <Select.Option value="">Tất cả loại sản phẩm</Select.Option>
                  {Array.from(new Set(productsData.map((p) => p.category))).map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Bảng danh sách sản phẩm */}
              <Table
                rowKey="_id"
                rowSelection={rowSelection}
                dataSource={filteredProducts}
                columns={[
                  {
                    title: "Mã sản phẩm",
                    dataIndex: "code",
                    key: "code",
                  },
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Loại SP",
                    dataIndex: "category",
                    key: "category",
                  },
                ]}
              />
            </Modal>
            <Form.Item name="items">
              <Table
                className="mt-5"
                dataSource={listProduct}
                rowKey="key"
                columns={[
                  {
                    title: "Mã SP",
                    dataIndex: "code",
                    key: "code",
                  },
                  {
                    title: "Tên SP",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Giá SP",
                    dataIndex: "price",
                    key: "price",
                    render: (_, record, index) => (
                      <Form.Item
                        name={["items", index, "price"]}
                        rules={[{ required: true, message: "Vui lòng nhập!" }]}
                      >
                        <InputNumber placeholder="Nhập giá sản phẩm" min={1} />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Đơn vị",
                    dataIndex: "unit",
                    key: "unit",
                  },
                  {
                    title: "Loại SP",
                    dataIndex: "category",
                    key: "category",
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                    render: (_, record, index) => (
                      <Form.Item
                        name={["items", index, "quantity"]}
                        rules={[{ required: true, message: "Vui lòng nhập!" }]}
                      >
                        <InputNumber type="number" placeholder="Nhập số lượng" min={1} />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Hạn sử dụng",
                    dataIndex: "expiryDate",
                    key: "expiryDate",
                    render: (_, record, index) => {
                      return (
                        <Form.Item
                          name={["items", index, "expiryDate"]}
                          rules={[{ required: true, message: "Vui lòng nhập!" }]}
                        >
                          <DatePicker
                            placeholder="Nhập hạn sử dụng"
                            disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)}
                          />
                        </Form.Item>
                      );
                    },
                  },
                  {
                    title: "Hành động",
                    dataIndex: "actions",
                    key: "actions",
                    render: (_, record) => (
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteRow(record.key)}
                      />
                    ),
                  },
                ]}
              />
              <Button
                onClick={handleAddRowTable}
                type="primary"
                style={{ marginBottom: 16 }}
                className="mt-5"
              >
                Thêm sản phẩm mới
              </Button>
            </Form.Item>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-2 mt-5">
            <Link
              to="/admin/import-notes"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
            >
              Quay lại
            </Link>

            <button
              type="submit"
              className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-300 transition"
              onClick={() => handleCreateImportNotes()}
            >
              Tạo mới +
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
