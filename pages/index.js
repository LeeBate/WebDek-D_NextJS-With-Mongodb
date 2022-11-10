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
import Footer from "../components/footer";
import Services from "../components/Services";



const Index = (props) => {
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
        <title>CALLLAB</title>
      </Head>
      <VideoPlayer />
      <div ><Services /></div>
        
  
      
      <div className="w-[84%] sm:w-[75%] lg:max-w-[50%] mx-auto" data-aos="fade-right" >
          <div className="iframe-container" >
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
      <div id="services" className="services-container" >
        <div className="service-header" >
          <h2 className="text-xl font-bold md:text-3xl lg:text-4xl text-[#1a237e]" >
            ข่าวประชาสัมพันธ์
          </h2>
          <p className="text-lg font-medium md:text-lg" >
          ฝ่ายวิเคราะห์ด้วยเครื่องมือ ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี.
          </p>
        </div>
        
          {Informs.slice(0, 3).map((product) => (
          <div key={product._id} data-aos="fade-up">
            <InformItemIndex  product={product} />
            </div>
          ))}

      </div>
      <Footer />
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

export default Index;