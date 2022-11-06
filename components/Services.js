import * as React from "react";
import { useState } from "react";
import FullLayout from "../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import Tab from "@mui/material/Tab";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Avatar } from "@mui/material";

function Services() {
  //TAB Change
  const [tabIndex, setTabIndex] = React.useState("0");
  // const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="services" className="services-container">
        <div className="service-header">
          <h2 className=" text-lg font-bold md:text-3xl lg:text-4xl">
            บริการวิเคราะห์ทดสอบ
          </h2>
          <p className="text-base font-medium md:text-lg">
            ศูนย์เครื่อมือวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยี
          </p>
        </div>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabIndex} isFitted variant="enclosed">
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
                aria-label="lab API tabs example"
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

            <div className="service-card-container">
              <TabPanel value="0">
                <div className="service-cards">
                  <div className=" flex">
                    <img className="h-80 w-80" src={"/images/2_6.png"} />
                    <div className=" mx-5 mt-3">
                      <h3 className=" text-3xl leading-relaxed">
                        มีบริการกล้องถ่ายภาพสมรรถภามพสูง เช่น
                        กล้องจุลทรรศน์อิเล็กตรอน กล้องจุลทรรศน์แสง
                      </h3>
                      <ul class="list-disc text-lg ml-10 leading-relaxed">
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
                      <div className=" pt-3">
                        <button className=" bg-[#4761AD] text-white px-2 py-2 rounded-xl">
                          แบบฟอร์มขอรับบริการ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="1">
                <div className="service-cards">
                  <div className=" flex">
                    <img className="h-80 w-80" src={"/images/2_6.png"} />
                    <div className=" mx-5 mt-3">
                      <h3 className=" text-3xl">
                        มีให้บริการวิเคราะห์ ทดสอบทางด้านเคมีและชีวเคมี
                        เครื่องมือวิเคราะห์ขั้นสูง
                        แบ่งประเภทการวิเคราะห์ทดสอบได้ดังนี้ เช่น
                      </h3>
                      <ul class="list-disc text-lg ml-10">
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
                          การวิเคราะห์ธาตุในรูปของประจุ เช่น ฟลูออไรด์ คลอไรด์
                          ไนเตรท ไนไตรท์ แคลเซียม แมกนีเซียม ในตัวอย่าง น้ำดื่ม
                          น้ำประปา เป็นต้น:เครื่องมือที่ให้บริการ Ion
                          Chromatograph
                        </li>
                        <li>
                          การวิเคราะห์องค์ประกอบในรูปของสารประกอบเช่น
                          วิเคราะห์กรดไขมัน กรดอินทรีย์ กรดอะมิโน สารกันบูด
                          สีสังเคราะห์ในตัวอย่างอาหารและเครื่องดื่ม เป็นต้น
                        </li>
                        <li>
                          การวิเคราะห์โครงสร้างของสาร เช่น ตรวจสอบความเป็นผลึก
                          ตรวจหาองค์ประกอบและโครงสร้างของผลึก ตรวจหาพันธะเคมี
                        </li>
                      </ul>
                      <div className="  pt-3">
                        <button className=" bg-[#4761AD] text-white px-2 py-2 rounded-xl">
                          แบบฟอร์มขอรับบริการ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="service-cards">
                  <div className=" flex">
                    <img className="h-80 w-80" src={"/images/2_6.png"} />
                    <div className=" mx-5 mt-3">
                      <h3 className=" text-3xl">บริการทดสอบตัวอย่างทางกายภาพ เช่น</h3>
                      <ul class="list-disc text-lg ml-10">
                        <li>ทดสอบความชื้น เถ้า พื้นที่ผิว ความพรุน</li>
                        <li>
                          วัดขนาดของอนุภาค วัดค่าพลังงานความร้อน
                          วัดการเปลี่ยนแปลงน้ำหนักของตัวอย่าง
                        </li>
                        <li>
                          วัดการเปลี่ยนแปลงพลังงาน
                          ด้วยการเพิ่มหรือลดอุณหภูมิแก่ตัวอย่าง
                        </li>
                      </ul>
                      <div className="  pt-3">
                        <button className=" bg-[#4761AD] text-white px-2 py-2 rounded-xl">
                          แบบฟอร์มขอรับบริการ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="service-cards">
                  <div className=" flex">
                    <img className="h-80 w-80" src={"/images/2_6.png"} />
                    <div className=" mx-5 mt-3">
                      <h3 className=" text-3xl">
                        มีบริการตรวจวิเคราะห์จุลินทรีย์ในตัวอย่างประเภทต่างๆในขอบข่าย
                        Aerobic Plate Count, Yeast and Molds Coliform, Fecal
                        coliform, Escherichia coli, Clostridium perfringens
                        Clostridium botulinum และแบคทีเรียที่ก่อให้เกิดโรคต่างๆ
                      </h3>
                      <ul class="list-disc text-lg ml-10">
                        <li>ชุดที่ 1: Aerobic Plate Count+Coliform+E.coli</li>
                        <li>ชุดที่ 2: Acid หรือ High acid canned food</li>
                        <li>ชุดที่ 3: Low acid canned food</li>
                      </ul>
                      <div className="  pt-3">
                        <button className=" bg-[#4761AD] text-white px-2 py-2 rounded-xl">
                          แบบฟอร์มขอรับบริการ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div className="service-cards">
                  <div className=" flex">
                    <img className="h-80 w-80" src={"/images/2_6.png"} />
                    <div className=" mx-5 mt-3">
                      <h3 className=" text-3xl">
                        ให้บริการตรวจวิเคราะห์คุณภาพน้ำประเภทต่างๆตามประกาศที่เกี่ยวข้อง
                        เช่น ประกาศกระทรวงสาธารณสุข ประกาศกรมโรงงานอุตสาหกรรม
                        ด้วยวิธีมาตรฐานสากลในขอบข่ายดังต่อไปนี้ เช่น
                      </h3>
                      <ul class="list-disc text-3xl ml-10">
                        <li>Total Hardness, Chloride, Nitrate</li>
                        <li>
                          Total Solids, Suspended Solids, Total Dissolved Solids
                        </li>
                        <li>
                          pH, COD, BOD, Total Kjeldahl Nitrogen, Grease&Oil
                        </li>
                      </ul>
                      <div className="  pt-3">
                        <button className=" bg-[#4761AD] text-white px-2 py-2 rounded-xl">
                          แบบฟอร์มขอรับบริการ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </div>
          </TabContext>
        </Box>
      </div>
    </ThemeProvider>
  );
}
export default Services;
