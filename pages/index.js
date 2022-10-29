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
    <div >
      <Head>
        <title>Home - CALLLAB</title>
      </Head>
      <VideoPlayer />
      <Slideshow product={products} />

      <div className="container ">
        
        <h1 className="text-2xl md:text-3xl lg:text:3xl xl:text-4xl font-extrabold text-center text-gray-900 pt-4">
          ข่าวประชาสัมพันธ์
        </h1>
        <center>
        
        <iframe className="w-[100%] h-[250px] lg:w-[48%] lg:h-[405px] aspect-video" src="https://www.youtube.com/embed/Ww1UCfx2JjE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center  ">
        {Informs.slice(0,3).map((product) => (
            <InformItemIndex key={product._id} product={product}/>
          ))}
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
  const res1 = await getData(
    `productNews?limit=${
      page * 6
    }&title=${search}`
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
