import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { createProduct } from "../../redux/actions/product";
import {
  createCategory,
  updateCategory,
  getAllCategoryById,
} from "../../redux/actions/category";
import { categoriesData } from "../../static/data";
import { backend_url, server } from "../../server";
import { getAllCategories } from "../../redux/actions/category";
import axios from "axios";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const { seller } = useSelector((state) => state.seller);
  const { categories, success, error } = useSelector(
    (state) => state.categories
  );
  const { successCat, errorCat } = useSelector((state) => state.categories);
  const params = useParams(); // /category/:id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const [update, setUpdate] = useState(false);
  const categoryId = params.id;
  const [imageExists, setImageExists] = useState(false);
  //   const [category, setCategory] = useState("");
  //   const [tags, setTags] = useState("");
  //   const [originalPrice, setOriginalPrice] = useState();
  //   const [discountPrice, setDiscountPrice] = useState();
  //   const [stock, setStock] = useState();

  useEffect(() => {
    const isItemExists =
      categories && categories.find((i) => i._id === categoryId);
    console.log("categories array-1");
    console.log(categories);
    console.log("filterd categories array-2");
    console.log(isItemExists);
    if (isItemExists) {
      setUpdate(true);
      setImageExists(true);
      setName(isItemExists.name);
      setImage(`${backend_url}${isItemExists.image}`);
    } else {
      setUpdate(false);
      setImageExists(false);
    }

    dispatch(getAllCategories());

    if (imageExists) {
      if (errorCat) {
        toast.error(errorCat);
      }
      if (successCat) {
        toast.success("Category updated successfully");
        navigate("/dashboard-categories");
        window.location.reload();
      }
    }

    if (success) {
      toast.success("Category created successfully");
      navigate("/dashboard-categories");
      window.location.reload();
    }
  }, [dispatch, navigate, success, categoryId]);

  const handleImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    // setImage(`${backend_url}${e.target.files[0].name}`);
    setImage(URL.createObjectURL(e.target.files[0]));

    if (update) {
      await axios
        .put(
          `${server}/category/update-category-image/${categoryId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          // setImage(res.data.category)
          toast.success("Image updated successfully!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      const file = e.target.files[0];
      setUpdate(false);
      setImage(file);
    }
  };

  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let files = Array.from(e.target.files);
  //   setImage((prevImages) => [...prevImages, ...files]);
  // };
  // console.log(image);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    // image.forEach((image) => {
    //   newForm.append("image", image);
    // });
    newForm.append("name", name);
    newForm.append("image", image);

    if (imageExists) {
      dispatch(updateCategory({ id: categoryId, name }));
    } else {
      //     dispatch(createProduct(newForm));
      dispatch(createCategory(newForm));
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      {update ? (
        <h5 className="text-[30px] font-Poppins text-center">
          Update Category
        </h5>
      ) : (
        <h5 className="text-[30px] font-Poppins text-center">
          Create Category
        </h5>
      )}
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        {/* <br /> */}
        {/* <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div> */}
        <br />
        {/* <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div> */}
        {/* <br /> */}
        {/* <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div> */}
        {/* <br /> */}
        {/* <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div> */}
        {/* <br /> */}
        {/* <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div> */}
        {/* <br /> */}
        {/* <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div> */}
        {/* <br /> */}
        <div>
          <label className="pb-2">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            // onChange={handleImageChange}
            onChange={handleImage}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {image && (
              <img
                src={update ? image : URL.createObjectURL(image)}
                alt=""
                className="h-[120px] w-[120px] object-cover m-2"
              />
            )}
            {/* {image &&
              image.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))} */}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
