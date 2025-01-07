import { toast } from "@/hooks/use-toast";
import { createImportNotesService } from "@/services/import-notes";
import { fetchProductsService } from "@/services/products";
import { fetchSellerService } from "@/services/sellers";
import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateImportNotes = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [listProduct, setListProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [count, setCount] = useState(2);

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
    setListProduct([...listProduct, ...selectedItems]);
    const formData = form.getFieldsValue();
    form.setFieldsValue({ ...formData, item: [...listProduct, ...selectedItems] });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: productsData } = useQuery({
    queryKey: ["fetchProductsService"],
    queryFn: fetchProductsService,
  });

  const { data: sellersData } = useQuery({
    queryKey: ["fetchSellerService"],
    queryFn: fetchSellerService,
  });

  const handleCreateImportNotes = async () => {
    form.validateFields().then(() => {
      const formData = form.getFieldsValue();
      const mergedArray = listProduct?.map((item, index) => ({ ...item, ...formData.items[index] }));
      const createData = {
        code: formData?.code,
        seller: formData?.seller,
        products: mergedArray?.map((item) => {
          return {
            product: item?._id,
            quantity: item?.quantity,
            price: item?.price,
            code: item?.code,
            name: item?.name,
            category: item?.category,
            unit: item?.unit,
            expiryDate: item?.expiryDate,
          };
        }),
        notes: formData?.notes,
        type: formData?.type,
        total: mergedArray?.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0),
      };
      console.log(mergedArray);

      createImportNotesService(createData)
        .then(() => {
          toast({ variant: "success", title: "Thêm phiếu nhập thành công!" });
          form.resetFields();
          navigate("/admin/import-notes");
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
    sellersData,
    showModal,
    handleOk,
    handleCancel,
    handleCreateImportNotes,
    setCount,
    setListProduct,
    count,
  };
};
