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
  function sendEmail2(e) {
    e.preventDefault();
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การกระทำนี้ คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ส่ง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire("ส่งสำเร็จ!", "คำขอถูกดำเนินการแล้ว.", "success");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
    });
  }
  return (
    <div className="w-full h-full">
      <div>
        <div id="main" className="grid grid-cols-2 gap-1 justify-evenly">
          <div className="bg-gray-100 col-span-2 w-full h-84 p-9 border-sm rounded">
            <h1 className="pb-1 text-xl font-bold">ติดต่อสอบถาม</h1>

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
                <a href="https://mcpenation.com/">Minecraft Website</a>
              </div>
              <style>{`.mapouter{position:relative;text-align:right;width:100%;height:210px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:210px;}.gmap_iframe
                {height:210px!important;}`}</style>
            </div>
          </div>

          <div className="bg-gray-100 w-26 h-60 p-7 pr-8 rounded">
            <h1 className="text-xl font-bold">ตำแหน่งที่ตั้ง</h1>
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

          <div className="bg-gray-100 w-26 h-60 mb-5 rounded">
            <div className="w-full h-full p-4">
              <Link href={"https://www.facebook.com/cstesut"}>
                <div className="bg-blue-100 w-full h-full rounded-lg cursor-pointer relative">
                  <div className="text-wight p-7 flex flex-col-2">
                    <img
                      className="rounded-full"
                      src={"/images/ffotterr2.jpg"}
                      width={150}
                      height={150}
                    />
                    <div className="ml-16 text-gray-600 ">
                      <h3 className="text-xl font-bold">
                        ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
                        มหาวิทยาลัยเทคโนโลยีสุรนารี
                      </h3>
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
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography>
            © 2022 All rights reserved by{" "}
            <Link href="/Admin">
              <a>CALLLAB</a>
            </Link>{" "}
          </Typography>
        </Box>
      </div>
    </div>
  );
}
