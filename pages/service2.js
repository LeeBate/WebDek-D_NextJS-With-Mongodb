import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
export default function Service2() {
    return (
        <div className="container ">
            <Head>
                <title> Create Next App </title>
            </Head>

            <div className="main mt-96">
      <div></div>
      <div className="parallax-1">
        <h1
          className="text-2xl md:text-3xl lg:text:3xl xl:text-4xl text-center text-white"
          id="header"
        >
          เครื่องมือวิทยศาสตร์ddfffff
        </h1>
      </div>
      <div className="p-7 h-full">
        <div className="w-2/3">
          <p className="text-xl font-normal">
              ให้บริการตรวจวิเคราะห์คุณภาพน้ำประเภทต่างๆตามประกาศที่เกี่ยวข้อง
              เช่น ประกาศกระทรวงสาธารณสุข ประกาศกรมโรงงานอุตสาหกรรม
              ด้วยวิธีมาตรฐานสากลในขอบข่ายดังต่อไปนี้ เช่น
            </p>
          <ul class="list-disc ml-10">
            
            <li>Total Hardness, Chloride, Nitrate</li>
            <li>Total Solids, Suspended Solids, Total Dissolved Solids</li>
            <li>pH, COD, BOD, Total Kjeldahl Nitrogen, Grease&Oil</li>
          </ul>
        </div>
      </div>
      </div>
        </div>
    );
}