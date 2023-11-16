import Sidebar from "@/components/Sidebar.tsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Sidebar/>
      <div className='ml-20 pr-10'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;