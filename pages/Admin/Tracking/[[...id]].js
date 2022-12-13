import Head from "next/head";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imageUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
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

const Tracking = (props) => {
  const initialState = {
    rnb: "",
    timeIn: "tt",
    timeOut: "tt",
    serviceNumber: "tt",
    reportNumber: "tt",
    lsu: "tt",
    lab: "tt",
    note: "tt",
    phone: ""
  };

  const [product, setProduct] = useState(initialState);
  const { rnb, timeIn, timeOut, serviceNumber, reportNumber, pdf, lsu, lab, note, phone } = product;

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

  const [Slides, setSlides] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);

// array 1 ขั้นตอนการดำเนินการ
  const [procedure, setProcedure] = useState([
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ด้วยกล้องจุลทรรศน์",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",
      param: "",
      tool: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางเคมีและชีวเคมี",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",
      param: "",
      tool: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางจุลชีววิทยา",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",
      param: "",
      tool: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางกายภาพ",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",
      param: "",
      tool: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางน้ำ",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",
      param: "",
      tool: "",
      checkwork: false,
    },
  ]);
// array 2 ส่งผลการทดสอบพิมพ์
  const [labPrint, setLabPrint] = useState([
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ด้วยกล้องจุลทรรศน์",
      sentlab1: "",
      finishlab1: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางเคมีและชีวเคมี",
      sentlab1: "",
      finishlab1: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางจุลชีววิทยา",
      sentlab1: "",
      finishlab1: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางกายภาพ",
      sentlab1: "",
      finishlab1: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางน้ำ",
      sentlab1: "",
      finishlab1: "",
      checkwork: false,
    },
  ]);
// array 3 รับรองผล
  const [ensure, setEnsure] = useState([
    {
      idx: uuidv4(),
      time1: "",
      time2: "",

    },
  ]);
// array 4 ตรวจรายงานผล
  const [checkReport, setCheckReport] = useState([
    {
      idx: uuidv4(),
      time1: "",
      time2: "",

    },
  ]);
// array 5 คศวท รับรองรายงาน
  const [ensureReport, setEnsureReport] = useState([
    {
      idx: uuidv4(),
      time1: "",
      time2: "",

    },
  ]);
  // array 6 นำส่งรายงานผลให้ LSU
  const [reportLSU, setReportLSU] = useState([
    {
      idx: uuidv4(),
      time1: "",
      time2: "",
      sender: "",
      recipient: "",
    },
  ]);

  useEffect(() => {
    setSlides(props.products);
  }, [props.products]);

  const handleCheck = (id) => {
    Slides.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setSlides([...Slides]);
  };

  const handleClearAddNew = async () => {
    setImages([]);
    setProduct(initialState);
    router.replace("/Admin/Tracking");

    id = "";
  };

  const handleCheckALL = () => {
    Slides.forEach((product) => (product.checked = !isCheck));
    setSlides([...Slides]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    Slides.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "ลบ?",
          type: "DELETE_SLIDE",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`teacking/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
        setProcedure(res.product.procedure);
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
      console.log(files)

    files.forEach((file) => {
      // if (file.size > 2024 * 2024)
      //   return (err = "The largest image size is 1mb");

      // if (file.type !== "image/jpeg" && file.type !== "image/png")
      //   return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 1)
       newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 1)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "อัพโหลดได้ครั้งละ 1 รูปภาพ" },
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


    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    console.log("url=", media);

    let res;
    if (onEdit) {
      res = await putData(
        `tracking/${id}`,
        {
          ...product,
          procedure: [...procedure],
          images: [...imgOldURL, ...media],
          labPrint: [...labPrint],
          ensure:[...ensure],
          checkReport:[...checkReport],
          ensureReport:[...ensureReport],
          reportLSU:[...reportLSU],
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "tracking",
        {
          ...product,
          procedure: [...procedure],
          images: [...imgOldURL, ...media],
          labPrint: [...labPrint],
          ensure:[...ensure],
          checkReport:[...checkReport],
          ensureReport:[...ensureReport],
          reportLSU:[...reportLSU],
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    setTabIndex("1");
    setImages([]);
    setProduct(initialState);
    return router.push("/Admin/Tracking");
  };


  const handleChangeInput2 = async (idx, event) => {
    const newInputFields = procedure.map((i) => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setProcedure(newInputFields);
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
                <Tab
                  value="0"
                  label={onEdit ? "แก้ไขสไลด์" : "เพิ่มสไลด์"}
                ></Tab>

                <Tab value="1" label="จัดการสไลด์"></Tab>
              </TabList>
            </Box>
            <TabPanel value="0">
              <div className="products_manager">
                <Head>
                  <title>การจัดการสไลด์</title>
                </Head>

                {onEdit ? (
                  <button
                    className="btn btn-success d-block ml-10 mb-4"
                    onClick={handleClearAddNew}
                  >
                    {" "}
                    เพิ่มสไดล์ใหม่{" "}
                  </button>
                ) : (
                  <></>
                )}
                <section className="bg-white">
                  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-xl md:text-2xl lg:text:3xl xl:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                      อัพโหลดสไลด์
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                      ไม่รู้จะใส่อะไร เผื่ออยากใส่
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
                          type="text"
                          value={rnb}
                          name="rnb"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                          onChange={handleChangeInput}
                          placeholder="ชื่อสไลด์ . . . "
                          required
                        />
                        <input
                          type="text"
                          value={phone}
                          name="phone"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                          onChange={handleChangeInput}
                          placeholder="เบอร์โทร . . . "
                          required
                        />
                      </div>
                      {procedure.map((procedure) => (
                        <div key={procedure.idx}
                        className=" md:flex g-8 space-y-2 md:space-y-0">
                            <div>
                              <input
                                type="text"
                                name="ListName"
                                value={procedure.ListName}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block p-2.5 w-full md:w-40 xl:w-[187px]"
                                onChange={(event) =>
                                  handleChangeInput2(procedure.idx, event)
                                }
                                
                                required
                              />
                              <input
                                type="text"
                                name="time1"
                                value={procedure.time1}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block p-2.5 w-full md:w-20"
                                onChange={(event) =>
                                  handleChangeInput2(procedure.idx, event)
                                }
                                placeholder="อัตราที่ 1"
                                required
                              />
                            
                              <input
                                type="text"
                                name="time2"
                                value={procedure.time2}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block p-2.5 w-full md:w-20"
                                onChange={(event) =>
                                  handleChangeInput2(procedure.idx, event)
                                }
                                
                                required
                              />
                              <input
                                type="text"
                                name="time3"
                                value={procedure.time3}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block p-2.5 w-full md:w-20"
                                onChange={(event) =>
                                  handleChangeInput2(procedure.idx, event)
                                }
                                
                                required
                              />
                              <input
                                type="text"
                                name="time4"
                                value={procedure.time4}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block p-2.5 w-full md:w-20"
                                onChange={(event) =>
                                  handleChangeInput2(procedure.idx, event)
                                }
                                
                                required
                              />
                              <input
                                type="text"
                                name="time5"
                                value={procedure.time5}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block p-2.5 w-full md:w-20"
                                onChange={(event) =>
                                  handleChangeInput2(procedure.idx, event)
                                }
                                
                                required
                              />

                            </div>
                        </div>
                      )
                      )}

                      <div
                        className="flex justify-center items-center w-full"
                       
                      >
                        <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleUploadInput}
                            accept="application/pdf"
                          />
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        className="shadow-sm bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-green-500 rounded
              block w-full p-2.5 "
                      >
                        {onEdit ? "อัพเดต" : "สร้าง"}
                      </button>
                    </form>
                  </div>
                </section>
              </div>
            </TabPanel>

            <TabPanel value="1">
              <div className="container">
                <Head>
                  <title>สไลด์ข่าวสาร</title>
                </Head>
                <h1 className="flex justify-center items-center font-bold text-2xl md:text-3xl lg:text:3xl xl:text-4xl pt-5 pb-4">
        สไดล์ข่าวสาร
      </h1>
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
                          transform: "translateY(8px)",
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
                <div className="products">
                  {Slides.length === 0 ? (
                    <h2>No Slides</h2>
                  ) : (
                    Slides.map((product,ict) => (
                      <ul
                      key={ict}
                        className="card bg-sky-100/75"
                        style={{ width: "18rem" }}
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
                        <img
                          className="card-img-top object-cover h-48 w-full"
                          src={product.images[0].url}
                          alt={product.images[0].url}
                        />
                        <div className="card-body">
                          <div className="row justify-content-between mx-0 ">
                            <>
                              <Link href={`/Admin/Tracking/${product._id}`}>
                                <a
                                  onClick={() => {
                                    setTabIndex("0");
                                  }}
                                  className="btn btn-info"
                                  style={{ marginRight: "5px", flex: 1 }}
                                >
                                  แก้ไขข้อมูล
                                </a>
                              </Link>
                              <button
                                className="btn btn-danger"
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
                                        type: "DELETE_SLIDE",
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
            </TabPanel>
          </TabContext>
        </Box>
      </FullLayout>
    </ThemeProvider>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `tracking?limit=${
      page * 100
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Tracking;