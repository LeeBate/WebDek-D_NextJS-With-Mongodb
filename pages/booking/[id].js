import Head from "next/head";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { getData, putData, postData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import Link from "next/link";
import CartItem from "../../components/CartItem";
import { TempleBuddhist } from "@mui/icons-material";

const BookingDetail = (props) => {
  const router = useRouter();
  let { id } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  const id2 = id;
  id = "";

  const uid = Object.keys(auth).length !== 0 ? (uid = auth.user.email) : "";
  const initialState = {
    email: "",
    fullname: "",
    studentID: "",
    phone: "",
    prodid: id2,
    userid: uid,
    dateBooking: "",
    dateBookingEnd: "",
    statusBooking: "รออนุมัติ",
    price: "",
  };

  const [product, setProduct] = useState(initialState);
  const {
    email,
    fullname,
    studentID,
    phone,
    dateBooking,
    dateBookingEnd,
    prodid,
    userid,
    statusBooking,
    price,
  } = product;
  //แสดงข้อมูลจาก props ที่ส่งมาจาก api เพื่อแสดงโปรดักต์ที่เลือก
  const [product1] = useState(props.product);

  const [tab, setTab] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  //แสดงข้อมูลจาก props ที่ส่งมาจาก bookingApi[index] เพื่อแสดงโปรดักต์ที่เลือก
  //props.booking มาจาก bookingApi[index]
  const [showBooking, setShowBooking] = useState(props.booking);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getTotal = () => {
  //     const res = showBooking.reduce((prev, item) => {
  //       return prev + (item.price * 1);
  //     },0)

  //     setTotal(res)
  //     console.log("res",res)
  //   }

  //   getTotal()
  // },[showBooking])
  // console.log("price",price)

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImage] = useState("");
  const [prodOrder, setProdOrder] = useState("");

  useEffect(
    () => {
      // โค้ดแสดงข้อมูลเฉพาะของผู้ใช้
      // setProduct(props.product);
      // if (Object.keys(auth).length !== 0) {
      //   htmlFor (let i = 0; i < props.booking.length; i++) {
      //     if (props.booking[i].userid === auth.user.email) {
      //       filleredProd.push(props.booking[i]);
      //     }
      //   }
      // โค้ดแสดงข้อมูลเฉพาะเครื่องมือที่เลือก
      // }setShowBooking(filleredProd.filter((item) => item.prodid === id2));
      //   delay();

      // แสดงข้อมูลที่จองทั้งหมด และจะต้องแสดงข้อมูลเฉพาะเครื่องมือที่เลือก

      setShowBooking(props.booking.filter((item) => item.prodid === id2));
      setTitle(product1.title);
      setImage(product1.images[0].url);
      setProdOrder(
        props.booking.filter((item) => item.userid === auth.user.email)
      );
      delay();
    },

    [props.booking],
    [id2]
  );
  console.log("images", images, "title", title, "prodOrder", prodOrder);

  useEffect(() => {
    const getTotal = () => {
      const res = props.booking.reduce((prev, item) => {
        return price;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [price]);
  console.log("total", total);

  const delay = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`bookingApi/${id}`).then((res) => {
        setProduct(res.product);
        setShowBooking(props.booking);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setTitle(product1.title);
      setImage(product1.images[0].url);

      // setShowBooking(props.booking)
    }
  }, [id]);

  const handlePayment = async (i, p) => {
    console.log("i", i);
    setTotal(p);
    const pay = async () => {
      if (prodOrder.length === 1) {
        postData(
          "order",
          { address, mobile, total, title, images, prodOrder },
          auth.token
        ).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });

          const newOrder = {
            ...res.newOrder,
            user: auth.user,
          };
          dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
          dispatch({ type: "NOTIFY", payload: { success: res.msg } });
          return router.push(`/order/${res.newOrder._id}`);
        });
      } else if (prodOrder.length > 1) {
        let newOrder1 = await prodOrder.filter((item) => i === item._id);
        setProdOrder(newOrder1);
        console.log("2", newOrder1);
      }
    };

    pay();
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { auth } = await state;

    if (Object.keys(auth).length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "โปรดเข้าสู่ระบบ" },
      });

    if (
      !email ||
      !fullname ||
      !phone ||
      !dateBooking ||
      !dateBookingEnd ||
      !studentID
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "โปรดกรอกข้อมูลให้ครบ." },
      });
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (onEdit) {
      res = await putData(
        `bookingApi/${id}`,
        { ...product, ...showBooking },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData("bookingApi", { ...product }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }
    setProduct(initialState);
    setProdOrder(product._id);
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    return router.replace(router.asPath);
    //  return router.query.id ? router.push(`/booking/${router.query.id}`) : router.push("/");
  };

  //Function สำหรับแสดงข้อมูล

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <Head>
        <title>CALLLAB</title>
      </Head>
      <div className="container px-5 py-24 mx-auto ">
        <center className=" py-3 mt-2">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            ข้อมูลการจอง {product1.title}
          </h1>
        </center>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
              <tr>
                <th scope="col" className="px-3 py-3">
                  ชื่อ-นามสกุล
                </th>
                <th scope="col" className="px-3 py-3">
                  รหัสนักศึกษา
                </th>
                <th scope="col" className="px-3 py-3">
                  อีเมล
                </th>
                <th scope="col" className="px-3 py-3">
                  วันที่เริ่มต้นการจอง
                </th>
                <th scope="col" className="px-3 py-3">
                  วันที่สิ้นสุดการจอง
                </th>{" "}
                {/* <th scope="col" className="px-3 py-3 ">
                  สถานะการจอง
                </th> */}
                <th scope="col" className="px-3 py-3 ">
                  การแก้ไข
                </th>
                <th scope="col" className="px-3 py-3 ">
                  ชำระเงิน
                </th>
              </tr>
            </thead>
            {showBooking.length === 0 ? (
              <center></center>
            ) : !loading ? (
              <tbody>
                {showBooking.map((booking,key) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={key}
                  >
                    {/* <th
                              scope="row"
                              className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {booking.fullname}
                            </th> */}
                    <td className="px-3 py-4">{booking.fullname}</td>
                    <td className="px-3 py-4">{booking.studentID}</td>
                    <td className="px-3 py-4">{booking.email}</td>
                    <td className="px-3 py-4">
                      {new Date(booking.dateBooking).toLocaleString()}
                    </td>

                    <td className="px-3 py-4">
                      {new Date(booking.dateBookingEnd).toLocaleString()}
                    </td>

                    {/* <td className="px-3 py-4">{booking.statusBooking}</td> */}
                    {Object.keys(auth).length !== 0 ? (
                      booking.userid !== auth.user.email ? (
                        <td className="px-3 py-4 ">-</td>
                      ) : (
                        <td className="px-2.5 py-4 ">
                          <button
                            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 border border-blue-700 rounded "
                            style={{ marginLeft: "5px", flex: 1 }}
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() =>
                              dispatch({
                                type: "ADD_MODAL",
                                payload: [
                                  {
                                    data: "",
                                    id: booking._id,
                                    title: booking.fullname,
                                    type: "DELETE_Booking",
                                  },
                                ],
                              })
                            }
                          >
                            ลบข้อมูล
                          </button>
                        </td>
                      )
                    ) : (
                      <div></div>
                    )}

                    {Object.keys(auth).length !== 0 ? (
                      booking.userid !== auth.user.email ? (
                        <td className="px-3 py-4 ">-</td>
                      ) : (
                        <td className="px-3 py-4 ">
                          <button
                            className=" hover:bg-[#1a237e] text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => {
                              let newOrder1 = props.booking.filter(
                                (item) => booking._id === item._id
                              );
                              setProdOrder(newOrder1);
                              handlePayment(booking._id, booking.price);
                            }}
                          >
                            จ่ายเงิน
                          </button>
                        </td>
                      )
                    ) : (
                      <div></div>
                    )}
                  </tr>
                ))}
              </tbody>
            ) : (
              <></>
            )}
          </table>
        </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap mt-5">
          <img
            src={product1.images[tab].url}
            alt={product1.images[tab].url}
            className="lg:w-1/2 xl:w-1/2 object-cover py-3 rounded h-[100%] max-h-[589px] w-full mx-auto "
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product1.en}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product1.title}
            </h1>
            <div className="mx-1 md:mx-14 xl:mx-24">
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        ลำดับ
                      </th>
                      <th scope="col" className="py-3 px-6">
                        รายการ
                      </th>
                      <th scope="col" className="py-3 px-6">
                        อัตรา1
                        <br />
                        (100%)
                      </th>
                      <th scope="col" className="py-3 px-6">
                        อัตรา2
                        <br />
                        (75%)
                      </th>
                      <th scope="col" className="py-3 px-6">
                        อัตรา3
                        <br />
                        (50%)
                      </th>
                      <th scope="col" className="py-3 px-6">
                        อัตรา4
                        <br />
                        (นักวิจัย)
                      </th>

                      <th scope="col" className="py-3 px-6">
                        อัตรา5
                        <br />
                        (บัณฑิต)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product1.nameRate.map((obj, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">
                          <span>{i + 1 || "-"}</span>
                        </td>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span>{obj.ListName || "Unknown"}</span>
                        </th>

                        <td className="py-4 px-6 font-medium text-gray-900">
                          <span>{obj.price1 || "-"}</span>
                        </td>

                        <td className="py-4 px-6 font-medium text-gray-900">
                          <span>{obj.price2 || "-"}</span>
                        </td>

                        <td className="py-4 px-6 font-medium text-gray-900">
                          <span>{obj.price3 || "-"}</span>
                        </td>

                        <td className="py-4 px-6 font-medium text-gray-900">
                          <span>{obj.price4 || "-"}</span>
                        </td>

                        <td className="py-4 px-6 font-medium text-gray-900">
                          <span>{obj.price5 || "-"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className=" mt-6">
              <form method="post" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={fullname}
                    onChange={handleChangeInput}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="fullname"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    ชื่อ-นามสกุล :
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="studentID"
                    id="studentID"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={studentID}
                    onChange={handleChangeInput}
                    required
                  />
                  <label
                    htmlFor="studentID"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    รหัสนักศึกษา/รหัสพนักงาน :
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={email}
                    onChange={handleChangeInput}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    อีเมลมหาวิทยาลัย :
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={phone}
                    onChange={handleChangeInput}
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    เบอร์โทรศัพท์ :
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="datetime-local"
                      name="dateBooking"
                      id="dateBooking"
                      value={dateBooking}
                      onChange={handleChangeInput}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="dateBooking"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      วันที่ต้องการจองเครื่องมือ :
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="datetime-local"
                      name="dateBookingEnd"
                      value={dateBookingEnd}
                      onChange={handleChangeInput}
                      id="dateBookingEnd"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="dateBookingEnd"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      วันที่สิ้นสุด :
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="flex items-center">
                    <div className="relative">
                      {product1.nameRate.map((item,i) => (
                        <select
                          key={i}
                          id="price"
                          name="price"
                          value={price}
                          onChange={handleChangeInput}
                          className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                        >
                          <option value="">เลือกอัตราค่าบริการ</option>
                          <option key={item.price1} value={item.price1}>
                            {item.price1}
                          </option>
                          <option key={item.price2} value={item.price2}>
                            {item.price2}
                          </option>
                          <option key={item.price3} value={item.price3}>
                            {item.price3}
                          </option>
                          <option key={item.price4} value={item.price4}>
                            {item.price4}
                          </option>
                          <option key={item.price5} value={item.price5}>
                            {item.price5}
                          </option>
                        </select>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    เป็นจำนวนเงิน {price}฿
                  </span>
                  <button className="flex ml-auto text-white bg-[#1a237e] hover:bg-[#FFA500] border-0 py-2 px-6 focus:outline-none rounded">
                    {onEdit ? "อัพเดตเครื่องมือ" : "จองเครื่องมือ"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps({ query, params: { id } }) {
  const res = await getData(`product/${id}`);

  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const resfav = await getData(
    `bookingApi?limit=${
      page * 500
    }&category=${category}&sort=${sort}&title=${search}`
  );

  // server side rendering

  return {
    props: {
      product: res.product,
      result: resfav.result,
      booking: resfav.booking,
    },

    // will be passed to the page component as props
  };
}

export default BookingDetail;
