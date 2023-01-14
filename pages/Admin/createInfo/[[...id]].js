import Head from "next/head";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imageUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import FullLayout from "../../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../src/theme/theme";
import filterSearch from "../../../utils/filterSearch";
import FilterNews from "../../../components/FilterNews";
import Link from "next/link";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";

const NewsManager = (props) => {
  const initialState = {
    title: "",
    description: "",
  };

  const [product, setProduct] = useState(initialState);
  const { title, description } = product;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  //TAB Change
  const [tabIndex, setTabIndex] = React.useState("0");
  // const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const [Inform, setInform] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setInform(props.products);
  }, [props.products]);

  const handleCheck = (id) => {
    Inform.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setInform([...Inform]);
  };

  const handleClearAddNew = async () => {
    setImages([]);
    setProduct(initialState);
    router.replace("/Admin/createInfo");

    id = "";
  };

  const handleCheckALL = () => {
    Inform.forEach((product) => (product.checked = !isCheck));
    setInform([...Inform]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    Inform.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "ลบ?",
          type: "DELETE_PRODUCTS",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  // end Infomation

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`productNews/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 2024 * 2024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 10) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 10)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "อัพโหลดได้ครั้งละ 10 รูปภาพ" },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (!title || images.length === 0 || !description)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields111." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `productNews/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "productNews",
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    setTabIndex("1");
    return router.push("/Admin/createInfo");
  };

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        Nav {
          display: none;
        }
      `}</style>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <Head>
        <title>CALLLAB</title>
      </Head>
      <FullLayout>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabIndex} isFitted variant="enclosed">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                mb="1em"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab value="0" label={onEdit ? "แก้ไขข่าว" : "เพิ่มข่าว"}></Tab>

                <Tab value="1" label="จัดการข่าว"></Tab>
              </TabList>
            </Box>
            <TabPanel value="0">
              <div className="products_manager">
                <Head>
                  <title>ข่าวประชาสัมพันธ์</title>
                </Head>
                {onEdit ? (
                  <button
                    className="btn btn-success d-block ml-10 mb-4"
                    onClick={handleClearAddNew}
                  >
                    {" "}
                    เพิ่มข่าวใหม่{" "}
                  </button>
                ) : (
                  <></>
                )}
                <section className="bg-white">
                  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-2xl md:text-3xl lg:text:3xl xl:text-4xl tracking-tight font-extrabold text-center text-[#1a237e]">
                      เพิ่มข้อมูลข่าวสาร
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    เพิ่มข้อมูล
                    </p>
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          หัวเรื่อง
                        </label>
                        <input
                          value={title}
                          type="text"
                          name="title"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                          onChange={handleChangeInput}
                          placeholder="กรอกหัวเรื่อง . . . "
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          เนื้อหา
                        </label>
                        <textarea
                          rows="6"
                          name="description"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                          placeholder="กรอกเนื้อหา . . ."
                          required
                          value={description}
                          onChange={handleChangeInput}
                        ></textarea>
                      </div>

                      <div
                        className="flex justify-center items-center w-full"
                        hidden={images.length >= 10 ? true : false}
                      >
                        <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="mb-3 w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                คลิกเพื่ออัพโหลด
                              </span>
                            </p>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                              รองรับ PNG หรือ JPG (สูงสุด. 2024x2024px)
                            </p>
                          </div>
                          <input
                            multiple
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleUploadInput}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <div className="row img-up mx-0 object-cover">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className="file_img my-1 object-cover"
                          >
                            <img
                              src={img.url ? img.url : URL.createObjectURL(img)}
                              alt=""
                              className="img-thumbnail rounded object-cover"
                            />

                            <span onClick={() => deleteImage(index)}>X</span>
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className=" bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white font-bold py-2 px-4 border-b-4  rounded-full block w-full p-2.5 "
                      >
                        {onEdit ? "อัพเดต" : "สร้าง"}
                      </button>
                    </form>
                  </div>
                </section>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div className="">
                <Head>
                  <title>ข่าวสาร</title>
                </Head>

                <FilterNews state={state} />
                <div className="">
                  {auth.user && auth.user.role === "admin" && (
                    <div
                      className="delete_all btn btn-danger mt-2"
                      style={{ marginBottom: "-10px" }}
                    >
                      <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={handleCheckALL}
                        style={{
                          width: "25px",
                          height: "25px",
                          transform: "translateY(0px)",
                        }}
                      />

                      <button
                        className="btn btn-danger ml-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={handleDeleteAll}
                      >
                        ลบข้อมูลทั้งหมด
                      </button>
                    </div>
                  )}

                  <div className=" grid-flow-row xl:px-50 mx-auto products lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                    {Inform.length === 0 ? (
                      <h2>ไม่มีข้อมูลข่าวประชาสัมพันธ์</h2>
                    ) : (
                      Inform.map((product) => (
                        <ul
                          className="card shadow-md"
                          style={{ width: "20rem" }}
                          key={product._id}
                        >
                          {auth.user && auth.user.role === "admin" && (
                            <input
                              type="checkbox"
                              checked={product.checked}
                              className="position-absolute"
                              style={{ height: "20px", width: "20px" }}
                              onChange={() => handleCheck(product._id)}
                            />
                          )}
                          <Link href={`/productNews/${product._id}`}>
                          <img
                            className="aspect-square object-fill cursor-pointer card-img-top"
                            src={product.images[0].url}
                            alt={product.images[0].url}
                          />
                        </Link>
                          <div className="card-body">
                          <h5
                            className="card-title font-bold text-xl mb-2 text-capitalize"
                            title={product.en}
                          >
                            {product.en}
                          </h5>
                          <h5 className="card-title text-capitalize" title={product.title}>
                            {product.title}
                          </h5>

                            <div className="row justify-content-between mx-0 ">
                              <>
                                <Link href={`/Admin/createInfo/${product._id}`}>
                                  <a
                                    onClick={() => {
                                      setTabIndex("0");
                                    }}
                                    className="btn  bg-[#1a237e]  hover:bg-[#111754]  shadow-md hover:shadow-lg text-white rounded-full"
                                    style={{ marginRight: "5px", flex: 1 }}
                                  >
                                    แก้ไขข้อมูล
                                  </a>
                                </Link>
                                <button
                                  className="btn bg-red-600 hover:bg-red-800 shadow-md hover:shadow-lg text-white rounded-full"
                                  style={{ marginLeft: "5px", flex: 1 }}
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  onClick={() =>
                                    dispatch({
                                      type: "ADD_MODAL",
                                      payload: [
                                        {
                                          data: "",
                                          id: product._id,
                                          title: product.title,
                                          type: "DELETE_PRODUCTS",
                                        },
                                      ],
                                    })
                                  }
                                >
                                  ลบข้อมูล
                                </button>
                              </>
                            </div>
                          </div>
                        </ul>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </FullLayout>
    </ThemeProvider>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  // const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `productNews?limit=${page * 100}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default NewsManager;