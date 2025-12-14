
import { Outlet } from "react-router";
import Aside from "../Asidebar/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Aside></Aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
