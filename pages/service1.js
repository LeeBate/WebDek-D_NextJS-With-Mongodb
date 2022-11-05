import React from "react";
import Head from "next/head";


export default function Service1() {
  return (
    <div >
      <Head>
        <title>CALLLAB</title>
      </Head>
      
      <div></div>
      <div className="parallax-1">
        <h1
          className="text-2xl md:text-3xl lg:text:3xl xl:text-4xl text-center text-white"
          id="header"
        >
          เครื่องมือวิทยศาสตร์
        </h1>
      </div>
      <div className="p-7 h-[50vh]">
        <div className="w-2/3">
          <p className="text-2xl font-normal">
              ให้บริการตรวจวิเคราะห์คุณภาพน้ำประเภทต่างๆตามประกาศที่เกี่ยวข้อง
              เช่น ประกาศกระทรวงสาธารณสุข ประกาศกรมโรงงานอุตสาหกรรม
              ด้วยวิธีมาตรฐานสากลในขอบข่ายดังต่อไปนี้ เช่น
            </p>
          <ul class="list-disc text-xl ml-10">
            <li>Total Hardness, Chloride, Nitrate</li>
            <li>Total Solids, Suspended Solids, Total Dissolved Solids</li>
            <li>pH, COD, BOD, Total Kjeldahl Nitrogen, Grease&Oil</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
