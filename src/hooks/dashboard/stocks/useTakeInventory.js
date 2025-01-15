import { toast } from "@/hooks/use-toast";
import { fetchStocksService, fetchStocksServiceStatus, updateStockTakeInventory } from "@/services/stocks";
import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import dayjs from 'dayjs';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useTakeInventory = () => {
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
        const formData = form.getFieldsValue();
        console.log(selectedItems);
        const updatedItems = selectedItems.map((item, index) => ({
            ...item,
            key: index,
            newQuantity: item.quantity,
            newExpiryDate: item.expiryDate ? dayjs(item.expiryDate) : null,
        }));

        form.setFieldsValue({
            ...formData,
            items: updatedItems,
        });
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

    const handleTakeInventory = async () => {
        form.validateFields().then(() => {
            const formData = form.getFieldsValue();
            const mergedArray = listProduct?.map((item, index) => ({ ...item, ...formData.items[index] }));
            console.log(mergedArray);
            const data = {
                items: mergedArray?.map((item) => {
                    return {
                        stockID: item?._id,
                        price: item?.price,
                        newQuantity: item?.newQuantity,
                        newExpiryDate: item?.newExpiryDate,
                        lastQuantity: item?.quantity,
                        lastExpiryDate: item?.expiryDate,
                    };
                }),
                notes: formData?.notes,
            };

            updateStockTakeInventory(data)
                .then(() => {
                    toast({ variant: "success", title: "Kiểm kê số lương thành công" });
                    form.resetFields();
                    navigate("/admin/stocks");
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || error.message || "Vui lòng kiểm tra lại thông tin";
                    toast({
                        variant: "destructive",
                        title: "Lỗi khi kiểm kê số lượng",
                        description: errorMessage,
                    });
                });
        });
    };

    return {
        stocksData,
        stocksDataStatus,
        listProduct,
        form,
        initialValues,
        isModalOpen,
        rowSelection,
        showModal,
        handleOk,
        handleCancel,
        handleTakeInventory,
    };
};
