import { Outlet } from "react-router-dom";
import Sidebar from "./Desktop/SideBar/Sidebar";

export const Index = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 sm:hidden lg:block">
        <Sidebar />
      </div>

      <div className="w-1/6 sm:block lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-4">
        <Outlet />
      </div>
    </div>
  );
};
