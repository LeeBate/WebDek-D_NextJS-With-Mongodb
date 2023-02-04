import Head from "next/head";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData, getData, putData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import FullLayout from "../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import Paper from "@mui/material/Paper";

import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { BsFillCheckCircleFill } from "react-icons/bs";

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

  const { state, dispatch } = useContext(DataContext);

  const router = useRouter();

  const [isfound, setIsfound] = useState(false);

  const [Slides, setSlides] = useState(props.products);
  console.log("slides", Slides);
  const [Serialnumber, setSerialnumber] = useState();
  const [tel, settel] = useState();

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
      ListName: "งานวิเคราะห์ทางกายภาพ",
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
      ListName: "งานวิเคราะห์ทางน้ำ",
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
      ListName: "งานวิเคราะห์ทางกายภาพ",
      timelab1: "",
      timelab2: "",
      checkwork: false,
    },
    {
      idx: uuidv4(),
      ListName: "งานวิเคราะห์ทางน้ำ",
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

  const handleChangeInputser = (e) => {
    const { value } = e.target;
    setSerialnumber(value);
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleChangeInputtel = (e) => {
    const { value } = e.target;
    settel(value);
    dispatch({ type: "NOTIFY", payload: {} });
  };

  let data;
  const [founddata, setfounddata] = useState();
  const [proc, setproc] = useState();

  const gobackclick = async (e) => {
    setIsfound(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.replace(router.asPath);
    console.log(Slides);
    console.log(Serialnumber);
    let temp;
    if (
      Slides.filter(
        (item) =>
          item.serviceNumber.toLowerCase() === Serialnumber.toLowerCase()
      ).length != 0
    ) {
      console.log(
        Slides.filter(
          (item) =>
            item.serviceNumber.toLowerCase() === Serialnumber.toLowerCase()
        )
      );
      temp = await Slides.filter(
        (item) =>
          item.serviceNumber.toLowerCase() === Serialnumber.toLowerCase()
      );
      if (temp.filter((item) => item.phone === tel).length !== 0) {
        data = await temp.filter((item) => item.phone === tel);
        setfounddata(data);
        setproc(founddata);
        setIsfound(true);
        
        
        
      } else {
        dispatch({
          type: "NOTIFY",
          payload: { error: "หมายเลขโทรศัพท์ไม่ถูกต้อง" },
        });
      }
    } else dispatch({ type: "NOTIFY", payload: { error: "ไม่พบหมายเลข" } });
  };

  function ConvertDate(date) {
    const data = new Date(date).toLocaleString("th-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    });

    return data;
  }

  const [showPassword, setShowPassword] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  return (
    <div>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <Head>
        <title>CALLLAB</title>
      </Head>
      {isfound === false ? (
        <center>
          <div className=" bg-[#c6c9ea] ">
            <div className="col-md-6 col-lg-7 d-flex align-items-center ">
              <div className="card-body p-4 text-black">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <p className="text-2xl md:text-3xl xl:text-4xl font-bold mb-0">
                      กรอกหมายเลขใบคำขอรับบริการ
                    </p>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example17">
                      หมายเลข
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ฝวคN001"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="Serialnumber"
                      value={Serialnumber}
                      onChange={handleChangeInputser}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="form2Example27"
                      placeholder="099999999"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      name="tel"
                      value={tel}
                      onChange={handleChangeInputtel}
                    />
                    {/* <label
                      onClick={() => setShowPassword(!showPassword)}
                      className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer "
                      
                    >
                      
                    </label> */}
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-[#2735bd] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#232fa8] hover:shadow-lg focus:bg-[#1e2993] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#1a237e] active:shadow-lg transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      ค้นหา
                    </button>
                  </div>

                  {/*
                         <p className="mb-5 pb-lg-2  ">
                          ถ้าคุณยังไม่มีบัญชี?
                          <Link href="/register">
                            <a className="text-[#2735bd]" href="#!">
                              {" "}
                              สมัครที่นี่
                            </a>
                          </Link>
                        </p> 
                        */}
                </form>
              </div>
            </div>
          </div>
        </center>
      ) : (
        <div>
          <div className=" py-3">
            {!founddata ? (
              <h2>เกิดข้อผิดพลาด โปรดติดต่อเจ้าหน้าที่</h2>
            ) : (
              founddata.map((product, key) => (
                <div className="text-2xl flex flex-col " key={key}>
                  <div className="flex flex-col justify-center items-center mb-5">
                    <p className=" font-bold text-4xl">
                      ลำดับเส้นทางของตัวอย่าง
                    </p>
                    {/* <ul className=" flex flex-col ml-5">
                        {product.repListDate.map((repListDate,key) => (
                          <p key={key}>
                            <li>
                            อว 7432(3)/Rep : {repListDate.ListName}{" "}
                            
                            {repListDate.date ? ConvertDate(repListDate.date) : "-"}
                          </li></p>
                        ))}
                      </ul> */}
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between px-5 ">
                    <div className=" flex flex-col md:flex-row">
                      <p className="font-semibold">หมายเลขใบคำขอรับบริการ :</p>
                      <ul className=" flex flex-col md:flex-row list-disc list-inside md:list-none px-2">
                        <li>{product.serviceNumber}</li>
                      </ul>
                    </div>
                    <div className=" flex flx-cor md:flex-row">
                      <ul className="list-disc list-inside md:list-none px-2 ">
                        <li>
                          วันที่{" "}
                          {product.sntime ? ConvertDate(product.sntime) : "-"}{" "}
                        </li>
                      </ul>
                      {product.images.length > 0 ? (
                        <a
                          href={product.images[0].url}
                          rel="noopener"
                          download="file"
                        >
                          {" "}
                          <img
                            className="max-w-[130px]"
                            src={
                              "https://www.pngall.com/wp-content/uploads/2/Downloadable-PDF-Button-PNG-File.png"
                            }
                            alt="pdf"
                          />
                        </a>
                      ) : (
                        <a rel="noopener" download="file">
                          {" "}
                          <img
                            className="max-w-[130px] filter grayscale "
                            src={
                              "https://www.pngall.com/wp-content/uploads/2/Downloadable-PDF-Button-PNG-File.png"
                            }
                            alt="pdf"
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className=" flex flex-col md:flex-row px-5">
                    <p className=" font-semibold mr-2">
                      วันที่นัดรับรายงานผลการทดสอบ :
                    </p>
                    <ul className="list-disc list-inside md:list-none px-2">
                      <li>
                        {product.timeOut ? ConvertDate(product.timeOut) : "-"}
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col px-5">
                    <p className="font-semibold text-3xl ">รายงานผลการทดสอบ </p>

                    {/* <ul className=" flex flex-col">
                      {product.repList.map((repList, key) => (
                        <p key={key}>
                          <li>RepฝวคN{repList.ListName}</li>
                        </p>
                      ))}
                    </ul> */}

                    
                    <ThemeProvider theme={theme}>
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <div className=" container">
                          <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            <TableContainer sx={{ maxHeight: 640 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>ลำดับที่</TableCell>
                                    <TableCell>เลขที่หนังสือ</TableCell>
                                    <TableCell>วันที่</TableCell>
                                  </TableRow>
                                </TableHead>
                                {founddata[0].repList.concat(founddata[0].repListDate).length === 0 ? (
                                  <div className="alert alert-warning my-auto">
                                    <div>
                                      <div className="swap-off">
                                        😭{" "}
                                        <span>
                                          ไม่พบข้อมูล! โปรดค้นหาใหม่อีกครั้ง
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  founddata[0].repList
                                    .slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                    )
                                    .map((product, ict) => (
                                      <TableBody key={ict}>
                                        <TableRow
                                          hover
                                          role="checkbox"
                                          tabIndex={-1}
                                        >
                                          <TableCell>
                                            {product.ListName}
                                            
                                          </TableCell>
                                          <TableCell>
                                            {founddata[0].repListDate[ict].repName}
                                          </TableCell>
                                          <TableCell>
                                            {ConvertDate(founddata[0].repListDate[ict].date)}
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    ))
                                   
                                )}
                              </Table>
                            </TableContainer>
                            <TablePagination
                              rowsPerPageOptions={[20, 50, 100]}
                              component="div"
                              count={founddata[0].repList.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          </Paper>
                        </div>
                      </Box>
                    </ThemeProvider>
                    
                  </div>

                  <hr className="mt-5"></hr>
                </div>
              ))
            )}
          </div>
          {founddata.map((track, ict) => (
            <div
              className="mx-28 pt-10 pl-48 mt-5 rounded-md bg-slate-200"
              key={ict}
            >
              {track.lsu.length != 0 ? (
                <div className="flex flex-row">
                  <div className="flex flex-col items-center">
                    <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                    <div className="relative   w-1 h-14 bg-[#050505]/70"></div>
                  </div>

                  <p className="pl-2 mt-1 font-semibold">
                    วันที่ LSU รับตัวอย่าง :{" "}
                    <p className=" font-normal">{ConvertDate(track.lsu)}</p>
                  </p>
                </div>
              ) : (
                <></>
              )}

              {track.lsu.length != 0 ? (
                <div className="flex flex-row">
                  <div className="flex flex-col items-center">
                    {track.lab.length != 0 ? (
                      <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                    ) : (
                      <BsFillCheckCircleFill size={40} color="#949494" />
                    )}
                    <div className="relative   w-1 h-14 bg-[#050505]/70"></div>
                  </div>

                  <p className="pl-2 mt-1 font-semibold">
                    วันที่ห้องปฏิบัติการ รับตัวอย่าง :{" "}
                    <p className=" font-normal">
                      {track.lab ? ConvertDate(track.lab) : "-"}
                    </p>
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="bg-green-100 rounded-md mr-28">
                {true ? (
                  founddata[0].procedure
                    .filter((item) => item.checkwork === true)
                    .map((procedure, ict) => (
                      <div key={ict} className="flex flex-row ">
                        <div className="flex flex-col items-center">
                          {procedure.checkwork ? (
                            <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                          ) : (
                            <BsFillCheckCircleFill size={40} color="#949494" />
                          )}
                          <div className="relative w-1 h-48 bg-[#050505]/70"></div>
                        </div>
                        <div className="flex-row">
                          <p className="pl-2 mt-1 font-semibold">
                            ขั้นตอนการดำเนินการ : {procedure.ListName}
                          </p>
                          <p className="pl-2 mt-1 font-semibold">
                            {" "}
                            วันที่เริ่มดำเนินการ :{" "}
                            {procedure.time1
                              ? ConvertDate(procedure.time1)
                              : "-"}
                          </p>

                          <p className="pl-2 mt-1 font-semibold">
                            {" "}
                            เวลาดำเนินการทั้งหมด :{" "}
                            {procedure.time3 ? procedure.time3 : "-"} ชั่วโมง
                          </p>
                          <p className="pl-2 mt-1 font-semibold">
                            {" "}
                            วันที่ดำเนินการเสร็จ :{" "}
                            {procedure.time4
                              ? ConvertDate(procedure.time4)
                              : "-"}
                          </p>
                          <p className="pl-2 mt-1 font-semibold">
                            {" "}
                            เครื่องมือ : {procedure.tool ? procedure.tool : "-"}
                          </p>
                          <p className="pl-2 mt-1 font-semibold">
                            {" "}
                            พารามิเตอร์ :{" "}
                            {procedure.param ? procedure.param : "-"}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <></>
                )}{" "}
              </div>

              <div className="bg-yellow-100 rounded-md mr-28">
                {true ? (
                  founddata[0].labPrint
                    .filter((item) => item.checkwork === true)
                    .map((labPrint, ict) => (
                      <div key={ict} className="flex flex-row ">
                        <div className="flex flex-col items-center">
                          {labPrint.checkwork ? (
                            <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                          ) : (
                            <BsFillCheckCircleFill size={40} color="#949494" />
                          )}
                          <div className="relative w-1 h-20 bg-[#050505]/70"></div>
                        </div>
                        <div className="flex-row">
                          <p className="pl-2 mt-1 font-semibold">
                            Lab ส่งผลการทดสอบพิมพ์ : {labPrint.ListName}
                          </p>
                          <p className="pl-2 mt-1 font-normal">
                            ส่งพิมพ์วันที่ :{" "}
                            {labPrint.timelab1
                              ? ConvertDate(labPrint.timelab1)
                              : "-"}
                          </p>
                          <p className="pl-2 mt-1 font-normal">
                            พิมพ์เสร็จวันที่ :{" "}
                            {labPrint.timelab2
                              ? ConvertDate(labPrint.timelab2)
                              : "-"}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <></>
                )}{" "}
              </div>

              {true ? (
                founddata[0].ensure.map((ensure, ict) => (
                  <div key={ict} className="flex flex-row ">
                    <div className="flex flex-col items-center">
                      {ensure.time1.length != 0 && ensure.time2.length != 0 ? (
                        <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                      ) : (
                        <BsFillCheckCircleFill size={40} color="#949494" />
                      )}
                      <div className="relative w-1 h-20 bg-[#050505]/70"></div>
                    </div>
                    <div className="flex-row">
                      <p className="pl-2 mt-1 font-semibold">
                        หน. ฝวค. รับรองผลฯ{" "}
                      </p>
                      <p className="pl-2 mt-1 font-semibold">
                        {ensure.ListName}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        เสนอ หน. ฝวค. วันที่ :{" "}
                        {ensure.time1 ? ConvertDate(ensure.time1) : "-"}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        หน. ฝวค. ลงนาม วันที่ :{" "}
                        {ensure.time2 ? ConvertDate(ensure.time2) : "-"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {true ? (
                founddata[0].checkReport.map((checkReport, ict) => (
                  <div key={ict} className="flex flex-row ">
                    <div className="flex flex-col items-center">
                      {checkReport.time1.length != 0 &&
                      checkReport.time2.length != 0 ? (
                        <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                      ) : (
                        <BsFillCheckCircleFill size={40} color="#949494" />
                      )}
                      <div className="relative w-1 h-20 bg-[#050505]/70"></div>
                    </div>
                    <div className="flex-row">
                      <p className="pl-2 mt-1 font-semibold">
                        หน. กลุ่ม ตรวจรายงานผลฯ :{" "}
                      </p>
                      <p className="pl-2 mt-1 font-semibold">
                        {" "}
                        {checkReport.ListName}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        เสนอ หน. กลุ่ม วันที่ :{" "}
                        {checkReport.time1
                          ? ConvertDate(checkReport.time1)
                          : "-"}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        หน. กลุ่ม ลงนาม วันที่ :{" "}
                        {checkReport.time2
                          ? ConvertDate(checkReport.time2)
                          : "-"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {true ? (
                founddata[0].ensureReport.map((ensureReport, ict) => (
                  <div key={ict} className="flex flex-row ">
                    <div className="flex flex-col items-center">
                      {ensureReport.time1.length != 0 &&
                      ensureReport.time2.length != 0 ? (
                        <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                      ) : (
                        <BsFillCheckCircleFill size={40} color="#949494" />
                      )}
                      <div className="relative w-1 h-20 bg-[#050505]/70"></div>
                    </div>
                    <div className="flex-row">
                      <p className="pl-2 mt-1 font-semibold">
                        ผอ. ศควท. รับรองรายงานฯ :{" "}
                      </p>
                      <p className="pl-2 mt-1 font-semibold">
                        {" "}
                        {ensureReport.ListName}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        เสนอ ผอ. ศควท. วันที่ :{" "}
                        {ensureReport.time1
                          ? ConvertDate(ensureReport.time1)
                          : "-"}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        ผอ. ศควท. ลงนาม วันที่ :{" "}
                        {ensureReport.time2
                          ? ConvertDate(ensureReport.time2)
                          : "-"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {true ? (
                founddata[0].reportLSU.map((reportLSU, ict) => (
                  <div key={ict} className="flex flex-row ">
                    <div className="flex flex-col items-center">
                      {reportLSU.time2.length != 0 &&
                      reportLSU.sender.length != 0 &&
                      reportLSU.recipient ? (
                        <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                      ) : (
                        <BsFillCheckCircleFill size={40} color="#949494" />
                      )}
                      {/* <div className="relative w-1 h-20 bg-[#050505]/70"></div> */}
                    </div>
                    <div className="flex-row">
                      <p className="pl-2 mt-1 font-semibold">
                        ฝวค. นำส่งรายงานผลให้ LSU :{" "}
                      </p>
                      <p className="pl-2 mt-1 font-semibold">
                        {" "}
                        {reportLSU.ListName}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        ส่ง LSU วันที่ :{" "}
                        {reportLSU.time2 ? reportLSU.time2 : "-"}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        ผู้ส่ง : {reportLSU.sender ? reportLSU.sender : "-"}
                      </p>
                      <p className="pl-2 mt-1 font-normal">
                        ผู้รับ :{" "}
                        {reportLSU.recipient ? reportLSU.recipient : "-"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              <div className="my-18"></div>
              {founddata.map((product, ict) =>
                product.note ? (
                  <p className=" mt-14 text-red-600" key={ict}>
                    หมายเหตุ : {product.note}
                  </p>
                ) : (
                  <p className="mt-14 text-red-600">หมายเหตุ : -</p>
                )
              )}

              <div className="pb-20"></div>
            </div>
          ))}

          <div
            onClick={gobackclick}
            className="px-3 py-2 mt-5 bg-black cursor-pointer text-white rounded-lg max-w-sm"
          >
            ค้นหาอีกครั้ง
          </div>
        </div>
      )}
    </div>
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
    }&category=${category}&sort=${sort}&serviceNumber=${search}`
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
