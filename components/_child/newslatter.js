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
        <div id="main" className="xl:grid lg:grid grid-cols-2 justify-evenly ">
          <div className="bg-gray-100 col-span-2 w-full xl:h-62 h-64 p-2  border-xl ">
            <h1 className="pb-1 xl:text-lg font-bold md:text-lg dark:text-gray-900">ติดต่อสอบถาม</h1>

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
          <div className="bg-gray-100 w-26 h-48  md:w-26 md:h-44 lg:w-26 lg:h-auto ">
            <h1 className="text-base font-bold p-2 md:text-lg  lg:mt-2 xl:text-lg  ">ตำแหน่งที่ตั้ง</h1>
            <div className="text-sm ml-9 lg:ml-12 xl:text-base">
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
          <div className="bg-gray-100 p-2 w-26 h-32 md:w-26 md:h-40 lg:w-26 lg:h-auto ">
            <div className="w-full h-full">
              <Link href={"https://www.facebook.com/cstesut"}>
                <div className="bg-blue-100  w-full h-full rounded-lg cursor-pointer lg:w-26 lg:h-auto ">
                  <div className="text-wight  flex flex-col-2 ">
                    <img
                      className="rounded-full object-cover w-16 h-16 ml-2 mt-4  md:ml-4 md:mt-4 md:w-28 md:h-28 lg:w-36 lg:h-36 lg:mb-2"
                      src={"/images/ffotterr2.jpg"}
                      
                    />
                    <div className="text-gray-900 mt-3 ml-4 md:ml-8 md:mt-6 lg:ml-10 xl:ml-16 ">
                      <div className="text-sm xl:text-lg md:text-lg  font-bold ">
                        ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
                       
                      </div>
                      <div className="text-sm xl:text-lg md:text-lg  font-bold ">
                        มหาวิทยาลัยเทคโนโลยีสุรนารี
                      </div>
                      <p className="text-sm">
                        ชุมชน · 14.3 km · จะปิดเร็วๆ นี้
                      </p>
                      <p className="text-sm">ผู้ติดตาม 2.6 พัน คน</p>
                      
                    </div>
                  </div>
                  <div className="absolute bottom-20 right-4 ">
                        <FaFacebookSquare size={40} color={"#1a4789"} />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}