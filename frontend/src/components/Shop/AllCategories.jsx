import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
import {
  deleteCategory,
  getAllCategoriesShop,
  getAllCategories,
} from "../../redux/actions/category";
import Loader from "../Layout/Loader";
import { BiEdit } from "react-icons/bi";
import { backend_url } from "../../server";
import { blue } from "@material-ui/core/colors";
import styles from "../../styles/styles";

const AllCategories = () => {
  // console.log("17/6/2023")
  console.log("17/6/2023");
  const { categories, isLoading } = useSelector((state) => state.categories);
  console.log("12/6/2023-1");
  console.log(categories);
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (id) => {
    navigate(`/dashboard-create-categories/${id}`);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   // dispatch(deleteProduct(id));
  //   dispatch(deleteCategory(id));
  //   window.location.reload();
  // };

  const columns = [
    { field: "id", headerName: "Category Id", minWidth: 150, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 180,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <>
            <img
              src={`${backend_url}${params.value}`}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          </>
        );
      },
    },
    // {
    //   field: "price",
    //   headerName: "Price",
    //   minWidth: 100,
    //   flex: 0.6,
    // },
    // {
    //   field: "Stock",
    //   headerName: "Stock",
    //   type: "number",
    //   minWidth: 80,
    //   flex: 0.5,
    // },

    // {
    //   field: "sold",
    //   headerName: "Sold out",
    //   type: "number",
    //   minWidth: 130,
    //   flex: 0.6,
    // },
    // {
    //   field: "Preview",
    //   flex: 0.8,
    //   minWidth: 100,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/product/${params.id}`}>
    //           <Button>
    //             <AiOutlineEye size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
    // {
    //   field: "Delete",
    //   flex: 0.8,
    //   minWidth: 120,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button onClick={() => handleDelete(params.id)}>
    //           <AiOutlineDelete size={20} />
    //         </Button>
    //       </>
    //     );
    //   },
    // },
    {
      field: "Edit",
      flex: 0.6,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+/g, '-');
        return (
          <>
            {/* <Link to={`/dashboard-create-categories/${params.id}`}> */}
            <Button>
              <BiEdit
                size={20}
                color="#5A96E3"
                onClick={() => handleNavigation(params.id)}
                className="flex-center"
              />
            </Button>
            {/* </Link> */}
          </>
        );
      },
    },
  ];

  const row = [];

  categories &&
    categories.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        image: item.image,
        // price: "US$ " + item.discountPrice,
        // Stock: item.stock,
        // sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {/* <div className="w-full flex justify-end">
            <div
              className={`${styles.add_product_button} !w-max !h-[35px] px-2 !rounded-[5px]  mb-3 hover:bg-[#727272]  flex items-center`}
            >
              <Link
                to="/dashboard-create-categories"
                className="w-full flex items-center"
              >
                <span className="text-white flex items-center">
                  <AiOutlinePlus size={20} className="mr-2 items-center" />
                  Create Category
                </span>
              </Link>
            </div>
          </div> */}
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllCategories;
