export const ServerUrl = import.meta.env.VITE_SERVER_URL;

export function formatCurrency(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export function formatDateAndTime(datetime) {
  console.log(datetime);
  // Tạo một đối tượng Date từ chuỗi thời gian
  const dateObj = new Date(datetime);

  // Lấy các phần của ngày và giờ
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  // Định dạng ngày
  const formattedDay = `${day}/${month}/${year}`;

  // Định dạng giờ
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
  return {
    day: formattedDay,
    time: formattedTime,
  };
}
export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year}, ${hours}:${minutes}`;
}
export function formatDateNoTime(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function decodeBase64(encodedString) {
  // Chuyển đổi từ base64
  const decodedString = Buffer.from(encodedString, "base64").toString("utf-8");
  return decodedString;
}
// format sdt
export function formatPhoneNumber(phoneNumber) {
  // Chỉ lấy các chữ số
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Kiểm tra độ dài của số điện thoại để format
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

  if (match) {
    // Trả về định dạng "0123 456 789"
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  // Nếu không khớp định dạng thì trả về số không thay đổi
  return phoneNumber;
}
export function shortenNumber(num) {
  return num / 1000;
}

export function getStatusMessage(status) {
  switch (status) {
      case "ORDERED":
          return "Đã gọi";
      case "ISPREPARED":
          return "Đang chuẩn bị";
      case "ISCOMPLETED":
          return "Hoàn thành";
      case "ISCANCELED":
          return "Đã hủy";
      default:
          return "Trạng thái không xác định";
  }
}
// Lấy 1 mảng có phần tử unique code mới nhất
export function getOrderHistoryUniqueAndLatest(dishes) {
  const Array = [];

  for (let index = 0; index < dishes.length; index++) {
    const existedItemIndex = Array.findIndex(item => item.code === dishes[index].code);
    if (existedItemIndex !== -1) {
      // Nếu đã tồn tại, kiểm tra và thay thế nếu createdAt mới hơn
      if (new Date(dishes[index].createdAt) > new Date(Array[existedItemIndex].createdAt)) {
        Array[existedItemIndex] = dishes[index];
      }
    } else {
      // Nếu chưa tồn tại, thêm vào
      Array.push(dishes[index]);
    }
  }
  return Array.map(item=> item._id)
}