import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";
import { Center } from "@chakra-ui/react";

const Machinery = (props) => {
  const [products, setProducts] = useState(props.products);

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

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
          title: "ลบทั้งหมด",
          type: "DELETE_PRODUCTS",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <div className="lg:pt-24  pt-14 lg:mb-80">
      <Head>
        <title>CALLLAB</title>
      </Head>
      
      {/* <div className="parallax ">
        <h1
          className="text-2xl md:text-3xl lg:text:3xl xl:text-4xl text-center text-white"
          id="header"
        >
          เครื่องมือวิเคราะห์
        </h1>
      </div> */}
      {/* <style jsx global>{`
        footer {
          display: none;
        }
      `}</style> */}

      
        <Filter state={state} />
<div className="px-4">
  
        {auth.user && auth.user.role === "admin" && (
          <div
            className="delete_all btn btn-danger mt-2"
            style={{ marginBottom: "-10px" }}
          >
            <input
              type="checkbox"
              checked={isCheck}
              onChange={handleCheckALL}
              style={{
                width: "25px",
                height: "25px",
                transform: "translateY(8px)",
              }}
            />

            <button
              className="btn btn-danger ml-2"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={handleDeleteAll}
            >
              ลบข้อมูลทั้งหมด
            </button>
          </div>
        )}

<div className=" grid-flow-row xl:px-50 mx-auto products lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.length === 0 ? (
            <h2>ไม่มีข้อมูลเครื่องมือวิทยาศาสตร์</h2>
          ) : (
            products.map((product) => (
              <div key={product._id} data-aos="fade-up" >
              <ProductItem
                product={product}
                handleCheck={handleCheck}
              />
              </div>
            ))
          )}
        </div>

        {/* {props.result < page * 6 ? (
          ""
        ) : (
          <button
            className="btn btn-outline-info d-block mx-auto mb-4"
            onClick={handleLoadmore}
          >
            เพิ่มเติม
          </button>
        )} */}
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
    `product?limit=${
      page * 100
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Machinery;