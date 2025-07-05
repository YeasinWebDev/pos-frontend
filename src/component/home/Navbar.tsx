import { MdOutlineEventNote } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserQuery } from "../../features/auth/authApi";
import User from "../../utils/User";
import Loader from "../Loader";
function Navbar() {
  const { user, isLoading } = User();
  console.log(user);
  return (
    <div className="py-6 px-10 flex items-center justify-between ">
      <div className="flex items-center justify-start gap-10">
        <h2 className="text-2xl font-bold text-green-700">RoastRoot</h2>
        <h4 className="text-green-700 font-medium pt-1">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </h4>
      </div>
      <div className="flex items-center justify-start gap-5">
        <h5 className="text-gray-500 font-medium">Total:20 Orders</h5>
        <Link
          to="/"
          className="p-4 bg-white w-fit rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer text-[18px]"
        >
          Orders <MdOutlineEventNote size={20} />
        </Link>
        <div className="relative w-fit">
          <Link
            to="/"
            className="p-4 bg-white w-fit rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaRegBell size={20} />
          </Link>
          <span className="absolute -top-1 right-0 bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center text-sm">
            2
          </span>
        </div>

        <div>
          {isLoading ? (
            <div><Loader/></div>
          ) : (
            <div className="flex items-center gap-2 justify-center bg-white w-fit px-5 py-3 rounded-full cursor-pointer">
              <div className="w-fit border-2 border-green-700 rounded-full">
                <img
                  src={user?.data?.image}
                  alt="user"
                  className="w-12 h-12 rounded-full object-fit"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{user?.data?.name}</h4>
                <h4 className="text-sm text-gray-600">{user?.data?.role}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
