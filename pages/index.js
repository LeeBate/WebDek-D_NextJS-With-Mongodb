import Head from "next/head";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import Footer from "../components/footer";
import InformItemIndex from '../components/product/InformItemIndex'
import VideoPlayer from "../components/VideoPlayer";
import { Navigation } from "swiper";
SwiperCore.use([ Navigation]);

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

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "Delete all selected products?",
          type: "DELETE_PRODUCT",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };
  SwiperCore.use([Autoplay]);

  return (
    <div>
      <Head>
        <title>Index</title>
      </Head>
      
      <section>
        <div>
          <VideoPlayer/>
        </div>
      </section>

      <section className="  p-20">
        <center>
          <Swiper
            spaceBetween={20}
            navigation={true}
            speed={700}
            pagination={{ clickable: true }}
            loop={true}
            effect={"fade"}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            autoplay={{
              delay: 2000,
            }}
            
          >
            {products.map((product, index) => (
                  <SwiperSlide key={index}>                
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].url}
                          width={800}
                          height={400}
                          className="mt-80"
                        />
                      
                  </SwiperSlide>
            ))}
          </Swiper>
        </center>
      </section>

      {/* Slide */}
      {/* <div className="mt-32 relative">
        <h1 className="text-5xl font-extrabold tracking-tight text-center"> Slide
        </h1>
        <ul className="mt-10 pb-8 px-[50vw] w-full flex overflow-x-auto gap-8 snap-x">
          {products.map((product) => (
            <li className="snap-center">
              <div className="relative flex-shrink-0 max-w-[95vw] overflow-hidden rounded-3xl">
                <img src={product.images[0].url} alt={product.images[0].url} 
                className="absolute inset-0 w-full h-full object-cover object-bottom"/>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black/75"></div>
              <div className="relative h-96 w-[768px] p-12 flex flex-col justify-between items-start">
                <div>
                  <p className="font-medium text-white"> product</p>
                  <h2 className="mt-3 w-2/3 text-3xl font-semibold tracking-tight text-white">
                    {products.title}
                  </h2>
                </div>
                <a href="#" className="px-4 py-3 rounded-lg bg-white text-slate-900 text-sm font-semibold">55555555555555</a>
              </div>
              </div>
            </li>
          ))}
          

        </ul>
        

      </div> */}



      <section>
      <div className="InformIndex">
        {
          Informs.length === 0 
          ? <h2>ไม่มีข้อมูลข่าวประชาสัมพันธ์</h2>

          : Informs.slice(0,4).map(product => (
            <InformItemIndex key={product._id} product={product} handleCheck={handleCheck} />
          ))
        }
      </div>
      </section>
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
  const res1 = await getData(
    `productNews?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
  );
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
