import { useCreateExportNotes } from "@/hooks/dashboard/export-notes/useCreate";
import { TYPE_EXPORT_NOTES_OBJECT } from "@/utilities/const";
import { formatCurrency } from "@/utilities/utils";
import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { Link } from "react-router-dom";

export const ExportNotesCreate = () => {
  const { TextArea } = Input;

  const {
    stocksData,
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

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <h2 className="text-[32px] font-semibold mb-4">Thêm mới phiếu xuất</h2>
        <Form layout="vertical" form={form} initialValues={initialValues}>
          <Form.Item label="Mã phiếu xuất" name="code" rules={[{ required: true, message: "Please input!" }]}>
            <Input placeholder="Nhập mã phiếu xuất" />
          </Form.Item>
          <Form.Item label="Loại phiếu xuất" name="type" rules={[{ required: true, message: "Please input!" }]}>
            <Select
              showSearch
              placeholder="Select a person"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={TYPE_EXPORT_NOTES_OBJECT.map((item) => {
                return { value: item?.value, label: item?.title };
              })}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="notes" rules={[{ required: true, message: "Please input!" }]}>
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          </Form.Item>
          <div className="bg-white px-4 py-6 rounded-lg">
            <Button type="primary" onClick={showModal}>
              Chọn sản phẩm
            </Button>
            <Modal title="Chọn sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="80%">
              <Table
                rowKey="_id"
                rowSelection={rowSelection}
                dataSource={stocksData}
                columns={[
                  {
                    title: "Mã sản phẩm",
                    dataIndex: "code",
                    key: "code",
                    render: (_, record, index) => {
                      return record?.product?.code
                    }
                  },
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "name",
                    key: "name", render: (_, record, index) => {
                      return record?.product?.name
                    }
                  },
                  {
                    title: "Giá SP",
                    dataIndex: "price",
                    key: "price",
                    render: (_, record, index) => {
                      return formatCurrency(record?.price)
                    }
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                    render: (_, record, index) => {
                      return record?.quantity
                    }
                  },
                  {
                    title: "Ngày hết hạn",
                    dataIndex: "expiryDate",
                    key: "expiryDate",
                    render: (_, record, index) => {
                      return record?.expiryDate
                    }
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
                    render: (_, record, index) => {
                      return record?.product?.code
                    }
                  },
                  {
                    title: "Tên sản phẩm",
                    dataIndex: "name",
                    key: "name",
                    render: (_, record, index) => {
                      return record?.product?.name
                    }
                  },
                  {
                    title: "Giá sản phẩm",
                    dataIndex: "price",
                    key: "price",
                    render: (_, record, index) => {
                      return record?.price
                    }
                  },
                  {
                    title: "Giá SP",
                    dataIndex: "price",
                    key: "price",
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "export_quantity",
                    key: "export_quantity",
                    render: (_, record, index) => {
                      return (
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
                      );
                    },
                  },
                ]}
              />
            </Form.Item>
          </div>
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
