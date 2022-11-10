import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import "intl-tel-input/build/css/intlTelInput.css";
import "react-phone-number-input/style.css";

const Serviceform: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(ConvertDate(Date.now()) + " น.");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let form = {
      title,
      email,
      name,
      phone,
      detail,
      date,
    };

    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การกระทำนี้ คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ส่ง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(JSON.stringify(form));

        const rawResponse = await fetch("/api/submit", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        console.log(form);
        const content = await rawResponse.json();

        Swal.fire("ส่งสำเร็จ!", "คำขอถูกดำเนินการแล้ว.", "success");
      }
    });

    // print to screen
    // alert(content.data.tableRange)

    // Reset the form fields
    
  };

  function handleChange(event) {
    setPhone(event.target.value);
  }

  function ConvertDate(date) {
    const data = new Date(date).toLocaleString("th-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return data;
  }

  return (
    <div>

      <Head>
        <title>CALLLAB</title>
      </Head>
      <section className="bg-white">
        <p className="pt-16"></p>

        <div className="grid grid-cols-1 xl:grid-cols-4 grid-rows-2 gap-3 h-full w-full pb-5">
          <div className="hidden xl:block "></div>
          <div className=" h-full w-full row-span-2 col-span-2">
            <div className="py-8 sm:pt-16 md:pt-20 lg:pt-28 px-4 mx-auto max-w-screen-md mt-0">
              <h2 className="mb-4 text-2xl md:text-3xl lg:text:3xl xl:text-4xl tracking-tight font-extrabold text-center text-gray-900">
                แบบฟอร์มขอรับบริการ
              </h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-md">ฝ่ายวิเคราะห์ด้วยเครื่องมือ ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี</p>
              <form method="post" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                    เรื่องติดต่อ
                  </label>
                  <input
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-900 
          text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 "
                    placeholder="เรื่อง..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    อีเมล์
                  </label>
                  <input
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 
          text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 "
                    placeholder="Suranaree@g.sut.ac.th"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm bg-gray-50 border focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 text-gray-900 
          text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 "
                    placeholder="นายเทคโน สุรนารี"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    เบอร์โทรติดต่อ
                  </label>
                  <PhoneInput
                  
            placeholder="หมายเลขโทรศัพท์"
            

            country={'th'}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    รายละเอียดที่ต้องการ
                  </label>
                  <textarea
                    rows={6}
                    value={detail}
                    required
                    onChange={(e) => setDetail(e.target.value)}
                    id="detail"
                    name="detail"
                    className="block p-2.5 w-full focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900 bg-gray-50 rounded-xl shadow-sm border border-gray-300  "
                    placeholder="เขียนรายละเอียด..."
                  ></textarea>
                </div>
                <div hidden>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    เบอร์โทรติดต่อ
                  </label>
                  <input
                    value={ConvertDate(Date.now()) + " น."}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    id="date"
                    type="text"
                    name="date"
                    className="shadow-sm bg-gray-50 border focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 text-gray-900 
          text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 "
                    placeholder="นายเทคโน สุรนารี"
                  />
                </div>

                <button
                  type="submit"
                  className=" bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg  rounded-full text-white w-full py-2 "
                >
                  ส่งแบบฟอร์ม
                </button>
               
              </form>
            </div>
          </div>
          <div className="hidden xl:block "></div>
          <div className="hidden xl:block  mt-4">
            <img className="" alt="" src={"/images/1_2.1.png"} />
          </div>
          <div className="hidden xl:block    mt-1 ">
            <img className="" alt="" src={"/images/2_3.png"} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Serviceform;
