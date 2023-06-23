import React from "react";
// import AdminHeader from '../components/Layout/AdminHeader'
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllUsers from "../../components/Admin/AllUsers";
// import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
// import AllUsers from "../components/Admin/AllUsers";

// const AdminDashboardUsers = () => {
const ShopAllUsers = () => {
  return (
    <div>
      {/* <AdminHeader /> */}
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            {/* <AdminSideBar active={4} /> */}
            <DashboardSideBar active={13} />
          </div>
          {/* <AllUsers /> */}
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

// export default AdminDashboardUsers;
export default ShopAllUsers;
