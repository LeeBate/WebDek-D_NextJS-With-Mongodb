import Head from "next/head";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Image from "next/image";
import InformItemIndex from "../components/product/InformItemIndex";
import VideoPlayer from "../components/VideoPlayer";
import Slideshow from "../components/Slideshow";
import Footer from "../components/footer"

const index = (props) => {
  const [products, setProducts] = useState(props.products);
  const [Informs, setInforms] = useState(props.Informs);

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);
  useEffect(() => {
    setInforms(props.Informs);
  }, [props.Informs]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  return (
    <div>
      <Head>
        <title>Home - CALLLAB</title>
      </Head>
      <VideoPlayer />

      <div id="services" class="services-container">
        <div class="service-header">
            <h2>บริการวิเคราะห์ทดสอบ</h2>
            <p>ศูนย์เครื่อมือวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยี</p>
        </div>
              
        <div class="service-card-container">
            <div class="service-cards">
              <i className="fas m1">
                <img className="fas  h-12 w-12" src={"/images/Artboard 5.png"}/>
              </i>
                <h3>บริการวิเคราะห์ด้วยกล้องจุลทรรศน์</h3>
                <p>วิเคราะห์ทดสอบโดยคล้องถ่ายภาพสมรรถนะสูง รวมถึงวิเคราะห์ธาตุต่าง ๆ ด้วยกล้องจุลทรรศน์อิเล็กตรอน และกล้องจุลทรรศน์แสง</p>
            </div>
            <div class="service-cards">
                <i class="fas m2">
                <img className="fas  h-12 w-12" src={"/images/Artboard 6.png"}/>
                </i>
                <h3>บริการวิเคราะห์ทางเคมีและชีวเคมี</h3>
                <p>วิเคราะห์ธาตุ สารประกอบ และโครงสร้าง ด้วยเทคนิคต่าง ๆ โดยใช้เครื่องมือวิเคราะห์ขั้นสูง</p>
            </div>
            <div class="service-cards">
            <i class="fas m3">
                <img className="fas  h-12 w-12" src={"/images/Artboard 7.png"}/>
                </i>
                <h3>บริการวิเคราะห์ทางจุลชีววิทยา</h3>
                <p>ตรวจวิเคราะห์หาจุลินทรีย์ในตัวอย่างน้ำ ตัวอย่างอาหาร และตัวอย่างอื่น ๆ อย่างมีมาตรฐาน</p>
            </div>
            <div class="service-cards">
            <i class="fas m4">
                <img className="fas  h-12 w-12" src={"/images/Artboard 8.png"}/>
                </i>
                <h3>บริการทดสอบทางกายภาพ</h3>
                <p>วิเคราะห์พื้นผิวและความพรุน ความชื้นและเถ้า วัดขนาดอนุภาค หาพลังงานของตัวอย่าง ด้วยเครื่องมือวิเคราะห์ทดสอบที่หลากหลาย</p>
            </div>
            <div class="service-cards">
            <i class="fas m5">
                <img className="fas  h-12 w-12" src={"/images/Artboard 9.png"}/>
                </i>
                <h3>บริการวิเคราะห์น้ำ</h3>
                <p>ตรวจวิเคราะห์น่าประเภทต่าง ๆ เช่น นํ้าดื่ม น้ำเสีย ด้วยวิธีตามมาตรฐานสากล</p>
            </div>
            {/* <div class="service-cards">
                <i class="fas fa-briefcase"></i>
                <h3>Digital Marketing</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae accusantium voluptates consectetur adipisci a obcaecati.</p>
            </div> */}
        </div>
    </div>
    {/* <section className="w-full h-auto">
        <Slideshow product={products} />
      </section> */}
      <div id="blog" class="blog-container">
        <div class="blog-header">
            <h2>ข่าวประชาสัมพันธ์</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa modi ab ut.</p>                
        </div>
    
        <div class="container">
        <div className=" lg:max-w-[50%] mx-auto">
        <div className="iframe-container">
          <iframe
            src="https://www.youtube.com/embed/Ww1UCfx2JjE"
            width="560"
            height="315"
            title="แนะนำฝ่ายวิเคราะห์ด้วยเครื่องมือ มทส."
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        </div>
        <div className="content-wrapper ">
          {Informs.slice(0, 4).map((product) => (
            <InformItemIndex key={product._id} product={product} />
          ))}
        </div>
        </div>
    </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `slideimage?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );
  const res1 = await getData(`productNews?limit=${page * 6}&title=${search}`);
  // server side rendering
  return {
    props: {
      products: res.products,
      Informs: res1.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default index;