import React from "react";

import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { IoTimeSharp } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { Box, Typography } from "@mui/material";

import Link from "next/link";

export default function newslatter() {
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
        <div id="main" className="xl:grid grid-cols-2 justify-evenly ">
          <div className="bg-gray-100 col-span-2 w-full xl:h-72 h-64 p-9 border-sm ">
            <h1 className="pb-1 xl:text-xl font-bold md:text-base dark:text-gray-900">ติดต่อสอบถาม</h1>

            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe rounded-xl"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=786&amp;height=210&amp;hl=en&amp;q=ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีสุรนารี&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
              <style>{`.mapouter{position:relative;text-align:right;width:100%;height:210px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:210px;}.gmap_iframe
                {height:210px!important;}`}</style>
            </div>
          </div>

          <div className="bg-gray-100 w-26 h-52 xl:h-60 xl:p-7 p-5 pr-8  dark:text-gray-900">
            <h1 className="xl:text-xl md:text-lg sm:text-base font-bold ">ตำแหน่งที่ตั้ง</h1>
            <div className="text-sm xl:text-base ">
            <p>111 ถ.มหาวิทยาลัย ต.สุรนารี อ.เมือง จ.นครราชสีมา, 30000</p>
            <div className="flex gap-2">
              <BsFillTelephoneFill />
              <p>01-2345-6789</p>
            </div>
            <div className="flex gap-2">
              <GrMail />
              <p>sakawpan@sut.ac.th</p>
            </div>
            <div className="flex gap-2">
              <IoTimeSharp />
              <h1>เวลาทำการ</h1>
            </div>
            <div className="flex ml-4">
              <p>จันทร์-ศุกร์ : 08:30 - 16:30 น.</p>
            </div>
            <div className="flex ml-4">
              <p>เสาร์-อาทิตย์ : ปิดทำการ</p>
            </div>
          </div>
          </div>

        {/* <div className="bg-gray-100 w-26 h-52 xl:h-60 xl:p-7 p-5 pr-8  dark:text-gray-900"></div> */}
          <div className="bg-gray-100 w-26 h-60 xl:mb-5 mb-1 ">
            <div className="w-full h-full p-4">
              <Link href={"https://www.facebook.com/cstesut"}>
                <div className="bg-blue-100 w-full h-full rounded-lg cursor-pointer relative">
                  <div className="text-wight p-6 flex flex-col-2">
                    <img
                      className="rounded-full mt-2 ml-3 xl:w-36 xl:h-36 md:w-26 md:h-28 w-24 h-18"
                      src={"/images/ffotterr2.jpg"}
                      
                    />
                    <div className="xl:ml-16 md:ml-12 ml-8 text-gray-600 ">
                      <div className="xl:text-xl md:text-lg sm:text-xs font-bold sm:whitespace-pre ">
                        ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
                        มหาวิทยาลัยเทคโนโลยีสุรนารี
                      </div>
                      <p className="text-sm">
                        ชุมชน · 14.3 km · จะปิดเร็วๆ นี้
                      </p>
                      <p className="text-sm">ผู้ติดตาม 2.6 พัน คน</p>
                      <div className="absolute bottom-2 right-2 ">
                        <FaFacebookSquare size={40} color={"#1a4789"} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
      </div><Box sx={{ p: 1, textAlign: "center" }}>
          <Typography>
            © 2022 All rights reserved by {""}
            <Link href="/Admin">
              <a>CALLLAB</a>
            </Link>
          </Typography>
        </Box>
    </div>
  );
}