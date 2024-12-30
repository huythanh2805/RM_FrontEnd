import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// API để fetch danh sách thông báo
const fetchNotifications = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notification`);
  return response.data;
};

// API để đánh dấu thông báo đã đọc
const updateNotification = async (notificationId) => {
  const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/notification/${notificationId}`, {
    isRead: true,
  });
  return response.data;
};

// Hook để lấy danh sách thông báo
export const useNotifications = () => {
  return useQuery(["notifications"], fetchNotifications, {
    staleTime: 5 * 60 * 1000, // Dữ liệu stale sau 5 phút
  });
};

// Hook để cập nhật trạng thái thông báo
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(updateNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]); // Làm mới danh sách thông báo
    },
  });
};

// Hàm lấy thông báo trong nhà bếp 
export const getAllKitchenNotify = async () => {
   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/kitchen/notification`)
   return res.json()
}
// Hàm sử lí xác nhận hủy món
export const confirmCancel = async (_id) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/kitchen/notification/${_id}`, {
    method: "PATCH"
  })
  if(!res.ok) throw new Error('Something went wrong on the server')
  return res.json()
}