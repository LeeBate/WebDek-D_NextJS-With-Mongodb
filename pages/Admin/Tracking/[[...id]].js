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
import { Checkbox } from "@nextui-org/react";

const Tracking = (props) => {
  const initialState = {
    rnb: "",
    timeIn: "",
    timeOut: "",
    serviceNumber: "",
    reportNumber: "",
    lsu: "",
    lab: "",
    note: "",
    phone: "",
  };

  const [product, setProduct] = useState(initialState);
  const {
    rnb,
    timeIn,
    timeOut,
    serviceNumber,
    reportNumber,
    lsu,
    lab,
    note,
    phone,
  } = product;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);

  const [checkedx1, setCheckedx1] = useState(false);
  const [checkedx2, setCheckedx2] = useState(false);
  const [checkedx3, setCheckedx3] = useState(false);
  const [checkedx4, setCheckedx4] = useState(false);
  const [checkedx5, setCheckedx5] = useState(false);

  useEffect(() => {}, []);

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

      param: "",
      tool: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานทดสอบทางกายภาพ",
      time1: "",
      time2: "",
      time3: "",
      time4: "",

      param: "",
      tool: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์น้ำ",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
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
      timelab1: "",
      timelab2: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางเคมีและชีวเคมี",
      timelab1: "",
      timelab2: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางจุลชีววิทยา",
      timelab1: "",
      timelab2: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานทดสอบทางกายภาพ",
      timelab1: "",
      timelab2: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์น้ำ",
      timelab1: "",
      timelab2: "",
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
  const hiddenChk = (idz) => {
    idz = idz + 1;
    if (idz == 1) {
      return !checked1;
    }
    if (idz == 2) {
      return !checked2;
    }
    if (idz == 3) {
      return !checked3;
    }
    if (idz == 4) {
      return !checked4;
    }
    if (idz == 5) {
      return !checked5;
    }
  };
  const defaultChk = (id) => {
    id = id + 1;
    if (id == 1) {
      return checked1;
    }
    if (id == 2) {
      return checked2;
    }
    if (id == 3) {
      return checked3;
    }
    if (id == 4) {
      return checked4;
    }
    if (id == 5) {
      return checked5;
    }
    return;
  };

  const getValue = (value, id) => {
    id = id + 1;
    if (id == 1) {
      setChecked1(value);
      return checked1;
    }
    if (id == 2) {
      setChecked2(value);
      return checked2;
    }
    if (id == 3) {
      setChecked3(value);
      return checked3;
    }
    if (id == 4) {
      setChecked4(value);
      return checked4;
    }
    if (id == 5) {
      setChecked5(value);
      return checked5;
    }
  };

  const hiddenChkx = (id) => {
    id = id + 1;
    if (id == 1) {
      return !checkedx1;
    }
    if (id == 2) {
      return !checkedx2;
    }
    if (id == 3) {
      return !checkedx3;
    }
    if (id == 4) {
      return !checkedx4;
    }
    if (id == 5) {
      return !checkedx5;
    }
  };
  const defaultChkx = (id) => {
    id = id + 1;
    if (id == 1) {
      return checkedx1;
    }
    if (id == 2) {
      return checkedx2;
    }
    if (id == 3) {
      return checkedx3;
    }
    if (id == 4) {
      return checkedx4;
    }
    if (id == 5) {
      return checkedx5;
    }
  };
  // const defaultselectfn  = async (select,ida) => {
  //   ida=ida+1
  //   if(ida==1){
  //     setChecked1(select)
  //     return select;
  //   } else if(ida==2){
  //     setChecked2(select)
  //     return select;
  //   } else if(ida==3){
  //     setChecked3(select)
  //     return select;
  //   } else if(ida==4){
  //     setChecked4(select)
  //     return select;
  //   } else if(ida==5){
  //     setChecked5(select)
  //     return select;
  //   }

  // };

  const handleClearAddNew = async () => {
    setImages([]);
    setProduct(initialState);
    setProcedure([
      {
        idx: uuidv4(),
        ListName: "งานวิเคราะห์ด้วยกล้องจุลทรรศน์",
        time1: "",
        time2: "",
        time3: "",
        time4: "",
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

        param: "",
        tool: "",
        checkwork: false,
      },
      {
        idx: uuidv4(),
        ListName: "งานทดสอบทางกายภาพ",
        time1: "",
        time2: "",
        time3: "",
        time4: "",

        param: "",
        tool: "",
        checkwork: false,
      },
      {
        idx: uuidv4(),
        ListName: "งานวิเคราะห์น้ำ",
        time1: "",
        time2: "",
        time3: "",
        time4: "",
        param: "",
        tool: "",
        checkwork: false,
      },
    ]);
    setLabPrint([
      {
        idx: uuidv4(),
        ListName: "งานวิเคราะห์ด้วยกล้องจุลทรรศน์",
        timelab1: "",
        timelab2: "",
        checkwork: false,
      },
      {
        idx: uuidv4(),
        ListName: "งานวิเคราะห์ทางเคมีและชีวเคมี",
        timelab1: "",
        timelab2: "",
        checkwork: false,
      },
      {
        idx: uuidv4(),
        ListName: "งานวิเคราะห์ทางจุลชีววิทยา",
        timelab1: "",
        timelab2: "",
        checkwork: false,
      },
      {
        idx: uuidv4(),
        ListName: "งานทดสอบทางกายภาพ",
        timelab1: "",
        timelab2: "",
        checkwork: false,
      },
      {
        idx: uuidv4(),
        ListName: "งานวิเคราะห์น้ำ",
        timelab1: "",
        timelab2: "",
        checkwork: false,
      },
    ]);
    setEnsure([
      {
        idx: uuidv4(),
        time1: "",
        time2: "",
      },
    ]);
    // array 4 ตรวจรายงานผล
    setCheckReport([
      {
        idx: uuidv4(),
        time1: "",
        time2: "",
      },
    ]);
    // array 5 คศวท รับรองรายงาน
    setEnsureReport([
      {
        idx: uuidv4(),
        time1: "",
        time2: "",
      },
    ]);
    // array 6 นำส่งรายงานผลให้ LSU
    setReportLSU([
      {
        idx: uuidv4(),
        time1: "",
        time2: "",
        sender: "",
        recipient: "",
      },
    ]);

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
      getData(`tracking/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
        setProcedure(res.product.procedure);
        setLabPrint(res.product.labPrint);
        setEnsure(res.product.ensure);
        setCheckReport(res.product.checkReport);
        setEnsureReport(res.product.ensureReport);
        setReportLSU(res.product.reportLSU);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
    }
  }, [id]);

  useEffect(() => {
    if (onEdit) {
      procedure.map((procedure, ids) => {
        if ((ids = 0)) {
          setChecked1(procedure.checkwork);
        }
        if ((ids = 1)) {
          setChecked2(procedure.checkwork);
        }
        if ((ids = 2)) {
          setChecked3(procedure.checkwork);
        }
        if ((ids = 3)) {
          setChecked4(procedure.checkwork);
        }
        if ((ids = 4)) {
          setChecked5(procedure.checkwork);
        }
      });
    }
  }, [onEdit, id]);

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
    console.log(files);

    files.forEach((file) => {
      // if (file.size > 2024 * 2024)
      //   return (err = "The largest image size is 1mb");

      // if (file.type !== "image/jpeg" && file.type !== "image/png")
      //   return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 1) newImages.push(file);
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
          ensure: [...ensure],
          checkReport: [...checkReport],
          ensureReport: [...ensureReport],
          reportLSU: [...reportLSU],
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
          ensure: [...ensure],
          checkReport: [...checkReport],
          ensureReport: [...ensureReport],
          reportLSU: [...reportLSU],
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
  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  //   dispatch({ type: "NOTIFY", payload: {} });
  // };

  const handleChangeInput2 = async (idx, event) => {
    const newInputFields = procedure.map((i) => {
      if (idx === i.idx) {
        const value =
          event === true || event === false ? event : event.target.value;

        event === true || event === false
          ? (i["checkwork"] = value)
          : (i[event.target.name] = value);
        //  console.log("defaultSelected:",event.target.type,"checked:", event.target.checked?event.target.checked:"fuck")
      }

      return i;
    });

    const newInputFields1 = labPrint.map((i) => {
      if (idx === i.idx) {
        const value =
          event === true || event === false ? event : event.target.value;

        event === true || event === false
          ? (i["checkwork"] = value)
          : (i[event.target.name] = value);
        //  console.log("defaultSelected:",event.target.type,"checked:", event.target.checked?event.target.checked:"fuck")
      }

      return i;
    });

    // const newInputFields1 = labPrint.map((i) => {
    //   if (idx === i.idx) {
    //     i[event.target.name] = event.target.value;
    //   }
    //   return i;
    // });
    const newInputFields2 = ensure.map((i) => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    const newInputFields3 = checkReport.map((i) => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    const newInputFields4 = ensureReport.map((i) => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    const newInputFields5 = reportLSU.map((i) => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setProcedure(newInputFields);
    setLabPrint(newInputFields1);
    setEnsure(newInputFields2);
    setCheckReport(newInputFields3);
    setEnsureReport(newInputFields4);
    setReportLSU(newInputFields5);
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
                      ติดตามผลวิเคราะห์ทดสอบ
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                      ไม่รู้จะใส่อะไร เผื่ออยากใส่
                    </p>
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      {/* เพิ่มวันที่ต่อท้ายหมายเลขใบขอรับบริการ "เก็บข้อมูลเพิ่ม โดยใช้ชื่อว่า วันที่รับใบขอรับบริการ" */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          หมายเลขใบขอรับบริการ : ฝวคN
                          <input
                            type="text"
                            value={serviceNumber}
                            name="serviceNumber"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                            onChange={handleChangeInput}
                            required
                          />
                        </label>
                        
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          เบอร์โทรศัพท์ผู้ขอรับบริการ :
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            name="phone"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                            onChange={handleChangeInput}
                            required
                          />
                        </label>
                        
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          <div className=" bg-rose-300 grid  py-2 px-2 rounded-md  my-3">
                            <label
                              htmlFor="message"
                              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                            >
                              วันที่ LSU รับตัวอย่าง :
                            </label>
                            <input
                              type="date"
                              value={lsu}
                              name="lsu"
                              onChange={handleChangeInput}
                              className="block p-2.5 w-[20%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ></input>
                          </div>
                        </label>

                        <div className=" bg-indigo-300 grid  py-2 px-2 rounded-md  my-3">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                          >
                            วันที่ห้องปฏิบัติการรับตัวอย่าง :
                          </label>
                          <input
                            type="date"
                            value={lab}
                            name="lab"
                            onChange={handleChangeInput}
                            className="block p-2.5 w-[20%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                        </div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          วันที่นัดรับรายงานผลการทดสอบ :
                          <input
                            type="date"
                            value={timeOut}
                            name="timeOut"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                            onChange={handleChangeInput}
                            required
                          />
                        </label>

                        <div className=" ">
                          {procedure.map((procedure, ids) => (
                            <div
                              key={procedure.idx}
                              className="bg- bg-slate-200 px-5 py-2 mb-3 rounded-xl"
                            >
                              <Checkbox
                                name="checkwork"
                                checked={
                                  onEdit ? procedure.checkwork : defaultChk(ids)
                                }
                                type="checkbox"
                                value={
                                  onEdit ? procedure.checkwork : defaultChk(ids)
                                }
                                onChange={(event) => {
                                  ids = ids + 1;
                                  console.log(ids);
                                  if (ids == 1) {
                                    setChecked1(!checked1);
                                    console.log("chk" + ids + ":" + !checked1);
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 2) {
                                    setChecked2(!checked2);
                                    console.log("chk" + ids + ":" + !checked2);
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 3) {
                                    setChecked3(!checked3);
                                    console.log("chk" + ids + ":" + !checked3);
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 4) {
                                    setChecked4(!checked4);
                                    console.log("chk" + ids + ":" + !checked4);
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 5) {
                                    setChecked5(!checked5);
                                    console.log("chk" + ids + ":" + !checked5);
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                }}
                                defaultSelected={
                                  onEdit
                                    ? (event) => {
                                        const ida = ids + 1;
                                        if (ida == 1) {
                                          setChecked1(procedure.checkwork);
                                          defaultChk(ids);
                                          return procedure.checkwork;
                                        } else if (ida == 2) {
                                          setChecked2(!procedure.checkwork);
                                          defaultChk(ids);
                                          return procedure.checkwork;
                                        } else if (ida == 3) {
                                          setChecked3(procedure.checkwork);
                                          defaultChk(ids);
                                          return procedure.checkwork;
                                        } else if (ida == 4) {
                                          setChecked4(procedure.checkwork);
                                          defaultChk(ids);
                                          return procedure.checkwork;
                                        } else if (ida == 5) {
                                          setChecked5(!procedure.checkwork);
                                          defaultChk(ids);
                                          return procedure.checkwork;
                                        }
                                      }
                                    : defaultChk(ids)
                                }
                                size="xl"
                              >
                                <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                                  {ids + 1}. ขั้นตอนการดำเนินการ :
                                  <input
                                    type="text"
                                    name="ListName"
                                    value={procedure.ListName}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block w-full p-2.5"
                                    disabled
                                  />
                                </label>
                              </Checkbox>

                              <div
                                hidden={
                                  onEdit
                                    ? (event) => {
                                        const ida = ids + 1;
                                        if (ida == 1) {
                                          setChecked1(procedure.checkwork);

                                          return procedure.checkwork;
                                        } else if (ida == 2) {
                                          setChecked2(procedure.checkwork);

                                          return procedure.checkwork;
                                        } else if (ida == 3) {
                                          setChecked3(procedure.checkwork);

                                          return procedure.checkwork;
                                        } else if (ida == 4) {
                                          setChecked4(procedure.checkwork);

                                          return procedure.checkwork;
                                        } else if (ida == 5) {
                                          setChecked5(!procedure.checkwork);

                                          return procedure.checkwork;
                                        }
                                      }
                                    : hiddenChk(ids)
                                }
                                className="bg-slate-300 px-5 py-2 rounded-xl"
                              >
                                <div className="bg-slate-300 px-5 py-2 rounded-xl">
                                  <div>
                                    <div className=" md:grid  space-y-2 space-x-2 md:space-y-0 grid-cols-3">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        วันที่เริ่มดำเนินการทดสอบ :
                                        <input
                                          type="date"
                                          name="time1"
                                          value={procedure.time1}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                        />
                                      </label>
                                      {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                  วันที่ทดสอบ
                                  <input
                                    type="date"
                                    name="time2"
                                    value={procedure.time2}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                    onChange={(event) =>
                                      handleChangeInput2(procedure.idx, event)
                                    }
                                  /></label> */}
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        วันที่ดำเนินการทดสอบเสร็จ :
                                        <input
                                          type="date"
                                          name="time4"
                                          value={procedure.time4}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                        />
                                      </label>
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        รวมเวลาดำเนินการทั้งหมด(ชั่วโมง) :
                                        <input
                                          type=""
                                          name="time3"
                                          value={procedure.time3}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                          placeholder="กรอกจำนวนชั่วโมง"
                                        />
                                      </label>

                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        พารามิเตอร์ที่ทดสอบ :
                                        <input
                                          type="text"
                                          name="param"
                                          value={procedure.param}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                          placeholder="Ex. Color"
                                        />
                                      </label>
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        เครื่องมือที่ใช้ทดสอบ :
                                        <input
                                          type="text"
                                          name="tool"
                                          value={procedure.tool}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                          placeholder="Ex. COD"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          รายงานผลการทดสอบลำดับที่ : RepฝวคN
                          <input
                            type="text"
                            value={reportNumber}
                            name="reportNumber"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                            onChange={handleChangeInput}
                            required
                          />
                        </label>

                        {/* Lab ส่งผลการทดสอบพิมพ์ */}
                        <div className=" ">
                          {labPrint.map((procedure, ids) => (
                            <div
                              key={procedure.idx}
                              className="bg- bg-yellow-200 px-5 py-2 mb-3 rounded-xl"
                            >
                              <Checkbox
                                name="checkworkx"
                                checked={
                                  onEdit
                                    ? procedure.checkwork
                                    : defaultChkx(ids)
                                }
                                type="checkbox"
                                value={
                                  onEdit
                                    ? procedure.checkwork
                                    : defaultChkx(ids)
                                }
                                onChange={(event) => {
                                  ids = ids + 1;
                                  console.log(ids);
                                  if (ids == 1) {
                                    setCheckedx1(!checkedx1);
                                    console.log(
                                      "chkx" + ids + ":" + !checkedx1
                                    );
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 2) {
                                    setCheckedx2(!checkedx2);
                                    console.log(
                                      "chkx" + ids + ":" + !checkedx2
                                    );
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 3) {
                                    setCheckedx3(!checkedx3);
                                    console.log(
                                      "chkx" + ids + ":" + !checkedx3
                                    );
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 4) {
                                    setCheckedx4(!checkedx4);
                                    console.log(
                                      "chkx" + ids + ":" + !checkedx4
                                    );
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                  if (ids == 5) {
                                    setCheckedx5(!checkedx5);
                                    console.log(
                                      "chkx" + ids + ":" + !checkedx5
                                    );
                                    handleChangeInput2(procedure.idx, event);
                                  }
                                }}
                                defaultSelected={
                                  onEdit
                                    ? procedure.checkwork
                                    : defaultChkx(ids)
                                }
                                size="xl"
                              >
                                <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                                  {ids + 1}. ขั้นตอนการจัดทำรายงานผลการทดสอบ :
                                  <input
                                    type="text"
                                    name="ListName"
                                    value={procedure.ListName}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block w-full p-2.5"
                                    disabled
                                  />
                                </label>
                              </Checkbox>

                              <div
                                hidden={hiddenChkx(ids)}
                                className="bg-yellow-300 px-5 py-2 rounded-xl"
                              >
                                <div className="bg-yellow-300 px-5 py-2 rounded-xl">
                                  <div>
                                    <div className=" md:grid  space-y-2 space-x-2 md:space-y-0 grid-cols-3">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        ส่งพิมพ์วันที่ :
                                        <input
                                          type="date"
                                          name="timelab1"
                                          value={procedure.timelab1}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                        />
                                      </label>

                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                        พิมพ์เสร็จวันที่ :
                                        <input
                                          type="date"
                                          name="timelab2"
                                          value={procedure.timelab2}
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                          onChange={(event) =>
                                            handleChangeInput2(
                                              procedure.idx,
                                              event
                                            )
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* <div className="flex flex-col w-full bg-indigo-500">
                          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                            Lab ส่งผลการทดสอบพิมพ์
                          </label>
                          {labPrint.map((labPrint) => (
                            <div key={labPrint.idx}>
                              <div className=" md:flex space-x-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                  Lab ส่งผลการทดสอบพิมพ์
                                  <input
                                    type="text"
                                    name="ListName"
                                    value={labPrint.ListName}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                              block w-full p-2.5"
                                    disabled
                                  />
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                  ส่งพิมพ์วันที่ :
                                  <input
                                    type="date"
                                    name="timelab1"
                                    value={labPrint.timelab1}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                    onChange={(event) =>
                                      handleChangeInput2(labPrint.idx, event)
                                    }
                                  />
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                  พิมพ์เสร็จวันที่ :
                                  <input
                                    type="date"
                                    name="timelab2"
                                    value={labPrint.timelab2}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                    onChange={(event) =>
                                      handleChangeInput2(labPrint.idx, event)
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                        </div> */}

                        {ensure.map((ensure) => (
                          <div
                            key={ensure.idx}
                            className="flex flex-col w-full bg-orange-300 py-2 px-2 rounded-md mb-3"
                          >
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                              หน. ฝวค. รับรองผลการทดสอบ
                            </label>
                            <div className=" md:flex space-x-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                เสนอ หน. ฝวค. วันที่ :
                                <input
                                  type="date"
                                  name="time1"
                                  value={ensure.time1}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(ensure.idx, event)
                                  }
                                />
                              </label>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                หน. ฝวค. ลงนามวันที่ :
                                <input
                                  type="date"
                                  name="time2"
                                  value={ensure.time2}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(ensure.idx, event)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        ))}

                        {checkReport.map((checkReport) => (
                          <div
                            key={checkReport.idx}
                            className="flex flex-col w-full bg-green-300  py-2 px-2 rounded-md mb-3"
                          >
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                              หน. กลุ่มตรวจสอบรายงานผลการทดสอบ
                            </label>
                            <div className=" md:flex space-x-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                เสนอ หน. กลุ่มวันที่ :
                                <input
                                  type="date"
                                  name="time1"
                                  value={checkReport.time1}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(checkReport.idx, event)
                                  }
                                />
                              </label>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                หน. กลุ่มลงนามวันที่ :
                                <input
                                  type="date"
                                  name="time2"
                                  value={checkReport.time2}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(checkReport.idx, event)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        ))}

                        {ensureReport.map((ensureReport) => (
                          <div
                            key={ensureReport.idx}
                            className="flex flex-col w-full bg-blue-300  py-2 px-2 rounded-md mb-3"
                          >
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                              ผอ ศศวท. รับรองรายงานผลการทดสอบ
                            </label>
                            <div className=" md:flex space-x-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                เสนอ ผอ. ศศวท. วันที่ :
                                <input
                                  type="date"
                                  name="time1"
                                  value={ensureReport.time1}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(ensureReport.idx, event)
                                  }
                                />
                              </label>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                ผอ. ศศวท. ลงนามวันที่ :
                                <input
                                  type="date"
                                  name="time2"
                                  value={ensureReport.time2}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(ensureReport.idx, event)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                        <div className=" flex">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              อว 7432(3)/Rep :
                            </label>
                            <input
                              type="text"
                              value={rnb}
                              name="rnb"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="Runing Number . . . "
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              วันที่ :
                              <input
                                type="date"
                                value={timeIn}
                                name="timeIn"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                                onChange={handleChangeInput}
                                required
                              />
                            </label>
                          </div>
                        </div>
                        {reportLSU.map((reportLSU) => (
                          <div
                            key={reportLSU.idx}
                            className="flex flex-col w-full bg-rose-300  py-2 px-2 rounded-md mb-3"
                          >
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800">
                              ฝวค. นำส่งรายงานผลให้ LSU
                            </label>
                            <div className=" md:flex space-x-2">
                              {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                ออกเลขวันที่ :
                                <input
                                  type="date"
                                  name="time1"
                                  value={reportLSU.time1}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(reportLSU.idx, event)
                                  }
                                />
                              </label> */}
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                ส่ง LSU วันที่ :
                                <input
                                  type="date"
                                  name="time2"
                                  value={reportLSU.time2}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(reportLSU.idx, event)
                                  }
                                />
                              </label>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                ผู้ส่ง :
                                <input
                                  type=""
                                  name="sender"
                                  value={reportLSU.sender}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                  block w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(reportLSU.idx, event)
                                  }
                                />
                              </label>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                                ผู้รับ :
                                <input
                                  type=""
                                  name="recipient"
                                  value={reportLSU.recipient}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                                  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                                   w-full p-2.5"
                                  onChange={(event) =>
                                    handleChangeInput2(reportLSU.idx, event)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        ))}

                        <div className=" bg-indigo-300 grid  py-2 px-2 rounded-md mb-3">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                          >
                            หมายเหตุ
                          </label>
                          <input
                            type="textarea"
                            value={note}
                            name="note"
                            onChange={handleChangeInput}
                            rows="8"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="เขียนหมายเหตุได้ที่นี่ หรือไม่เขียนก็ได้"
                          ></input>
                        </div>
                      </div>

                      <div className="flex justify-center items-center w-full">
                        <label className="flex flex-col justify-center items-center w-full h-24 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <input
                            type="file"
                            onChange={handleUploadInput}
                            accept="application/pdf"
                          />
                        </label>
                      </div>
                      <div className="row  mx-0">
                        {images.map((img, index) => (
                          <p
                            href={img.url}
                            key={index}
                            className="file_img my-1 rounded-xl shadow-sm flex flex-row px-3 py-2 mx-3    items-center bg-gray-200"
                          >
                            <a href={img.url ? img.url : "#"}>
                              <img
                                className="h-15 w-10"
                                src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png"
                              />
                            </a>
                            <p className="pl-2 pr-3">
                              {false ? img.url : "Uploaded PDF"}
                            </p>

                            <span
                              className=" cursor-pointer bg-gray-800 text-white flex justify-center rounded-full items-center  self-center w-8 h-8"
                              onClick={() => deleteImage(index)}
                            >
                              X
                            </span>
                          </p>
                        ))}
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
                    Slides.map((product, ict) => (
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
                        <p>{product.serviceNumber}</p>
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
