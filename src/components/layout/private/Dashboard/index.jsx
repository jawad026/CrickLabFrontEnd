import { Outlet } from "react-router-dom";
import Sidebar from "./Desktop/SideBar/Sidebar";

export const Index = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 sm:hidden lg:block fixed h-full">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="w-5/6 p-4 ml-[16.6667%]">
        <Outlet />
      </div>
    </div>
  );
};
