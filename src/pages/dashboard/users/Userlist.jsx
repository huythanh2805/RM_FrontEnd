import { useUser } from "@/hooks/dashboard/useAccount";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const UserList = () => {
  const { list, isLoading, error } = useUser();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user list.</p>;
  return (
    <div className="w-full min-h-screen bg-[#f5f6fa]">
      <div className="px-5 py-2">
        <div className="flex items-center justify-between">
          <p className="text-[32px] font-semibold mb-4">Danh sách người dùng</p>
          <Link to={"/dashboard/users/add"}>
            <div className="bg-green-200 text-green-800 px-6 py-2 rounded-md text-xs font-semibold hover:bg-green-300 transition">
              Thêm +
            </div>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#d5d5d5]">
          <table className="min-w-full bg-white">
            <thead className="border-b border-[#d5d5d5] text-left text-xs font-semibold text-[#202224] uppercase tracking-wider">
              <tr>
                <th className="hidden lg:block py-3 px-6">STT</th>
                <th className="py-3 px-6">Tên</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((user, index) => (
                <tr className="bg-white border-b border-[#d5d5d5] hover:bg-gray-50 transition" key={user._id}>
                  <td className="hidden lg:block py-4 px-6 text-sm font-medium text-[#202224]">{index + 1}</td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] max-w-[100px] lg:max-w-[250px] break-words">
                    {user.userName}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] max-w-[100px] lg:max-w-[250px] break-words">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-[#202224] max-w-[100px] lg:max-w-[250px] break-words">
                    {user.role}
                  </td>

                  <td className="py-4 px-6 text-sm flex items-center gap-1.5 lg:gap-3">
                    <Link to={`/dashboard/users/${user._id}/update`}>
                      <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs lg:text-base font-semibold hover:bg-blue-300 transition">
                        <FaPenToSquare />
                      </div>
                    </Link>
                    <div
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-lg cursor-pointer text-xs lg:text-base font-semibold hover:bg-red-300 transition"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaRegTrashCan />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
