import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { useProfile } from "@/hooks/home/useProfile";
import { toast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { ServerUrl } from "@/utilities/utils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Discount from "./Discount";
import SectionTitle from "./SectionTitle";

export const Profile = () => {
  const { user, handleUpdateProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    address: "",
    image: "",
    email: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [decodedToken, setDecodeToken] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode(token);
  });
  const navigate = useNavigate();

  const { data: userDiscounts } = useFetchData(`${ServerUrl}/api/userDiscount/${decodedToken?.id}`);

  const { colorCode } = useThemeContext();
  const [opacity] = useState(1);
  const [translateY] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        image: user.image || null,
        email: user.email || "",
      });
      setCurrentImage(user.image || "");
    }
  }, [JSON.stringify(user)]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: file }); // Lưu file thay vì URL
      setCurrentImage(imageUrl);
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Kiểm tra nếu thông tin chưa đầy đủ
    if (!formData.userName || !formData.phoneNumber || !formData.address) {
      toast({
        variant: "destructive",
        title: "Vui lòng điền đầy đủ thông tin",
      });
      setIsLoading(false);
      return;
    }

    // Gọi API cập nhật thông tin người dùng
    handleUpdateProfile(formData)
      .then(() => {
        setCurrentImage(formData.image);
        toast({ variant: "success", title: "Cập nhật thành công" });
      })
      .catch(() => {
        toast({ variant: "destructive", title: "Cập nhật thất bại" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast({ variant: "destructive", title: "Vui lòng nhập đầy đủ mật khẩu" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:1111/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({ variant: "success", title: response.data.message });
      setIsDialogOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đổi mật khẩu thất bại";
      toast({ variant: "destructive", title: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      setOldPassword("");
      setNewPassword("");
    }
  }, [isDialogOpen]);

  const handleUseCoupon = () => {
    navigate("/reservation");
  };
  return (
    <>
      <form>
        <div
          className="relative w-full rounded-sm bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/imgs/pagetitle-reservation.jpg')",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-sm"></div>
          <div
            className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8"
            style={{
              opacity: opacity,
              transform: `translateY(-${translateY}px)`,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            <h1 className="mt-28 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold dancing">Thông tin cá nhân</h1>
          </div>

          {/* Ảnh đại diện */}
          <div className="relative mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full overflow-hidden top-11 border-4 border-white">
            <img src={currentImage} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
            <div className="bg-white/90 rounded-full w-8 h-8 text-center absolute top-4 right-2 flex items-center justify-center">
              <input type="file" name="image" id="image" onChange={(value) => handleImageChange(value)} hidden />
              <label htmlFor="image" className="cursor-pointer flex items-center justify-center">
                <svg
                  data-slot="icon"
                  className="w-6 h-6 text-blue-700"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>

        <h2 className="text-center font-semibold dark:text-gray-300 mt-11">Tải lên ảnh hồ sơ</h2>

        <div className="lg:w-[66%] md:w-[60%] sm:w-[66% xs:w-400 mx-auto shadow-2xl p-4 rounded-sm ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">Tên</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(value) => handleChange(value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                placeholder="Họ và tên"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(value) => handleChange(value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                placeholder="Số điện thoại"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(value) => handleChange(value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                placeholder="Địa chỉ"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-gray-300">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                disabled
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-gray-400"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
              <DialogTrigger asChild>
                <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Đổi mật khẩu
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Đổi mật khẩu</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium dark:text-gray-300">Nhập mật khẩu cũ</label>
                    <input
                      type="password"
                      placeholder="Mật khẩu cũ"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium dark:text-gray-300">Nhập mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Hủy
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang đổi..." : "Đổi mật khẩu"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-12">
        {/* Coupon */}
        <SectionTitle title={"Coupons"} desc={"mã giảm giá của bạn"} />
        <div className="w-full px-5 py-5">
          <div className="flex flex-wrap justify-center gap-5">
            {userDiscounts && userDiscounts.length > 0 ? (
              userDiscounts.map((userDiscount) => (
                <Discount
                  key={userDiscount._id}
                  _id={userDiscount._id}
                  code={userDiscount.code}
                  status={userDiscount.status}
                  buttonTitle={"Dùng"}
                  type={userDiscount.discountId.discountType}
                  expriedDate={userDiscount.discountId.expireDate}
                  discountValue={userDiscount.discountId.discountValue}
                  minOrderValue={userDiscount.discountId.minOrderValue}
                  handleClick={handleUseCoupon}
                />
              ))
            ) : (
              <div className="w-full text-center text-gray-500">Không có mã giảm giá nào</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
