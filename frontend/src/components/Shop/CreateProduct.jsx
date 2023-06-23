import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backend_url, server } from "../../server";
import {
  getAllProductsShop,
  updateProductInformation,
  getAProduct,
} from "../../redux/actions/product";

const CreateProduct = () => {
  const params = useParams(); // /product/:id
  const { id: productId } = params;
  console.log("productId 18/6/2023 inside CreateProduct-11");
  console.log(productId);

  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } = productUpdate;
  const { loadingUpdate, errorUpdate, successUpdate } = useSelector(
    (state) => state.products
  );

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (productId) {
      // dispatch(getAProduct(productId));
      products
        .filter((each) => each._id === productId)
        .map((each) => {
          return (
            setImages(each.images),
            setName(each.name),
            setDescription(each.description),
            setCategory(each.category),
            setTags(each.tags),
            setOriginalPrice(each.originalPrice),
            setDiscountPrice(each.discountPrice),
            setStock(each.stock),
            setDiscountPrice(each.discountPrice),
            setStock(each.stock)
          );
        });
    }

    // dispatch(getAProduct(productId));
  }, [productId]);

  console.log("productId 21/6/2023 inside CreateProduct-21-2");
  console.log(images);

  // const deleteFileHandler = (x) => {
  //   alert(`delete me ${x}`);
  // };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    if (productId) {
      let files = Array.from(e.target.files);
      console.log("productId 22/6/2023 inside CreateProduct-22-1");
      console.log(files);
      console.log(typeof files); // object
      // let allFiles = URL.createObjectURL + files;
      // console.log("productId 22/6/2023 inside CreateProduct-22-2");
      // console.log(allFiles);
      // console.log(typeof { allFiles });

      setImages((prevImages) => [...prevImages, ...files]);
      console.log("productId 11/6/2023 inside CreateProduct-22-3");
      console.log(images);
    } else {
      let files = Array.from(e.target.files);
      console.log("productId 18/6/2023 inside CreateProduct-59");
      console.log(files);
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  console.log("productId 22/6/2023 inside CreateProduct-22-4");
  console.log(images);
  // images.forEach((each) => {
  //   console.log("productId 22/6/2023 inside CreateProduct-22-5");
  //   console.log(each.name);
  //   console.log(each);
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productId) {
      console.log("19/6/2023 frontend-0");
      await axios
        .put(
          `${server}/product/update-product-info`,
          {
            _id: productId,
            // images: images.forEach((each) =>
            //   // typeof each !== "string" ? each.name : null
            //   each.name ? each.name : images
            // ),
            images: images,
            name,
            description,
            category,
            tags,
            originalPrice,
            discountPrice,
            stock,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("19/6/2023 frontend-1");
          toast.success("Product info updated succesfully!");
          navigate("/dashboard");
          // dispatch(loadSeller());
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      const newForm = new FormData();

      images.forEach((image) => {
        newForm.append("images", image);
      });
      newForm.append("name", name);
      newForm.append("description", description);
      newForm.append("category", category);
      newForm.append("tags", tags);
      newForm.append("originalPrice", originalPrice);
      newForm.append("discountPrice", discountPrice);
      newForm.append("stock", stock);
      newForm.append("shopId", seller._id);
      dispatch(createProduct(newForm));
    }
  };

  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x !== fileName));
    console.log("hi");
  };
  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
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
        <br />
        <div>
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
        </div>
        <br />
        <div>
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
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
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
        </div>
        <br />
        <div>
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
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>

            {/* {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))} */}
            {/* {images.map((x) => (
              <ListGroup.Item key={x}>
                {x}
                <Button variant="light" onClick={() => deleteFileHandler(x)}>
                  <i className="fa fa-times-circle"></i>
                </Button>
              </ListGroup.Item>
            ))} */}
            {productId && images.length > 0
              ? images.map((x, index) => (
                  <div>
                    {console.log("22/6/2023-1, x")}
                    {console.log(x)}
                    {console.log(typeof x)}
                    <AiOutlineClose
                      size={20}
                      className="mt-3"
                      color="black"
                      onClick={() => deleteFileHandler(x)}
                    />
                    {/* <img
                      src={
                        typeof { x } === "object"
                          ? `${backend_url}${x}`
                          : URL.createObjectURL(x)
                      }
                      key={index}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    /> */}
                    {/* <img
                      src={typeof { x } === "object" ? `${backend_url}${x}` : x}
                      key={index}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    /> */}
                    <img
                      src={
                        typeof x === "string"
                          ? `${backend_url}${x}`
                          : URL.createObjectURL(x)
                      }
                      key={index}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  </div>
                ))
              : images.map((i) => (
                  <img
                    src={URL.createObjectURL(i)}
                    key={i}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
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

export default CreateProduct;
