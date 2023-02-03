import React from "react";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Head from "next/head";
import { Staff } from "./api/data/staff";
import { p } from "./api/data/staff_p";
import { w } from "./api/data/staff_w";
import { c } from "./api/data/staff_c";
import { j } from "./api/data/staff_j";
import { k } from "./api/data/staff_k";

export default function About() {
  return (
    <>
      <Head>
        <title>CALLLAB</title>
      </Head>

      <section className="mb-5">
        <div className=" font-bold text-center text-md md:text-xl xl:text-3xl lg:text-2xl my-3  w-5/6 mx-auto  md:w-11/12 xl:w-10/12 rounded-md text-[#1a237e]">
          <p className="  pt-2  mx-3 ">บุคลากรฝ่ายวิเคราะห์ด้วยเครื่องมือ</p>
          <p className=" pb-2   mx-3 ">
            ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
          </p>
        </div>

        <div className="grid gap-3  grid-cols-1 md:grid-cols-2   w-11/12  md:w-11/12 xl:w-11/12 mx-auto">
          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/236121.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้าฝ่ายวิเคราะห์ด้วยเครื่องมือ
                </p>
                <p className="text-md md:text-xl">นางสกาวพรรณ อภิสราพงศ์สกาว</p>
                <p>อีเมล sakawpan@sut.ac.th</p>
                <p>โทร. 3259</p>
                <p>แฟกซ์.3260</p>
              </div>
            </div>
          </div>
          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/260021.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้างานวิเคราะห์ด้วยกล้องจุลทรรศน์
                </p>
                <p className="text-md md:text-xl">น.ส.เกวลี พร้อมพิพัฒนพร</p>
                <p>ตำแหน่ง: นักวิทยาศาสตร์</p>
                <p>อีเมล: kewalee@sut.ac.th</p>
                <p>โทร: 3193</p>
              </div>
            </div>
          </div>
          {c.map((staff) => (
            <div
              key={Staff.id}
              className="bg-[#E8EDFA] rounded-md  px-3 sm:px-auto py-3"
            >
              <div className="md:flex flex-row sm:flex">
                <img
                  className="mr-3 self-center max-w-[100px] rounded-md "
                  src={staff.img}
                />
                <div className="flex-col">
                  <p className="pt-2 text-md md:text-xl">{staff.name}</p>
                  <p>ตำแหน่ง: {staff.role}</p>
                  <p>อีเมล {staff.email}</p>
                  <p>โทร. {staff.phone}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/239056.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้างานวิเคราะห์ทางเคมีและชีวเคมี
                </p>
                <p className="text-md md:text-xl">น.ส.จรรจิรา วงศ์วิวัฒนา</p>
                <p>ตำแหน่ง: นักวิทยาศาสตร์</p>
                <p>อีเมล: jan@sut.ac.th</p>
                <p>โทร: 3273</p>
              </div>
            </div>
          </div>
          {k.map((staff) => (
            <div
              key={Staff.id}
              className="bg-[#E8EDFA] rounded-md  px-3 sm:px-auto py-3"
            >
              <div className="md:flex flex-row sm:flex">
                <img
                  className="mr-3 self-center max-w-[100px] rounded-md "
                  src={staff.img}
                />
                <div className="flex-col">
                  <p className="pt-2 text-md md:text-xl">{staff.name}</p>
                  <p>ตำแหน่ง: {staff.role}</p>
                  <p>อีเมล {staff.email}</p>
                  <p>โทร. {staff.phone}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/237049.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้างานทดสอบทางกายภาพ
                </p>
                <p className="text-md md:text-xl">น.ส.วิมลพร โสภณ</p>
                <p>ตำแหน่ง: พนักงานห้องทดลอง</p>
                <p>อีเมล: vim@sut.ac.th</p>
                <p>โทร: 3293</p>
              </div>
            </div>
          </div>
          {p.map((staff) => (
            <div
              key={Staff.id}
              className="bg-[#E8EDFA] rounded-md  px-3 sm:px-auto py-3"
            >
              <div className="md:flex flex-row sm:flex">
                <img
                  className="mr-3 self-center max-w-[100px] rounded-md "
                  src={staff.img}
                />
                <div className="flex-col">
                  <p className="pt-2 text-md md:text-xl">{staff.name}</p>
                  <p>ตำแหน่ง: {staff.role}</p>
                  <p>อีเมล {staff.email}</p>
                  <p>โทร. {staff.phone}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/253002.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้างานวิเคราะห์ทางจุลชีววิทยา
                </p>
                <p className="text-md md:text-xl">น.ส.นิตยา สมพงษ์</p>
                <p>ตำแหน่ง: นักวิทยาศาสตร์</p>
                <p>อีเมล: nittaya_s@sut.ac.th</p>
                <p>โทร: 3260</p>
              </div>
            </div>
          </div>
          {j.map((staff) => (
            <div
              key={Staff.id}
              className="bg-[#E8EDFA] rounded-md  px-3 sm:px-auto py-3"
            >
              <div className="md:flex flex-row sm:flex">
                <img
                  className="mr-3 self-center max-w-[100px] rounded-md "
                  src={staff.img}
                />
                <div className="flex-col">
                  <p className="pt-2 text-md md:text-xl">{staff.name}</p>
                  <p>ตำแหน่ง: {staff.role}</p>
                  <p>อีเมล {staff.email}</p>
                  <p>โทร. {staff.phone}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/260025.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้างานวิเคราะห์น้ำ
                </p>
                <p className="text-md md:text-xl">น.ส.ชุติมณฑน์ ชูพุดซา</p>
                <p>ตำแหน่ง: นักวิทยาศาสตร์</p>
                <p>อีเมล: chutimon@sut.ac.th</p>
                <p>โทร: 3273</p>
              </div>
            </div>
          </div>

          <div className="bg-[#E8EDFA] rounded-md md:col-span-2 px-3 sm:px-auto py-3">
            <div className="md:flex lg:flex flex-row sm:flex mx-auto">
              <img
                className="mr-3 max-w-[100px] self-center  rounded-md"
                src={"http://203.158.7.33/profiles/photo/260031.jpg"}
              />
              <div className="flex-col">
                <p className="text-md md:text-xl font-semibold mt-2 md:mt-0">
                  หัวหน้างานระบบคุณภาพห้องปฏิบัติการ
                </p>
                <p className="text-md md:text-xl">น.ส.กรรณิการ์ กันทะวงศ์</p>
                <p>ตำแหน่ง: นักวิทยาศาสตร์</p>
                <p>อีเมล: kunnikar@sut.ac.th</p>
                <p>โทร: 3280</p>
              </div>
            </div>
          </div>
          {Staff.map((staff) => (
            <div
              key={Staff.id}
              className="bg-[#E8EDFA] rounded-md  px-3 sm:px-auto py-3"
            >
              <div className="md:flex flex-row sm:flex">
                <img
                  className="mr-3 self-center max-w-[100px] rounded-md "
                  src={staff.img}
                />
                <div className="flex-col">
                  <p className="pt-2 text-md md:text-xl">{staff.name}</p>
                  <p>ตำแหน่ง: {staff.role}</p>
                  <p>อีเมล {staff.email}</p>
                  <p>โทร. {staff.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
