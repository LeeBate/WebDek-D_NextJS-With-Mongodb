import React from "react";

import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { IoTimeSharp } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { Box, Typography } from "@mui/material";
import { BsYoutube } from "react-icons/bs";

import Link from "next/link";

export default function Newslatter() {
  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    fetch("api/mail", {
      method: "post",
      body: JSON.stringify(formData),
    });
    console.log(formData);
  }

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8qhwn8r",
        "template_a0nrq3h",
        e.target,
        "urzLahGarV18K7U0b"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div className="w-full h-full ">
      <div>
        <div id="main" className="xl:grid lg:grid grid-cols-2 justify-evenly ">
          <div className="bg-white col-span-2 w-full xl:h-58 h-58 p-2  border-xl ">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe rounded-xl"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.1010724383973!2d102.01368731476255!3d14.875625689627789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311eada2dc228d57%3A0xfdb33a3a1db3b61!2zRjExIOC4reC4suC4hOC4suC4o-C4quC4tOC4o-C4tOC4meC4mOC4o-C4p-C4tOC4qOC4p-C4nuC4seC4kuC4meC5jCBTSVJJTkRIT1JOIFdJVFNBV0FQSEFUIEJVSUxESU5H!5e0!3m2!1sth!2sth!4v1675849829011!5m2!1sth!2sth"
                  
                ></iframe>
              </div>
              <style>{`.mapouter{position:relative;text-align:right;width:100%;height:210px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:210px;}.gmap_iframe
                {height:210px!important;}`}</style>
            </div>
          </div>
          <div className="bg-white w-26 h-48  md:w-26 md:h-44 lg:w-26 lg:h-auto ">
            <h1 className="text-lg font-bold ml-7 lg:ml-12 md:text-lg  lg:mt-2 xl:text-lg  ">
              ตำแหน่งที่ตั้งสำนักงาน
            </h1>
            <div className="text-base ml-7 lg:ml-12 xl:text-base">
              <p>
                {" "}
                อาคารสิรินธรวิศวพัฒน์ (F11) ชั้น 2 มหาวิทยาลัยเทคโนโลยีสุรนารี
              </p>

              <p> 111 ถ.มหาวิทยาลัย ต.สุรนารี อ.เมือง จ.นครราชสีมา, 30000</p>
              <div className="flex gap-2">
                <BsFillTelephoneFill />
                <p>04422-3280</p>
              </div>
              <div className="flex gap-2">
                <GrMail />
                <p>analytical@sut.ac.th</p>
              </div>
              <div className="flex gap-2">
                <IoTimeSharp />
                <h1>เวลาทำการ จันทร์-ศุกร์ : 08:30 - 16:30 น.</h1>
              </div>
              <div className="flex ml-4">
                <p></p>
              </div>
            </div>
          </div>

          {/* <div className="bg-gray-100 w-26 h-52 xl:h-60 xl:p-7 p-5 pr-8  dark:text-gray-900"></div> */}
          <div className="bg-white p-2 w-26 h-40 md:w-26 md:h-48 lg:w-26 lg:h-auto ">
            <div className="w-full h-full">
              <div className="bg-white  w-full h-full rounded-lg cursor-pointer lg:w-26 lg:h-auto ">
                <div className="text-wight  flex flex-col-2 ">
                  <img
                    className="rounded-full object-cover w-16 h-16 ml-2 mt-4  md:ml-4 md:mt-4 md:w-28 md:h-28 lg:w-36 lg:h-36 lg:mb-2"
                    src={"/images/ffotterr2.jpg"}
                  />
                  <div className="text-gray-900 mt-3 ml-4 md:ml-8 md:mt-6 lg:ml-10 xl:ml-16 ">
                    <div className="text-sm xl:text-lg md:text-lg  font-bold ">
                      ฝ่ายวิเคราะห์ด้วยเครื่องมือ
                    </div>
                    <div className="text-sm xl:text-lg md:text-lg  font-bold ">
                      ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
                      มหาวิทยาลัยเทคโนโลยีสุรนารี
                    </div>
                    {/* <div className="text-sm xl:text-lg md:text-lg  font-bold ">
                        มหาวิทยาลัยเทคโนโลยีสุรนารี
                      </div> */}
                    {/* <p className="text-sm">
                        ชุมชน · 14.3 km · จะปิดเร็วๆ นี้
                      </p>
                      <p className="text-sm">ผู้ติดตาม 2.6 พัน คน</p> */}
                    <div className="flex">
                      <a href={"https://www.facebook.com/cstesut"}>
                        <div>
                          <FaFacebookSquare size={40} color={"#1a4789"} />
                        </div>
                      </a>
                      {/* <a href={"https://www.youtube.com/watch?v=Ww1UCfx2JjE"}>
                  <div className="ml-2">
                      <BsYoutube  size={40} color={"#ff0000"} />
                  </div>
                  </a> */}
                    </div>
                  </div>
                </div>
                {/* <Link href={"https://www.facebook.com/cstesut"}>
                  <div className="absolute bottom-14 right-4 md:left-32 ">
                    <FaFacebookSquare size={40} color={"#1a4789"} />
                  </div>
                  </Link>
                  <Link href={"https://www.youtube.com/watch?v=Ww1UCfx2JjE"}>
                  <div className="absolute bottom-14 right-16 md:left-8 ">
                      <BsYoutube size={40} color={"#ff0000"} />
                  </div>
                  </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
