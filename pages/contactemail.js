import React from "react";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Head from "next/head";

export default function Contactemail() {
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

        // Toast.fire({
        //   icon: 'error',
        //   title: 'Signed in successfully'
        // })
      }
    });
  }

  return (
    <section className="bg-white">
      <Head>
        <title>CALLLAB</title>
      </Head>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mt-20">
        <h2 className="mb-4 text-2xl md:text-3xl lg:text:3xl xl:text-4xl tracking-tight font-extrabold text-center text-[#1a237e]">
          ติดต่อเรา
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-md">
          ฝ่ายวิเคราะห์ด้วยเครื่องมือ ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
        </p>
        <form method="post" onSubmit={sendEmail2} className="space-y-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
              เรื่องติดต่อ
            </label>
            <input
              type="text"
              name="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
              placeholder="เรื่อง..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
            >
              อีเมล์ของคุณ
            </label>
            <input
              type="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
              placeholder="Suranaree@g.sut.ac.th"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
            >
              ชื่อ-นามสกุลของคุณ
            </label>
            <input
              type="text"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
              placeholder="นายเทคโน สุรนารี"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
            >
              รายละเอียดที่ต้องการติดต่อ
            </label>
            <textarea 
              rows="6"
              name="detail"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="เขียนรายละเอียด..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className=" bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white rounded-full block w-full p-2.5 "
          >
            ส่งข้อมูล
          </button>
        </form>
      </div>
    </section>
  );
}
