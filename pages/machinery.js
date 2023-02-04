import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import React from "react";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";


const Machinery = (props) => {
  const [products, setProducts] = useState(props.products);

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;

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


  const [Search, setSearch] = useState("");
  const newData = [];

  const SearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
      setProducts(props.products);
      console.log("setslide default");
    }
    if (e.target.value != "") {
      newData = props.products.filter(
        (item) =>
          item.title.includes(e.target.value) ||
          item.en.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setProducts(newData);
      console.log("setslide newdata");
    }
  };
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  return (
    <div>
      <Head>
        <title>CALLLAB</title>
      </Head>

      <div className="  pt-4 py-0 px-4 flex flex-col lg:flex-row justify-between gap-3 relative lg:-top-0 lg:shadow-1 lg:backdrop-blur rounded-lg ">

        <form
        className="flex items-center relative mt-2 w-full rounded-md shadow-sm"
        autoComplete="off"
        >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none w-full">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              value={Search}
              onChange={SearchChange}
              placeholder="ค้นหา..."
              className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              
            />
            
          </div>
        </form>

        <div className="relative mt-2 w-full lg:w-1/5 rounded-md ">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={category}
            onChange={handleCategory}
          >
            <option value="all">เครื่องมือทั้งหมด</option>

            {categories.map((item,key) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-2 w-full lg:w-1/5 rounded-md ">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={sort}
            onChange={handleSort}
          >
            <option value="-createdAt">ใหม่ล่าสุด</option>
            <option value="oldest">เก่าที่สุด</option>
          </select>
        </div>
      </div>

      <input />
      <div className="px-4">
        <div className=" grid-flow-row xl:px-50 mx-auto products lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {products.length === 0 ? (
            <div className="alert alert-warning my-auto">
              <div>
                <div className="swap-off">
                  😭 <span>ไม่พบข้อมูล! โปรดค้นหาใหม่อีกครั้ง</span>
                </div>
              </div>
            </div>
          ) : (
            products.map((product,key) => (
              <div key={product._id} data-aos="fade-up">
                <ProductItem  product={product} handleCheck={handleCheck} />
              </div>
            ))
          )}
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
    `product?limit=${page * 100}&category=${category}&sort=${sort}&en=${search}`
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
