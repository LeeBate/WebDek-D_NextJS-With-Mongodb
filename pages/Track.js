import Head from "next/head";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { imageUpload } from "../utils/imageUpload";
import { postData, getData, putData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import FullLayout from "../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import filterSearch from "../utils/filterSearch";
import FilterNews from "../components/FilterNews";
import Link from "next/link";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { Checkbox } from '@nextui-org/react';
import Image from "next/image";

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

const [isfound, setIsfound] = useState(false);

useEffect(() => {
  
}, []);

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
      tool:  "",
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
  
    }
  }, [id]);

      useEffect(() => {
        if(onEdit){
        procedure.map((procedure,ids) => {
          if(ids=0){
            setChecked1(procedure.checkwork)
          } if(ids=1){
            setChecked2(procedure.checkwork)
          } if(ids=2){
            setChecked3(procedure.checkwork)
          } if(ids=3){
            setChecked4(procedure.checkwork)
          } if(ids=4){
            setChecked5(procedure.checkwork)
          } 
      })}
      }, [onEdit,id]);

  const handleChangeInputser = (e) => {
    const { value } = e.target;
    setSerialnumber(value)
    dispatch({ type: "NOTIFY", payload: {} });
  }; 
  const handleChangeInputtel = (e) => {
    const {  value } = e.target;
    settel(value)
    dispatch({ type: "NOTIFY", payload: {} });
  };



 let data;
 const [founddata, setfounddata] = useState();
 const [proc, setproc] = useState();
 
 const gobackclick = async (e) => 
 {
  setIsfound(false)
 }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    router.replace(router.asPath);
   console.log(Slides)
   console.log(Serialnumber)
   let temp;
    if(Slides.filter((item) => item.serviceNumber.toLowerCase() == Serialnumber.toLowerCase()).length != 0){
        console.log(Slides.filter((item) => item.serviceNumber.toLowerCase() == Serialnumber.toLowerCase()))
        temp = await Slides.filter((item) => item.serviceNumber.toLowerCase() == Serialnumber.toLowerCase());
     if(temp.filter((item) => item.phone == tel).length != 0){
    data =  await  temp.filter((item) =>  item.phone == tel);
    setfounddata(data)
    setproc(founddata)
    setIsfound(true)
  console.log(isfound)
  console.log(data)
  console.log("proc",data.procedure)
  console.log(data.images)
  
    
}else{
    dispatch({ type: "NOTIFY", payload: { error: "หมายเลขโทรศัพท์ไม่ถูกต้อง" } });
}     
}
    else
    dispatch({ type: "NOTIFY", payload: { error: "ไม่พบหมายเลข" } });
  };

  const [Serialnumber, setSerialnumber] = useState();
  const [tel, settel] = useState();
    
   
   const handleChangeInput2 = async (idx, event) => {
    const newInputFields = procedure.map((i) => {
      if (idx === i.idx) {
        const value = event  === true ||  event  === false ? event : event.target.value;
        event  === true ||  event  === false ? i["checkwork"] = value:  i[event.target.name] = value;
      //  console.log("defaultSelected:",event.target.type,"checked:", event.target.checked?event.target.checked:"fuck")
      }
      return i;
    });
    const newInputFields1 = labPrint.map((i) => {
      if (idx === i.idx) {
        const value = event  === true ||  event  === false ? event : event.target.value;
    
        event  === true ||  event  === false ? i["checkwork"] = value:  i[event.target.name] = value;
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
  <div>
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
      { isfound == false ?
      <center>

        
     <div className="mt-[20%] bg-[#c6c9ea] ">
      <div className="col-md-6 col-lg-7 d-flex align-items-center ">
                    <div className="card-body p-4 text-black">
      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <p className="text-2xl md:text-3xl xl:text-4xl font-bold mb-0">
                          กรอกหมายเลขใบขอรับบริการ
                          </p>
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                           หมายเลข
                          </label>
                          <input 
                            type="text"
                            id="form2Example17"
                            required
                            placeholder="ฝวคN001"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="Serialnumber"
                            value={Serialnumber}
                            onChange={handleChangeInputser}
                          />
                        </div>


                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                           เบอร์โทรศัพท์
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            placeholder="099999999"
                            
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            name="tel"
                            value={tel}
                            onChange={handleChangeInputtel}
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
       :
       <div>
       <div className="">
       
        <div className=" mt-8">
                  {!founddata ? (
                    <h2>เกิดข้อผิดพลาด โปรดติดต่อเจ้าหน้าที่</h2>
                  ) : (
                    founddata.map((product, ict) => (
                    <div className="text-2xl flex flex-col mx-28">
                      
                    <div className="flex flex-row justify-between">
                    <p className=" font-bold">ลำดับเส้นทางของตัวอย่าง</p>
                    <p className=" ">อว 7432(3)/Rep : {product.rnb}</p>
                    </div> 
                    <div className="flex flex-row justify-between">
                    <p className="font-semibold">หมายเลขใบขอรับบริการ : ฝวคN{product.serviceNumber}</p>
                    <p className=" ">วันที่ : {product.timeIn?product.timeIn:"-"}</p>
                    </div> 
                    <div className="flex flex-row justify-between">
                    <p className="">รายงานผลการทดสอบลำดับที่ : RepฝวคN{product.reportNumber?product.reportNumber:"-"}</p>
                    <p className=" font-semibold ">วันที่นัดรับผลการทดสอบ :  {product.timeOut?product.timeOut:"-"}</p>
                    </div>
                    <p>หมายโทรศัพท์ : {product.phone}</p>
                    <div className="flex flex-row ">
                      <p className="mr-2">ดาวโหลดใบขอรับบริการ  </p>
                   <a href={product.images[0].url} target="_blank" download="file"> <img className="max-w-[130px]"
              src={"https://www.pngall.com/wp-content/uploads/2/Downloadable-PDF-Button-PNG-File.png"}
              alt="pdf" />
            </a>
            </div>
            <hr className="mt-5"></hr>
                     </div>
                    ))
                  )}
                </div>
      {     founddata.map((track, ict) => (        
       <div className="mx-28 pt-10 pl-48 mt-5 rounded-md bg-slate-200">
        {track.lsu.length!=0 ? 

           <div className="flex flex-row">
           <div className="flex flex-col items-center">
           <BsFillCheckCircleFill size={40} color="#5F9B6F"/>
            <div className="relative   w-1 h-14 bg-[#050505]/70"></div>
            </div>
           
            <p className="pl-2 mt-1 font-semibold">วันที่ LSU รับตัวอย่าง : <p className=" font-normal">{track.lsu}</p></p></div>  
             
           : <></>    
      }

       { track.lsu.length!=0 ? 

           <div className="flex flex-row">
           <div className="flex flex-col items-center">
           {track.lab.length!=0 ? <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
            <div className="relative   w-1 h-14 bg-[#050505]/70"></div>
            </div>
           
          <p className="pl-2 mt-1 font-semibold">วันที่ห้องปฏิบัติการ รับตัวอย่าง : <p className=" font-normal">{track.lab ? track.lab : "-" }</p></p></div>  
             
           :  <></>    
      }
         <div className="bg-green-100 rounded-md mr-28">
             {  true  ? 
     
      founddata[0].procedure.map((procedure, ict) => (     
           <div key={ict} className="flex flex-row ">
           <div className="flex flex-col items-center">
           {procedure.checkwork ? <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
            <div className="relative w-1 h-48 bg-[#050505]/70"></div>
            </div>
            <div className="flex-row">
          <p className="pl-2 mt-1 font-semibold">ขั้นตอนการดำเนินการ : {procedure.ListName  }</p>
          <p className="pl-2 mt-1 font-semibold"> วันที่เริ่มดำเนินการ : {procedure.time1?procedure.time1:"-"}</p>
          <p className="pl-2 mt-1 font-semibold"> ช่วงเวลาที่เริ่มทดสอบ</p>
          <p className="pl-2 mt-1 font-normal"> วันที่ : {procedure.time2?procedure.time2: "-"}</p>
          <p className="pl-2 mt-1 font-normal"> ช่วงเวลา : {procedure.time3?procedure.time3:"-"}</p>
          <p className="pl-2 mt-1 font-semibold"> วันที่ดำเนินการเสร็จ : {procedure.time4?procedure.time4:"-"}</p>
          <p className="pl-2 mt-1 font-normal"> เครื่องมือ : {procedure.tool?procedure.tool:"-"}</p>

          
          </div>
          </div>
          ))
           :<></>
           } </div>

            <div className="bg-yellow-100 rounded-md mr-28">
             { true ? 
            founddata[0].labPrint.map((procedure, ict) => (     
           <div key={ict} className="flex flex-row ">
           <div className="flex flex-col items-center">
           {procedure.checkwork ? <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
            <div className="relative w-1 h-20 bg-[#050505]/70"></div>
            </div>
          <div className="flex-row">
          <p className="pl-2 mt-1 font-semibold">Lab ส่งผลการทดสอบพิมพ์ : {procedure.ListName  }</p>
          <p className="pl-2 mt-1 font-normal">ส่งพิมพ์วันที่ : {procedure.timelab1 ? procedure.timelab1: "-"}</p>
          <p className="pl-2 mt-1 font-normal">พิมพ์เสร็จวันที่ : {procedure.timelab2 ? procedure.timelab2: "-"}</p>
           
          </div>
          </div>
          ))
           :<></>
           } </div>
      
      { true ? 
            founddata[0].ensure.map((procedure, ict) => (     
           <div key={ict} className="flex flex-row ">
           <div className="flex flex-col items-center">
           {procedure.time1.length != 0 && procedure.time2.length != 0 ? <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
            <div className="relative w-1 h-20 bg-[#050505]/70"></div>
            </div>
          <div className="flex-row">
          <p className="pl-2 mt-1 font-semibold">หน. ฝวค. รับรองผลฯ </p>
          <p className="pl-2 mt-1 font-semibold">{procedure.ListName }</p>
          <p className="pl-2 mt-1 font-normal">เสนอ หน. ฝวค. วันที่ : { procedure.time1 ? procedure.time1: "-"}</p>
          <p className="pl-2 mt-1 font-normal">หน. ฝวค. ลงนาม วันที่ :  {procedure.time2 ? procedure.time2: "-"}</p>
          </div>
          </div>
          ))
           :<></>
           }

           
            { true ? 
                founddata[0].checkReport.map((procedure, ict) => (     
              <div key={ict} className="flex flex-row ">
              <div className="flex flex-col items-center">
              {procedure.time1.length != 0 && procedure.time2.length != 0 ? <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
                <div className="relative w-1 h-20 bg-[#050505]/70"></div>
                </div>
              <div className="flex-row">
              <p className="pl-2 mt-1 font-semibold">หน. กลุ่ม ตรวจรายงานผลฯ : </p>
              <p className="pl-2 mt-1 font-semibold"> {procedure.ListName  }</p>
              <p className="pl-2 mt-1 font-normal">เสนอ หน. กลุ่ม วันที่ : { procedure.time1 ? procedure.time1: "-"}</p>
              <p className="pl-2 mt-1 font-normal">หน. กลุ่ม ลงนาม วันที่ :  {procedure.time2 ? procedure.time2: "-"}</p>
              </div>
              </div>
              ))
              :<></>
              } 
              
              { true ? 
                founddata[0].ensureReport.map((procedure, ict) => (     
              <div key={ict} className="flex flex-row ">
              <div className="flex flex-col items-center">
              {procedure.time1.length != 0 && procedure.time2.length != 0 ? <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
                <div className="relative w-1 h-20 bg-[#050505]/70"></div>
                </div>
              <div className="flex-row">
              <p className="pl-2 mt-1 font-semibold">ผอ. ศควท. รับรองรายงานฯ : </p>
              <p className="pl-2 mt-1 font-semibold"> {procedure.ListName  }</p>
              <p className="pl-2 mt-1 font-normal">เสนอ ผอ. ศควท. วันที่ : { procedure.time1 ? procedure.time1: "-"}</p>
              <p className="pl-2 mt-1 font-normal">ผอ. ศควท. ลงนาม วันที่ :  {procedure.time2 ? procedure.time2: "-"}</p>
              </div>
              </div>
              ))
              :<></>
              }
                
              { true ? 
                founddata[0].reportLSU.map((procedure, ict) => (     
              <div key={ict} className="flex flex-row ">
              <div className="flex flex-col items-center">
              {procedure.time1.length != 0 && procedure.time2.length != 0 &&procedure.sender.length != 0 &&  procedure.recipient ?  <BsFillCheckCircleFill size={40} color="#5F9B6F"/>:<BsFillCheckCircleFill size={40} color="#949494"/>}
                {/* <div className="relative w-1 h-20 bg-[#050505]/70"></div> */}
                </div>
              <div className="flex-row">
              
              <p className="pl-2 mt-1 font-semibold">ฝวค. นำส่งรายงานผลให้ LSU : </p>
              <p className="pl-2 mt-1 font-semibold"> {procedure.ListName  }</p>
              <p className="pl-2 mt-1 font-normal">ออกเลขวันที่ : { procedure.time1 ? procedure.time1: "-"}</p>
              <p className="pl-2 mt-1 font-normal">ส่ง LSU วันที่ :  {procedure.time2 ? procedure.time2: "-"}</p>
              <p className="pl-2 mt-1 font-normal">ผู้ส่ง : { procedure.sender ? procedure.sender: "-"}</p>
              <p className="pl-2 mt-1 font-normal">ผู้รับ :  {procedure.recipient ? procedure.recipient: "-"}</p>
              
              </div>
              </div>
              ))
              :<></>
              }

               <div className="my-18"></div>
              { founddata.map((product, ict) => (
                 product.note ?
                <p className=" mt-14 text-red-600">หมายเหตุ : {product.note}</p>:  <p className="mt-14 text-red-600">หมายเหตุ : -</p>
              
               ))}

          <div className="pb-20"></div>
      
       </div>
      ))
      } 

       </div>
        <div onClick={gobackclick} className="px-3 py-2 mt-5 bg-black cursor-pointer text-white rounded-lg max-w-sm">ค้นหาอีกครั้ง</div></div>
      }
 </div>
  );
};

export async function getServerSideProps({ query }) {
        const page = query.page         || 1;
        const category = query.category || "all";
        const sort = query.sort         || "";
        const search = query.search     || "all";

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


