import { toast } from "@/hooks/use-toast";
import { createExportNotesService } from "@/services/export-notes";
import { fetchStocksService, fetchStocksServiceStatus } from "@/services/stocks";
import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateExportNotes = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [listProduct, setListProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const initialValues = {
    name: "",
    code: "",
    email: "",
    phone: "",
    description: "",
    address: "",
    items: listProduct,
  };

  const rowSelection = {
    selectedItems,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedItems(selectedRows);
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setListProduct(selectedItems);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: stocksData } = useQuery({
    queryKey: ["fetchStocksService"],
    queryFn: fetchStocksService,
  });
  const { data: stocksDataStatus } = useQuery({
    queryKey: ["fetchStocksServiceStatus"],
    queryFn: fetchStocksServiceStatus,
  });


  const handleCreateExportNotes = async () => {
    form.validateFields().then(() => {
      const formData = form.getFieldsValue();
      const mergedArray = listProduct?.map((item, index) => ({ ...item, ...formData.items[index] })); console.log(mergedArray);

      const createData = {
        code: formData?.code,
        stocks: mergedArray?.map((item) => {
          return {
            stock: item?._id,
            quantity: item?.export_quantity,
            price: item?.price,
            maxQuantity: item?.quantity,
          };
        }),
        notes: formData?.notes,
        type: formData?.type,
        total: mergedArray?.reduce((sum, item) => sum + (item?.price || 0) * (item?.export_quantity || 0), 0),
      };

      createExportNotesService(createData)
        .then(() => {
          toast({ variant: "success", title: "Thêm phiếu xuất thành công!" });
          form.resetFields();
          navigate("/admin/export-notes");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
          toast({
            variant: "destructive",
            title: "Lỗi khi thêm phiếu xuất",
            description: errorMessage,
          });
        });
    });
  };

  return {
    stocksData, stocksDataStatus,
    listProduct,
    form,
    initialValues,
    isModalOpen,
    rowSelection,
    showModal,
    handleOk,
    handleCancel,
    handleCreateExportNotes,
  };
};
