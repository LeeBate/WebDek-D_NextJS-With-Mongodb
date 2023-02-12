import Head from "next/head";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData, getData, putData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
        <section className=" h-screen bg-[#f1f1f1]">
          <div className="container w-full h-full">
            <div className="flex flex-row justify-center items-center">
              <div className="col col-xl-12 col-lg-8 mt-14">
                <div className="card rounded-[1rem] ">
                  <div className="row g-0 items-center py-4 px-5">
                    <div className="col-md-5 col-lg-5 d-none d-md-block">
                      <img
                        src={"/images/1_4.png"}
                        className="transform transition duration-700 scale-75 hover:scale-100 object-cover rounded-md "
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center ">
                      <div className="card-body p-4 text-black">
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <p className="text-2xl md:text-3xl xl:text-4xl font-bold mb-0">
                              เช็คการติดตามผลการทดสอบได้ที่นี่!
                            </p>
                          </div>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              
                            >
                              เลขใบขอรับบริการ
                            </label>

                            <input
                              
                              type="text"
                              required
                              placeholder="เลขการติดตามผลจะต้องตรงกันกับใบขอรับบริการ เช่น ฝวคN...."
                              name="Serialnumber"
                              value={Serialnumber}
                              onChange={handleChangeInputser}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                             
                            >
                              เบอร์โทรศัพท์
                            </label>
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="เบอร์โทรศัพท์ที่ใช้ในการขอรับบริการ"
                              autoComplete="off"
                              
                              required
                              name="tel"
                              value={tel}
                              onChange={handleChangeInputtel}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>
          <div className=" py-3">
            {!founddata ? (
              <h2>เกิดข้อผิดพลาด โปรดติดต่อเจ้าหน้าที่</h2>
            ) : (
              founddata.map((product, key) => (
                <div className="text-xl flex flex-col " key={key}>
                  <div className="flex flex-col justify-center items-center mb-5">
                    <p className=" font-bold text-3xl">
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
                    <div className=" flex flex-col md:flex-row">
                    <div className=" flex flx-col md:flex-row">
                      <ul className="list-disc list-inside md:list-none px-2 ">
                        <li>
                          วันที่{" "}
                          {product.sntime ? ConvertDate(product.sntime) : "-"}{" "}
                        </li>
                      </ul>
                    </div>
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
                    <p className=" font-semibold mr-2 ">
                      วันที่นัดรับรายงานผลการทดสอบ :
                    </p>
                    <ul className="list-disc list-inside md:list-none px-2">
                      <li>
                        {product.timeOut ? ConvertDate(product.timeOut) : "-"}
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col px-5">
                    <p className="font-semibold  pt-3">รายงานผลการทดสอบ </p>

                    <ThemeProvider theme={theme}>
                      <Box sx={{ width: "100%", typography: "body1"}}>
                        <div className=" container">
                          <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            <TableContainer sx={{ maxHeight: 640 }}>
                              <Table stickyHeader aria-label="sticky table" >
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">ลำดับที่</TableCell>
                                    <TableCell align="center">เลขที่หนังสือ</TableCell>
                                    <TableCell align="center">วันที่</TableCell>
                                  </TableRow>
                                </TableHead>
                                {founddata[0].repList.concat(
                                  founddata[0].repListDate
                                ).length === 0 ? (
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
                                          <TableCell align="center">
                                            {product.ListName}
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              founddata[0].repListDate[ict]
                                                .repName
                                            }
                                          </TableCell>
                                          <TableCell align="center">
                                            {founddata[0].repListDate[ict].date
                                              ? ConvertDate(
                                                  founddata[0].repListDate[ict]
                                                    .date
                                                )
                                              : "-"}
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
              className=" p-8 m-8  md:mx-16 lg:mx-24 flex justify-center items-center rounded-md bg-slate-200"
              key={ict}
            >
              <div className=" flex flex-col text-base  xl:text-2xl">
                {track.lsu.length != 0 ? (
                  <div className="flex flex-row ">
                    <div className="flex flex-col items-center">
                      <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                      <div className="relative w-1 h-14 bg-[#050505]/70"></div>
                    </div>

                    <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                      วันที่ LSU รับตัวอย่าง :
                      <p className="md:ml-1 font-normal">
                        {" "}
                        {ConvertDate(track.lsu)}
                      </p>
                    </label>
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

                    <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                      วันที่ห้องปฏิบัติการ รับตัวอย่าง :
                      <p className="md:ml-1 font-normal">
                        {track.lab ? ConvertDate(track.lab) : "-"}
                      </p>
                    </label>
                  </div>
                ) : (
                  <></>
                )}
                <div className=" rounded-md">
                  {founddata[0].procedure.filter(
                    (item) => item.checkwork === true
                  ).length > 0 ? (
                    founddata[0].procedure
                      .filter((item) => item.checkwork === true)
                      .map((procedure, ict) => (
                        <div key={ict} className="rounded-md ">
                          <div  className="flex flex-row ">
                            <div className="flex flex-col items-center">
                              {procedure.checkwork ? (
                                <BsFillCheckCircleFill
                                  size={40}
                                  color="#5F9B6F"
                                />
                              ) : (
                                <BsFillCheckCircleFill
                                  size={40}
                                  color="#949494"
                                />
                              )}
                              <div className="relative w-1 h-80 md:h-48 lg:h-60 bg-[#050505]/70"></div>
                            </div>
                            <div className="flex-row">
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                ขั้นตอนการดำเนินการ :{" "}
                                <p className="md:ml-1 font-normal">
                                  {procedure.ListName}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                วันที่เริ่มดำเนินการ :
                                <p className="md:ml-1 font-normal">
                                  {procedure.time1
                                    ? ConvertDate(procedure.time1)
                                    : "-"}
                                </p>
                              </label>

                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                เวลาดำเนินการทั้งหมด :
                                <p className="md:ml-1 font-normal">
                                  {procedure.time3 ? procedure.time3 : "-"}
                                  ชั่วโมง
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                วันที่ดำเนินการเสร็จ :
                                <p className="md:ml-1 font-normal">
                                  {" "}
                                  {procedure.time4
                                    ? ConvertDate(procedure.time4)
                                    : "-"}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                เครื่องมือ :
                                <p className="md:ml-1 font-normal">
                                  {procedure.tool ? procedure.tool : "-"}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                พารามิเตอร์ :
                                <p className="md:ml-1 font-normal">
                                  {procedure.param ? procedure.param : "-"}
                                </p>
                              </label>
                            </div>
                          </div>
                          {
                            procedure.time1_2 || procedure.time2_2 || procedure.time3_2 || procedure.time4_2 || procedure.tool_2 || procedure.param_2 ? (
                              <div  className="flex flex-row ">
                            <div className="flex flex-col items-center">
                              {procedure.checkwork ? (
                                <BsFillCheckCircleFill
                                  size={40}
                                  color="#5F9B6F"
                                />
                              ) : (
                                <BsFillCheckCircleFill
                                  size={40}
                                  color="#949494"
                                />
                              )}
                              <div className="relative w-1 h-80 md:h-48 lg:h-60 bg-[#050505]/70"></div>
                            </div>
                            <div className="flex-row">
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                ขั้นตอนการดำเนินการ :{" "}
                                <p className="md:ml-1 font-normal">
                                  {procedure.ListName}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                วันที่เริ่มดำเนินการ :
                                <p className="md:ml-1 font-normal">
                                  {procedure.time1_2
                                    ? ConvertDate(procedure.time1_2)
                                    : "-"}
                                </p>
                              </label>

                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                เวลาดำเนินการทั้งหมด :
                                <p className="md:ml-1 font-normal">
                                  {procedure.time3_2 ? procedure.time3_2 : "-"}
                                  ชั่วโมง
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                วันที่ดำเนินการเสร็จ :
                                <p className="md:ml-1 font-normal">
                                  {" "}
                                  {procedure.time4_2
                                    ? ConvertDate(procedure.time4_2)
                                    : "-"}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                เครื่องมือ :
                                <p className="md:ml-1 font-normal">
                                  {procedure.tool_2 ? procedure.tool_2 : "-"}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                พารามิเตอร์ :
                                <p className="md:ml-1 font-normal">
                                  {procedure.param_2 ? procedure.param_2 : "-"}
                                </p>
                              </label>
                            </div>
                          </div>
                            ):(<></>) 
                          }
                        </div>
                      ))
                  ) : (
                    // ไม่มีข้อมูล
                    <div className="flex flex-row ">
                      <div className="flex flex-col items-center">
                        <BsFillCheckCircleFill size={40} color="#949494" />

                        <div className="relative w-1 h-44 md:h-48 lg:h-60 bg-[#050505]/70"></div>
                      </div>
                      <div className="flex-row">
                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          ขั้นตอนการดำเนินการ :
                          <p className="md:ml-1 font-normal">
                             -
                          </p>
                        </label>
                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          วันที่เริ่มดำเนินการ :
                          <p className="md:ml-1 font-normal">
                            -
                          </p>
                        </label>

                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          เวลาดำเนินการทั้งหมด :
                          <p className="md:ml-1 font-normal">
                            -
                          </p>
                        </label>
                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          วันที่ดำเนินการเสร็จ :
                          <p className="md:ml-1 font-normal">
                            -
                          </p>
                        </label>
                        <label className="pl-2 mt-1 font-semibold">
                          {" "}
                          เครื่องมือ :{" "}
                          <p className="md:ml-1 font-normal">
                            -
                          </p>
                        </label>
                        <label className="pl-2 mt-1 font-semibold">
                          {" "}
                          พารามิเตอร์ :{" "}
                          <p className="md:ml-1 font-normal">
                            -
                          </p>
                        </label>
                      </div>
                    </div>
                  )}
                  {founddata[0].labPrint.filter(
                    (item) => item.checkwork === true
                  ).length > 0 ? (
                    founddata[0].labPrint
                      .filter((item) => item.checkwork === true)
                      .map((labPrint, ict) => (
                        <div key={ict} className=" rounded-md ">
                          <div  className="flex flex-row ">
                            <div className="flex flex-col items-center">
                              {labPrint.checkwork ? (
                                <BsFillCheckCircleFill
                                  size={40}
                                  color="#5F9B6F"
                                />
                              ) : (
                                <BsFillCheckCircleFill
                                  size={40}
                                  color="#949494"
                                />
                              )}
                              <div className="relative w-1 h-36 md:h-32 bg-[#050505]/70"></div>
                            </div>
                            <div className="flex-row">
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                Lab ส่งผลการทดสอบพิมพ์ :
                                <p className="md:ml-1 font-normal">
                                  {labPrint.ListName}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                ส่งพิมพ์วันที่ :{" "}
                                <p className="md:ml-1 font-normal">
                                  {labPrint.timelab1
                                    ? ConvertDate(labPrint.timelab1)
                                    : "-"}
                                </p>
                              </label>
                              <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                พิมพ์เสร็จวันที่ :{" "}
                                <p className="md:ml-1 font-normal">
                                  {labPrint.timelab2
                                    ? ConvertDate(labPrint.timelab2)
                                    : "-"}
                                </p>
                              </label>
                            </div>
                            
                          </div>

                          {labPrint.timelab1_2 || labPrint.timelab2_2 ? (
                             <div  className="flex flex-row ">
                             <div className="flex flex-col items-center">
                               {labPrint.checkwork ? (
                                 <BsFillCheckCircleFill
                                   size={40}
                                   color="#5F9B6F"
                                 />
                               ) : (
                                 <BsFillCheckCircleFill
                                   size={40}
                                   color="#949494"
                                 />
                               )}
                               <div className="relative w-1 h-36 md:h-32 bg-[#050505]/70"></div>
                             </div>
                             <div className="flex-row">
                               <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                 Lab ส่งผลการทดสอบพิมพ์ :
                                 <p className="md:ml-1 font-normal">
                                   {labPrint.ListName}
                                 </p>
                               </label>
                               <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                 ส่งพิมพ์วันที่ :{" "}
                                 <p className="md:ml-1 font-normal">
                                   {labPrint.timelab1_2
                                     ? ConvertDate(labPrint.timelab1_2)
                                     : "-"}
                                 </p>
                               </label>
                               <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                                 พิมพ์เสร็จวันที่ :{" "}
                                 <p className="md:ml-1 font-normal">
                                   {labPrint.timelab2_2
                                     ? ConvertDate(labPrint.timelab2_2)
                                     : "-"}
                                 </p>
                               </label>
                             </div>
                             
                           </div>
                            ) : (<></>)}
                        </div>
                      ))
                  ) : (
                    //ไม่มีข้อมูล
                    <div className="flex flex-row ">
                      <div className="flex flex-col items-center">
                        <BsFillCheckCircleFill size={40} color="#949494" />

                        <div className="relative w-1 h-36 md:h-32 bg-[#050505]/70"></div>
                      </div>
                      <div className="flex-row">
                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          Lab ส่งผลการทดสอบพิมพ์ :
                          <p className="md:ml-1 font-normal">
                            -
                          </p>
                        </label>
                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          ส่งพิมพ์วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                           -
                          </p>
                        </label>
                        <label className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          พิมพ์เสร็จวันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                           -
                          </p>
                        </label>
                      </div>
                    </div>
                  )}{" "}
                </div>

                {/* <div className=" rounded-md ">
                  {true ? (
                    founddata[0].labPrint
                      .filter((item) => item.checkwork === true)
                      .map((labPrint, ict) => (
                        <div key={ict} className="flex flex-row ">
                          <div className="flex flex-col items-center">
                            {labPrint.checkwork ? (
                              <BsFillCheckCircleFill
                                size={40}
                                color="#5F9B6F"
                              />
                            ) : (
                              <BsFillCheckCircleFill
                                size={40}
                                color="#949494"
                              />
                            )}
                            <div className="relative w-1 h-36 md:h-32 bg-[#050505]/70"></div>
                          </div>
                          <div className="flex-row">
                            <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                              Lab ส่งผลการทดสอบพิมพ์ :
                              <p className="md:ml-1 font-normal">
                                {labPrint.ListName}
                              </p>
                            </p>
                            <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                              ส่งพิมพ์วันที่ :{" "}
                              <p className="md:ml-1 font-normal">
                                {labPrint.timelab1
                                  ? ConvertDate(labPrint.timelab1)
                                  : "-"}
                              </p>
                            </p>
                            <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                              พิมพ์เสร็จวันที่ :{" "}
                              <p className="md:ml-1 font-normal">
                                {labPrint.timelab2
                                  ? ConvertDate(labPrint.timelab2)
                                  : "-"}
                              </p>
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <></>
                  )}{" "}
                </div> */}

                {true ? (
                  founddata[0].ensure.map((ensure, ict) => (
                    <div key={ict} className="flex flex-row ">
                      <div className="flex flex-col items-center">
                        {ensure.time1.length != 0 &&
                        ensure.time2.length != 0 ? (
                          <BsFillCheckCircleFill size={40} color="#5F9B6F" />
                        ) : (
                          <BsFillCheckCircleFill size={40} color="#949494" />
                        )}
                        <div className="relative w-1 h-32 md:h-32  bg-[#050505]/70"></div>
                      </div>
                      <div className="flex-row">
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          หน. ฝวค. รับรองผลฯ{" "}
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          {ensure.ListName}
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          เสนอ หน. ฝวค. วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {ensure.time1 ? ConvertDate(ensure.time1) : "-"}
                          </p>
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          หน. ฝวค. ลงนาม วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {ensure.time2 ? ConvertDate(ensure.time2) : "-"}
                          </p>
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
                        <div className="relative w-1 h-32 md:h-32 bg-[#050505]/70"></div>
                      </div>
                      <div className="flex-row">
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          หน. กลุ่มงานฯ ตรวจรายงานผลฯ :{" "}
                        </p>
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          {" "}
                          {checkReport.ListName}
                        </p>
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          เสนอ หน. กลุ่ม วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {checkReport.time1
                              ? ConvertDate(checkReport.time1)
                              : "-"}
                          </p>
                        </p>
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          หน. กลุ่ม ลงนาม วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {checkReport.time2
                              ? ConvertDate(checkReport.time2)
                              : "-"}
                          </p>
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
                        <div className="relative w-1 h-32 md:h-32 bg-[#050505]/70"></div>
                      </div>
                      <div className="flex-row">
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          ผอ. ศควท. รับรองรายงานฯ :{" "}
                        </p>
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          {" "}
                          {ensureReport.ListName}
                        </p>
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          เสนอ ผอ. ศควท. วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {ensureReport.time1
                              ? ConvertDate(ensureReport.time1)
                              : "-"}
                          </p>
                        </p>
                        <p className="pl-2 mt-1  font-semibold flex flex-col md:flex-row">
                          ผอ. ศควท. ลงนาม วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {ensureReport.time2
                              ? ConvertDate(ensureReport.time2)
                              : "-"}
                          </p>
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
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          ฝวค. นำส่งรายงานผลให้ LSU :{" "}
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          {" "}
                          {reportLSU.ListName}
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          ส่ง LSU วันที่ :{" "}
                          <p className="md:ml-1 font-normal">
                            {reportLSU.time2 ? reportLSU.time2 : "-"}
                          </p>
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          ผู้ส่ง :
                          <p className="md:ml-1 font-normal">
                            {reportLSU.sender ? reportLSU.sender : "-"}
                          </p>
                        </p>
                        <p className="pl-2 mt-1 font-semibold flex flex-col md:flex-row">
                          ผู้รับ :{" "}
                          <p className="md:ml-1 font-normal">
                            {reportLSU.recipient ? reportLSU.recipient : "-"}
                          </p>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
                <div className=" mt-3">
                  {founddata.map((product, ict) =>
                    product.note ? (
                      <div className="p-2 m-2 "key={ict}>
                        <p className="  text-black" >
                          หมายเหตุ : {product.note}
                        </p>
                      </div>
                    ) : (
                      <div className=" p-2 m-2 ">
                        <p className=" text-black">หมายเหตุ : - </p>
                      </div>
                    )
                  )}
                </div>
                <div className=" flex justify-center items-center ">
                <div
                  onClick={gobackclick}
                  className="flex items-center justify-center w-full py-2 mt-5 bg-[#1a237e] hover:bg-[#FFA500] cursor-pointer text-white rounded-lg max-w-sm"
                >
                  ค้นหาอีกครั้ง
                </div>
                </div>
              </div>
            </div>
          ))}
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