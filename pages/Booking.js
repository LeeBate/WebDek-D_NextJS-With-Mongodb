import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

import { getData } from "../utils/fetchData";
import FavoriteItem from "../components/product/BookingItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";
import Link from "next/link";

const Favorite = (props) => {
  const [products, setProducts] = useState(props.products);
  const [products1, setProducts1] = useState(props.booking);

  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let filleredProd = [];
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      for (let i = 0; i < props.booking.length; i++) {
        if (props.booking[i].userid === auth.user.email) {
          filleredProd.push(props.booking[i]);
        }
      }
      setProducts1(filleredProd);

      delay();

      //  console.log("filleredProd",filleredProd)
      //  console.log("auth.user.email",auth.user.email)
      //   console.log("products1.userid",products.userid)
      //   console.log("props.products",props.products)
    } else {
      //setLoading(false)
      setProducts1(props.booking);
    }
  }, [props.booking]);

  console.log("book", products1);

  useEffect(() => {
    console.log("fav", products);
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const delay = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCheck = (id) => {
    products1.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products1]);
  };

  const handleCheckALL = () => {
    products1.forEach((product) => (product.checked = !isCheck));
    setProducts([...products1]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products1.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "ลบทั้งหมด",
          type: "DELETE_Booking",
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
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <Head>
        <title>CALLLAB</title>
      </Head>
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-5/5 mx-auto flex flex-wrap">
          <div class="lg:w-2/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          {products1.length === 0 ? (
            <center>ไม่มีข้อมูลประวัติการจองเครื่องมือ</center>
          ) : !loading ? (
            products1.map((product) => (
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

          
        </div>
        <div class="lg:w-2/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            การชำระเงิน
            </h1>
            <div className="my-3 table-responsive">
          <table
            className="table-bordered table-hover w-100 text-uppercase"
            style={{ minWidth: "600px", cursor: "pointer" }}
          >
            <thead className="bg-light font-weight-bold text-center">
              <tr>
                <td className="p-2">ID</td>
                <td className="p-2">ชื่อเครื่องมือ</td>
                <td className="p-2">วันที่ชำระเงิน</td>
                <td className="p-2">จำนวนเงิน</td>
                <td className="p-2">การอนุมัติการจอง</td>
                <td className="p-2">การชำระเงิน</td>
              </tr>
            </thead>

            <tbody className=" text-center">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-2 flex justify-center items-center">   
                    <Link href={`/order/${order._id}`}>
                    <img className=" rounded-full  w-[60px] h-[60px]" src={order.images}/>
                    </Link>
                  </td>
                  <td className="p-2">{order.title}</td>
                  <td className="p-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2">{order.total}฿</td>
                  <td className="p-2">
                    {order.delivered ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  <td className="p-2">
                    {order.paid ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  {order.paid ? (
                    <td><a className="btn btn-success text-white disabled"> ชำระเงินเรียบร้อย </a></td>
                  ) : (
                    <td >
                      <Link href={`/order/${order._id}`}>
                        <a className="btn btn-warning">ยังไม่ชำระเงิน</a>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res1 = await getData(
    `bookingApi?limit=${
      page * 500
    }&category=${category}&sort=${sort}&title=${search}`
  );

  //   const res = await getData(
  //     `favorite?limit=${
  //       page * 500
  //     }&category=${category}&sort=${sort}&title=${search}`
  //   );
  // server side rendering
  return {
    props: {
      //   products: res.favorits,
      //   result: res.result,
      booking: res1.booking,
    }, // will be passed to the page component as props
  };
}

export default Favorite;
