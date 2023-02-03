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
    <div>
      <Head>
        <title>{product.title}</title>
      </Head>

      <div class="grid bg-[#e0e7ff] pb-8 rounded-md  mx-auto w-[95%] content-center    grid-cols-1 lg:grid-cols-5 grid-rows-5  px-4 lg:px-8  my-5">
        <div class=" my-auto col-span-3  lg:col-span-5 ">
          <div className="text-capitalize font-bold text-4xl ">
            <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
              {product.title}
            </h1>
          </div>
        </div>

        <div class=" col-span-2 pb-0 xl:pb-3 max-h-[589px]  rounded-md row-span-4">
          <div className="object-fill py-3 rounded h-[80%] max-h-[589px] max-w-[1600px] w-auto mx-auto ">
            <div>
              <Zoom {...zoomInProperties}>
                {product.images.map((each, index) => (
                  <div
                    key={index}
                    className="flex justify-center w-full h-full "
                  >
                    <Image
                      className="rounded-lg shadow-md object-fill"
                      src={each.url}
                      width={1600}
                      height={800}
                    />
                  </div>
                ))}
              </Zoom>
            </div>
          </div>
          <div
            className="row mx-0 mt-3 mb-4"
            style={{ cursor: "pointer" }}
          ></div>
          {/* </div> */}
          {/* </div> */}
        </div>
        <div class="col-span-3 row-span-4 ml-3">
          <div>
            <p className="text-sm whitespace-pre-line md:text-lg">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <FsLightbox toggler={toggler} sources={[img]} />
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`productNews/${id}`);
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailInform;
