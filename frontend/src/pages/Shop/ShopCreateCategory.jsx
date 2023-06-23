import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
// import CreateProduct from "../../components/Shop/CreateProduct";
import CreateCategory from "../../components/Shop/CreateCategory";

const ShopCreateCategory = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={14} />
        </div>
        <div className="w-full justify-center flex">
          <CreateCategory />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateCategory;
