import * as React from "react";
import { useState } from "react";
import FullLayout from "../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import Link from "next/link";


function Services() {
  //TAB Change
  const [tabIndex, setTabIndex] = React.useState("0");
  // const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    
    <ThemeProvider theme={theme} >
       <div className="service-header"  >
          <h2 className=" text-xl font-bold md:text-3xl lg:text-4xl text-[#1a237e]">
          
            บริการวิเคราะห์ทดสอบ
          </h2>
          <p className="text-lg font-medium md:text-lg">
            ฝ่ายวิเคราะห์ด้วยเครื่องมือ ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
          </p>
          
        </div>
      <div id="services" className="services-container" >
       
        <Grid container spacing={0} >
          <Grid item xs={12} lg={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabIndex} isFitted variant="enclosed" >
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TabList
                    mb="1em"
                    onChange={handleChange}
                    variant="scrollable"
                    aria-label="Tab"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    <Tab
                      icon={<Avatar alt="" src="/images/Artboard-5.ico" />}
                      iconPosition="start"
                      value="0"
                      label="บริการวิเคราะห์ด้วยกล้องจุลทรรศน์"
                    ></Tab>
                    <Tab
                      icon={<Avatar alt="" src="/images/Artboard-6.ico" />}
                      iconPosition="start"
                      value="1"
                      label="บริการวิเคราะห์ทางเคมีและชีวเคมี"
                    ></Tab>
                    <Tab
                      icon={<Avatar alt="" src="/images/Artboard 8.ico" />}
                      iconPosition="start"
                      value="2"
                      label="บริการวิเคราะห์ทางจุลชีววิทยา"
                    ></Tab>
                    <Tab
                      icon={<Avatar alt="" src="/images/Artboard 7.ico" />}
                      iconPosition="start"
                      value="3"
                      label="บริการทดสอบทางกายภาพ"
                    ></Tab>
                    <Tab
                      icon={<Avatar alt="" src="/images/Artboard 9.ico" />}
                      iconPosition="start"
                      value="4"
                      label="บริการวิเคราะห์น้ำ"
                    ></Tab>
                  </TabList>
                </Box>

                <div className="service-card-container" >
                  <TabPanel value="0">
                    <div className="service-cards">
                      <div className="flex flex-col lg:flex-row">
                        <img
                          className="h-52 w-full md:h-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 2xl:h-96 2xl:w-96   object-cover"
                          src={"/images/2_6.png"}
                        />
                        <div className=" mx-2 mt-3">
                          <h3 className=" text-left text-lg font-bold lg:text-3xl leading-relaxed">
                          <a className="text-[#1a237e]">บริการกล้องถ่ายภาพสมรรถนะสูง</a> เช่น 
                             กล้องจุลทรรศน์อิเล็กตรอน กล้องจุลทรรศน์แสง
                          </h3>

                          <ul className="list-disc text-lg ml-10 leading-relaxed">
                            <li>
                              วิเคราะห์ปริมาณความร้อน,
                              ค่าความจุความร้อนจำเพาะและจุดหลอมเหลวของตัวอย่างต่างๆ
                            </li>
                            <li>
                              วิเคราะห์โครงสร้างทางจุลภาคของวัสดุต่างๆด้วยกล้องจุลทรรศน์อิเล็กตรอนแบบส่องกราดและแบบส่องผ่าน
                              (SEM และ TEM)
                            </li>
                            <li>
                              วิเคราะห์องค์ประกอบทางเคมีของวัสดุ ด้วยเทคนิค EDS
                            </li>
                          </ul>
                          <div className="flex pt-3 justify-center items-center">
                            <Link href="/serviceform">
                              <button className="  bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white w-full py-2 rounded-full">
                                แบบฟอร์มขอรับบริการ
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="1">
                    <div className="service-cards">
                      <div className=" flex flex-col lg:flex-row">
                        <img
                          className="h-52 w-full md:h-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 2xl:h-96 2xl:w-96  object-cover"
                          src={"/images/2_6.png"}
                        />
                        <div className=" mx-2 mt-3 ">
                          <h3 className=" text-left text-lg font-bold lg:text-3xl leading-relaxed">
                          <a className="text-[#1a237e]">บริการวิเคราะห์ ทดสอบทางด้านเคมีและชีวเคมี
                            เครื่องมือวิเคราะห์ขั้นสูง </a>
                            แบ่งประเภทการวิเคราะห์ทดสอบได้ดังนี้ เช่น
                          </h3>
                          <ul className="list-disc text-lg ml-10 leading-relaxed">
                            <li>
                              การวิเคราะห์องค์ประกอบของธาตุ เช่น
                              วิเคราะห์สารปนเปื้อนประเภทโลหะหนักในตัวอย่างน้ำดื่ม
                              น้ำเสีย น้ำบาดาล
                            </li>
                            <li>การวิเคราะห์แร่ธาตุในตัวอย่าง ดิน หิน</li>
                            <li>
                              การวิเคราะห์ธาตุ คาร์บอน ไนโตรเจน ซัลเฟอร์
                              ในตัวอย่างชีวมวล เช่น ถ่านหิน
                            </li>
                            <li>
                              การวิเคราะห์ธาตุในรูปของประจุ เช่น ฟลูออไรด์
                              คลอไรด์ ไนเตรท ไนไตรท์ แคลเซียม แมกนีเซียม
                              ในตัวอย่าง น้ำดื่ม น้ำประปา
                              เป็นต้น:เครื่องมือที่ให้บริการ Ion Chromatograph
                            </li>
                            <li>
                              การวิเคราะห์องค์ประกอบในรูปของสารประกอบเช่น
                              วิเคราะห์กรดไขมัน กรดอินทรีย์ กรดอะมิโน สารกันบูด
                              สีสังเคราะห์ในตัวอย่างอาหารและเครื่องดื่ม เป็นต้น
                            </li>
                            <li>
                              การวิเคราะห์โครงสร้างของสาร เช่น
                              ตรวจสอบความเป็นผลึก
                              ตรวจหาองค์ประกอบและโครงสร้างของผลึก
                              ตรวจหาพันธะเคมี
                            </li>
                          </ul>
                          <div className="  flex pt-3 justify-center items-center">
                            <Link href="/serviceform">
                              <button className="  bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white w-full py-2 rounded-full">
                                แบบฟอร์มขอรับบริการ
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    <div className="service-cards">
                      <div className=" flex flex-col lg:flex-row">
                        <img
                          className="h-52 w-full md:h-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 2xl:h-96 2xl:w-96  object-cover"
                          src={"/images/2_6.png"}
                        />
                        <div className=" mx-2 mt-3">
                        <h3 className=" text-left text-lg font-bold lg:text-3xl leading-relaxed">
                        <a className="text-[#1a237e]">    บริการตรวจวิเคราะห์จุลินทรีย์ในตัวอย่างประเภทต่างๆในขอบข่าย </a>
                            Aerobic Plate Count, Yeast and Molds Coliform, Fecal
                            coliform, Escherichia coli, Clostridium perfringens
                            Clostridium botulinum
                            และแบคทีเรียที่ก่อให้เกิดโรคต่างๆ
                          </h3>
                          <ul className="list-disc text-lg ml-10 leading-relaxed">
                            <li>
                              ชุดที่ 1: Aerobic Plate Count+Coliform+E.coli
                            </li>
                            <li>ชุดที่ 2: Acid หรือ High acid canned food</li>
                            <li>ชุดที่ 3: Low acid canned food</li>
                          </ul>
                          
                          <div className="  flex pt-3 justify-center items-center">
                            <Link href="/serviceform">
                              <button className="  bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white w-full py-2 rounded-full">
                                แบบฟอร์มขอรับบริการ
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="3">
                    <div className="service-cards">
                      <div className=" flex flex-col lg:flex-row">
                        <img
                          className="h-52 w-full md:h-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 2xl:h-96 2xl:w-96  object-cover"
                          src={"/images/2_6.png"}
                        />
                        <div className="mx-2 mt-3">
                        <h3 className=" text-left text-lg font-bold lg:text-3xl leading-relaxed">
                        <a className="text-[#1a237e]">   บริการทดสอบตัวอย่างทางกายภาพ </a>
                            เช่น ทดสอบความชื้น เถ้า
                            พื้นที่ผิว ความพรุน วัดขนาดของอนุภาค
                          </h3>
                          <ul className="list-disc text-lg ml-10 leading-relaxed">
                            <li>วัดค่าพลังงานความร้อน</li>
                            <li>วัดการเปลี่ยนแปลงน้ำหนักของตัวอย่าง</li>
                            <li>
                              วัดการเปลี่ยนแปลงพลังงาน
                              ด้วยการเพิ่มหรือลดอุณหภูมิแก่ตัวอย่าง
                            </li>
                          </ul>
                          <div className="  flex pt-3 justify-center items-center">
                            <Link href="/serviceform">
                              <button className="  bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white w-full py-2 rounded-full">
                                แบบฟอร์มขอรับบริการ
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="4">
                    <div className="service-cards">
                      <div className=" flex flex-col lg:flex-row">
                        <img
                          className="h-52 w-full md:h-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96   object-cover"
                          src={"/images/2_6.png"}
                        />
                        <div className=" mx-2 mt-3">
                          <h3 className=" text-left text-lg font-bold lg:text-3xl leading-relaxed">
                          <a className="text-[#1a237e]">  บริการตรวจวิเคราะห์คุณภาพน้ำประเภทต่างๆตามประกาศที่เกี่ยวข้อง </a>
                            เช่น ประกาศกระทรวงสาธารณสุข
                            ประกาศกรมโรงงานอุตสาหกรรม
                            ด้วยวิธีมาตรฐานสากลในขอบข่ายดังต่อไปนี้ เช่น
                          </h3>
                          <ul className="list-disc text-lg ml-10 leading-relaxed">
                            <li>Total Hardness, Chloride, Nitrate</li>
                            <li>
                              Total Solids, Suspended Solids, Total Dissolved
                              Solids
                            </li>
                            <li>
                              pH, COD, BOD, Total Kjeldahl Nitrogen, Grease&Oil
                            </li>
                          </ul>
                          <div className="  flex pt-3 justify-center items-center">
                            <Link href="/serviceform">
                              <button className=" bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white w-full py-2 rounded-full">
                                แบบฟอร์มขอรับบริการ
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
export default Services;