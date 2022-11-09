import React from "react";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Head from "next/head";
import { Staff } from "./api/data/staff";

export default function About() {
  return (
    <>
      <section className="py-16">
        <Head>
          <title>CALLLAB</title>
        </Head>
        
      </section>
      <section >
        <div className=" font-bold text-center text-md md:text-xl xl:text-3xl lg:text-2xl my-3  w-5/6 mx-auto  md:w-11/12 xl:w-10/12 rounded-md">
          <p className="  pt-2  mx-3">บุคลากรฝ่ายวิเคราะห์ด้วยเครื่องมือ</p>
          <p className=" pb-2   mx-3">ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี</p>
        </div>

        <div className="grid gap-3  grid-cols-1 md:grid-cols-2   w-4/6  md:w-11/12 xl:w-10/12 mx-auto" >
          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3" >
            <div className="md:flex lg:flex flex-row sm:flex mx-auto" >
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/236121.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้าฝ่ายวิเคราะห์ด้วยเครื่องมือ
                </p>
                <p className="text-md md:text-xl">
                  นางสกาวพรรณ อภิสราพงศ์สกาว
                </p>
                <p>อีเมล sakawpan@sut.ac.th</p>
                <p>โทร. 3259</p>
                <p>แฟกซ์.3260</p>
              </div>
            </div>
          </div>
          {Staff.map((staff) => (
            <div
              key={staff.id}
              className="bg-[#E8EDFA] rounded-md  px-3 sm:px-auto py-3"
            >
              <div className="md:flex flex-row sm:flex">
                <img
                  className="mr-3 self-center max-w-[100px] rounded-md "
                  src={staff.img}
                />
                <div className="flex-col">
                  <p className="pt-2 text-md md:text-xl">{staff.name}</p>
                  <p>อีเมล {staff.email}</p>
                  <p>โทร. {staff.phone}</p>
                  <p>แฟกซ์. {staff.fax}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
