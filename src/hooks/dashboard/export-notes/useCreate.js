import { toast } from "@/hooks/use-toast";
import { fetchProductsService } from "@/services/products";
import { createSellerService } from "@/services/sellers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateExportNotes = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const formItemLayout = {
    wrapperCol: {
      sm: { span: 12 },
    },
  };
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

  const handleSelectedProduct = (id) => {
    const selectedProduct = productsData.find((item) => item.id === id);
    console.log(selectedProduct);
  };

  const addSellersMutation = useMutation({
    mutationFn: async (createData) => {
      await createSellerService(createData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userListService"]);
      toast({ variant: "success", title: "Thêm nhân viên thành công!" });
      resetForm();
      navigate("/admin/sellers");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
      toast({
        variant: "destructive",
        title: "Lỗi khi thêm nhà cung cấp",
        description: errorMessage,
      });
    },
  });

  const onCreateExportNotes = (createData) => {
    addSellersMutation.mutate(createData);
  };

  return {
    productsData,
    listProduct,
    form,
    initialValues,
    formItemLayout,
    isModalOpen,
    rowSelection,
    showModal,
    handleOk,
    handleCancel,
    handleSelectedProduct,
    onCreateExportNotes,
  };
};
