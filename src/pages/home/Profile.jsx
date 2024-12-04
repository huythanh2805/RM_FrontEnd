import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProfile } from "@/hooks/home/useProfile";
import { toast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { ServerUrl } from "@/utilities/utils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
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
  const [decodedToken, setDecodeToken] = useState(()=>{
    const token = localStorage.getItem('token')
    if(!token) return null
    return jwtDecode(token)
  })

  const {data: userDiscounts} = useFetchData(`${ServerUrl}/api/userDiscount/${decodedToken?.id}`)

  console.log({userDiscounts})

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
      toast({ variant: "destructive", title: "Vui lòng điền đầy đủ thông tin" });
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
      setIsDialogOpen(false); // Đóng dialog khi đổi mật khẩu thành công
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
 
  const handleUseCoupon = ()=>{
    console.log('use')
  }
  return (
    <>
      <section className="py-10 my-auto dark:bg-gray-900">
        <div className="lg:w-[100%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div>
              <div className="flex items-center justify-between w-full my-6">
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold dark:text-white">
                  Thông tin cá nhân
                </h1>
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => setIsDialogOpen(open)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 
            text-white dark:text-white hover:scale-90 transition-all ease-in"
                    >
                      Đổi mật khẩu
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Đổi mật khẩu
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <label className="dark:text-gray-300">
                        Nhập mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        placeholder="Mật khẩu cũ"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="p-4 w-full border-2 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                      />
                      <label className="dark:text-gray-300">
                        Nhập mật khẩu mới
                      </label>
                      <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-4 w-full border-2 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                      />
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button
                            className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
            text-white dark:text-white hover:scale-90 transition-all ease-in"
                          >
                            Hủy
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={handleChangePassword}
                          className="bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800 
            text-white dark:text-white hover:scale-90 transition-all ease-in"
                          disabled={isLoading}
                        >
                          {isLoading ? "Đang đổi..." : "Đổi mật khẩu"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <form action="#">
                <div className="w-full rounded-sm bg-[url('https://cdn.pixabay.com/photo/2023/02/01/21/40/pink-7761356_640.png')] bg-cover bg-center bg-no-repeat items-center">
                  <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full relative overflow-hidden top-11">
                    <img
                      src={currentImage}
                      alt="Profile"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="bg-white/90 rounded-full w-8 h-8 text-center absolute top-4 right-2 flex items-center justify-center">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(value) => handleImageChange(value)}
                        hidden
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer flex items-center justify-center"
                      >
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
                <h2 className="text-center font-semibold dark:text-gray-300 mt-11">
                  Tải lên ảnh hồ sơ
                </h2>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label className="mb-2 dark:text-gray-300">Tên</label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={(value) => handleChange(value)}
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Họ và tên"
                      required
                    />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label className="dark:text-gray-300">Số điện thoại</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(value) => handleChange(value)}
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Số điện thoại"
                      required
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4">
                    <label className="mb-2 dark:text-gray-300">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={(value) => handleChange(value)}
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Địa chỉ"
                      required
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label className="dark:text-gray-300">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      disabled
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Coupon */}
      <SectionTitle title={'Coupons'} desc={'Phiếu giảm giá của bạn'} />
      <div className="w-screen overflow-scroll overflow-x-scroll px-5 py-5 coupon_container">
        <div className="flex w-fit gap-10">
          {userDiscounts &&
            userDiscounts.map((userDiscount) => (
              <Discount
                key={userDiscount._id}
                _id={userDiscount._id}
                buttonTitle={'Dùng'}
                type={userDiscount.discountId.discountType}
                expriedDate={userDiscount.discountId.expireDate}
                discountValue={userDiscount.discountId.discountValue}
                minOrderValue={userDiscount.discountId.minOrderValue}
                handleClick={handleUseCoupon}
              />
            ))}
        </div>
      </div>
    </>
  )
};
