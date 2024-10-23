import Toast from "@/components/nocatifications/Toast";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/home/useProfile";
import { useEffect, useState } from "react";
export const Profile = () => {
  const { user, loading, handleUpdateProfile } = useProfile();
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    address: "",
    image: "",
    email: "", // Thêm email vào formData
  });
  const [showToast, setShowToast] = useState(false); // State cho thông báo
  const [toastMessage, setToastMessage] = useState(""); // State cho nội dung thông báo

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        image: user.image || null,
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputFile = document.getElementById("image").files[0];
    if (inputFile) {
      formData.image = inputFile;
    }

    handleUpdateProfile(formData)
      .then(() => {
        setToastMessage("Cập nhật thông tin thành công!");
        setShowToast(true); // Hiện thông báo
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch(() => {
        setToastMessage("Cập nhật thất bại, vui lòng thử lại!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      });
  };

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[100%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div>
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Thông tin cá nhân
            </h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full relative overflow-hidden top-11">
                  <img src={formData.image} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="bg-white/90 rounded-full w-8 h-8 text-center absolute top-4 right-2 flex items-center justify-center">
                    {" "}
                    {/* Di chuyển sang bên phải */}
                    <input type="file" name="image" id="image" onChange={handleImageChange} hidden />
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
                <div className="flex justify-end"></div>
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300 mt-11">Tải lên ảnh hồ sơ</h2>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label className="mb-2 dark:text-gray-300">Tên</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="w-full mb-4 lg:mt-6">
                  <label className="dark:text-gray-300">Số điện thoại</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <label className="dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Địa chỉ</h3>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="text-gray-500 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <Button type="submit" className="w-full p-4">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </section>
  );
};
