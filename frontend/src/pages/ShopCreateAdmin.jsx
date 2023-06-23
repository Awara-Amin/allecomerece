import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import ShopCreate from "../components/Shop/ShopCreate";
import ShopCreateAdmin from "../components/Shop/ShopCreateAdmin";
const ShopCreateAdminPage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      {/* <ShopCreate /> */}
      <ShopCreateAdmin />
    </div>
  );
};

export default ShopCreateAdminPage;
