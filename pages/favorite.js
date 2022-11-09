import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

import { getData } from "../utils/fetchData";
import FavoriteItem from "../components/product/FavoriteItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";

const Favorite = (props) => {
  const [temp, setTemp] = useState(props.products);
  const [products, setProducts] = useState(props.products);

  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let filleredProd = [];
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      for (let i = 0; i < props.products.length; i++) {
        if (props.products[i].userid === auth.user.email) {
          filleredProd.push(props.products[i]);
        }
      }
      setProducts(filleredProd);

      delay();

      //  console.log("filleredProd",filleredProd)
      //  console.log("auth.user.email",auth.user.email)
      //   console.log("products.userid",products.userid)
      //   console.log("props.products",props.products)
    } else {
      //setLoading(false)
      setProducts(props.products);
    }
  }, [props.products]);

  useEffect(() => {
    console.log("kuy", products);
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const delay = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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
    <div className="lg:pt-24  pt-12 lg:mb-80">
      <Head>
        <title>CALLLAB</title>
      </Head>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
     
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
          <center>ไม่มีข้อมูลข่าวประชาสัมพันธ์</center>
        ) : !loading ? (
          products.map((product) => (
            <FavoriteItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          ))
        ) : (
          <div
            className="position-fixed w-100 h-100 text-center loading"
            style={{
              background: "#0008",
              color: "white",
              top: 0,
              left: 0,
              zIndex: 9,
            }}
          >
            <svg width="205" height="250" viewBox="0 0 40 50">
              <polygon
                strokeWidth="1"
                stroke="#fff"
                fill="none"
                points="20,1 40,40 1,40"
              ></polygon>
              <text fill="#fff" x="5" y="47">
                Loading
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* {props.result < page * 6 ? (
        ""
      ) : (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={handleLoadmore}
        >
          อ่านเพิ่มเติม
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
    `favorite?limit=${
      page * 500
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.favorits,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Favorite;
