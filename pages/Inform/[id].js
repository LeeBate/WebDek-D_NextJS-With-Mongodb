import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect } from "react";

import React, { Component } from "react";
import FsLightbox from "fslightbox-react";

const DetailInform = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const [photoIndex, setphotoIndex] = useState();
  const [img, setimg] = useState();

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const router = useRouter();

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  const [toggler, setToggler] = useState(false);
  useEffect(() => {
    console.log(product.images);
  }, [product]);

  const zoomInProperties = {
    indicators: true,
    prevArrow: (
      <div style={{ cursor: "pointer" }} className="    ml-2 ">
        <div className=" bg-slate-50/90 shadow-md rounded-full">
          <MdNavigateBefore className="" size={35} />
        </div>
      </div>
    ),
    nextArrow: (
      <div style={{ cursor: "pointer" }} className="  mr-2">
        <div className=" bg-slate-50/90 shadow-md rounded-full">
          <MdNavigateNext size={35} />
        </div>
      </div>
    ),
  };

  return (
    <div className="my-5">

      <Head>
        <title>{product.title}</title>
      </Head>

      <div class="grid bg-[#e0e7ff] rounded-md grid-cols-1 gap-4 mx-8 md:mx-16  p-1  lg:p-3 xl:p-5 ">
        <div className=' p-8 lg:p-8  xl:p-20 xl:px-36 mt-2 lg:mt-8 xl:mt-10 text-black'>
          {product.images.length > 1 ? (
            <Zoom {...zoomInProperties}>
              {product.images.map((each, index) => (

                <div key={index} className="flex justify-center w-full h-full ">


                  <Image
                    className="rounded-lg shadow-md object-fill"
                    src={each.url}
                    width={1400}
                    height={700}
                  />
                </div>
              ))}
            </Zoom>) : (
            <div >
              {product.images.map((each, index) => (

                <div key={index} className="flex justify-center w-full h-full ">


                  <Image
                    className="rounded-lg shadow-md m-64 object-fill"
                    src={each.url}
                    width={1400}
                    height={700}
                  />
                </div>
              ))}
            </div>)

          }
        </div>

        <div className=' text-black  px-4 lg:px-8  xl:px-14'>
          <div className="text-capitalize font-bold text-4xl ">
            <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
              {product.title}
            </h1>
          </div>
        </div>
        <div className=' text-black  px-4 lg:px-8  xl:px-14 pb-4 lg:pb-8  xl:pb-14'>
          <p className="text-sm indent-8 whitespace-pre-line md:text-lg">{product.description}</p>
        </div>
      </div>

    </div>
  )
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`productNews/${id}`);
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailInform;
