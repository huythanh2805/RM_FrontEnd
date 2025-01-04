import { toast } from "@/hooks/use-toast";
import { createExportNotesService } from "@/services/export-notes";
import { fetchProductsService } from "@/services/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateExportNotes = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
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

  const { data: productsData } = useQuery({
    queryKey: ["fetchProductsService"],
    queryFn: fetchProductsService,
  });

  const handleQuantityChange = (index, value) => {
    const updatedListProduct = [...listProduct];
    updatedListProduct[index].quantity = value;
    form.setFieldsValue({ items: updatedListProduct });
  };

  const handleCreateExportNotes = async () => {
    form.validateFields().then(() => {
      const formData = form.getFieldsValue();

      const createData = {
        code: formData?.code,
        products: formData?.items?.map((item) => {
          return {
            product: item?._id,
            quantity: item?.quantity,
            price: item?.price,
          };
        }),
        notes: formData?.notes,
        type: formData?.type,
        total: formData?.items?.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0),
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
            title: "Lỗi khi thêm nhà cung cấp",
            description: errorMessage,
          });
        });
    });
  };

  return {
    productsData,
    listProduct,
    form,
    initialValues,
    isModalOpen,
    rowSelection,
    showModal,
    handleOk,
    handleCancel,
    handleQuantityChange,
    handleCreateExportNotes,
  };
};
