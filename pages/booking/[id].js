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


  useEffect(
    () => {
      // โค้ดแสดงข้อมูลเฉพาะของผู้ใช้
      // setProduct(props.product);
      // if (Object.keys(auth).length !== 0) {
      //   for (let i = 0; i < props.booking.length; i++) {
      //     if (props.booking[i].userid === auth.user.email) {
      //       filleredProd.push(props.booking[i]);
      //     }
      //   }
      // โค้ดแสดงข้อมูลเฉพาะเครื่องมือที่เลือก
      // }setShowBooking(filleredProd.filter((item) => item.prodid === id2));
      //   delay();

      // แสดงข้อมูลที่จองทั้งหมด และจะต้องแสดงข้อมูลเฉพาะเครื่องมือที่เลือก

      setShowBooking(props.booking.filter((item) => item.prodid === id2));
      delay();
    },

    [props.booking],
    [id2]
  );

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const getTotal = () => {
      const res = showBooking.reduce((prev, item) => {
        return prev + (item.price * 1)
      },0)

      setTotal(res)
    }

    getTotal()
  },[showBooking])
  console.log("price",total)

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
      // setShowBooking(props.booking)
    }
  }, [id]);
  console.log("1", product);

  const handlePayment = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData("order", { address, mobile, total }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({ type: "ADD_CART", payload: [] });

      const newOrder = {
        ...res.newOrder,
        user: auth.user,
      };
      dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return router.push(`/order/${res.newOrder._id}`);
    });
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
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    return router.replace(router.asPath);
    //  return router.query.id ? router.push(`/booking/${router.query.id}`) : router.push("/");
  };

  //Function สำหรับแสดงข้อมูล

  return (
    <section className="p-1">
      <Head>
        <title>CALLLAB</title>
      </Head>
      <div className="grid bg-[#e0e7ff] pb-8 rounded-md  mt-28 mx-auto w-[95%] content-center    grid-cols-1 lg:grid-cols-5 grid-rows-5  px-8 h-auto gap-4">
        <div className=" my-auto col-span-3 lg:col-span-5 ">
          <div className="text-capitalize font-bold text-4xl ">
            <div className=" my-auto col-span-3 lg:col-span-5 ">
              <div className="text-capitalize font-bold text-4xl ">
                {/* แสดงข้อมูลการจอง */}
                <center>ข้อมูลการจอง</center>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          ชื่อ-นามสกุล
                        </th>
                        <th scope="col" class="px-6 py-3">
                          รหัสนักศึกษา
                        </th>
                        <th scope="col" class="px-6 py-3">
                          อีเมล
                        </th>
                        <th scope="col" class="px-6 py-3">
                          วันที่เริ่มต้นการจอง
                        </th>
                        <th scope="col" class="px-6 py-3">
                          วันที่สิ้นสุดการจอง
                        </th>{" "}
                        <th scope="col" class="px-6 py-3 ">
                          สถานะการจอง
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                          การแก้ไข
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                          ชำระเงิน
                        </th>
                      </tr>
                    </thead>
                    {showBooking.length === 0 ? (
                      <center></center>
                    ) : !loading ? (
                      <tbody>
                        {showBooking.map((booking) => (
                          <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={booking._id}
                          >
                            {/* <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {booking.fullname}
                            </th> */}
                            <td class="px-6 py-4">{booking.fullname}</td>
                            <td class="px-6 py-4">{booking.studentID}</td>
                            <td class="px-6 py-4">{booking.email}</td>
                            <td class="px-6 py-4">{booking.dateBooking}</td>
                            <td class="px-6 py-4">{booking.dateBookingEnd}</td>

                            <td class="px-6 py-4">{booking.statusBooking}</td>
                            {booking.userid !== auth.user.email ? (
                              <td class="px-6 py-4 ">-</td>
                            ) : (
                              <td
                                className="btn btn-danger px-4 py-4"
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
                                Delete
                              </td>
                            )}

                            {booking.userid !== auth.user.email ? (
                              <td class="px-6 py-4 ">-</td>
                            ) : (
                              <td
                                className="px-4 py-4 bg-black text-white cursor-pointer"
                                onClick={handlePayment}
                              >
                                จ่ายเงิน
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <></>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" my-auto col-span-3 lg:col-span-5 ">
          <div className="text-capitalize font-bold text-4xl ">
            <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
              {product1.en}
            </h1>
            <h1 className="text-sm md:text-xl ">{product1.title}</h1>
          </div>
        </div>

        <div className=" col-span-2 pb-0 xl:pb-3 max-h-[589px]  rounded-md row-span-4 bg-white">
          <img
            src={product1.images[tab].url}
            alt={product1.images[tab].url}
            className=" object-fill py-3 rounded h-[100%] max-h-[589px] w-auto mx-auto "
          />
        </div>
        <div className="col-span-3  row-span-2">
          <div className="flex flex-col ml-2 md:ml-3 xl:ml-4">
            <div className="text-base sm:text-lg mx-7 xl:mx-22  mb-3 ">
              <p>อัตราค่าบริการ : บาท/ชั่วโมง (Baht / Hour)</p>
            </div>
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
          </div>{" "}
          <form method="post" onSubmit={handleSubmit}>
            <div className="flex flex-col mt-3">
              <p className="my-2 font-bold text-sm md:text-lg">
                ชื่อ-นามสกุล :
              </p>
              <div class="ui input focus">
                <input
                  className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  name="fullname"
                  value={fullname}
                  placeholder="นาย ศุภชัย สุขสวัสดิ์"
                  onChange={handleChangeInput}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row">
              <p className="my-2 font-bold text-sm md:text-lg">
                รหัสนักศึกษา/รหัสพนักงาน :
              </p>
              <div class="ui input focus">
                <input
                  className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  name="studentID"
                  value={studentID}
                  placeholder="Bxxxxxx"
                  onChange={handleChangeInput}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row">
                <p className="my-2 font-bold text-sm md:text-lg">
                  อีเมลมหาวิทยาลัย :
                </p>
                <div class="ui input focus">
                  <input
                    className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Bxxxxxx@g.sut.ac.th"
                    onChange={handleChangeInput}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <p className="my-2 font-bold text-sm md:text-lg">
                  เบอร์โทรศัพท์ :
                </p>
                <div class="ui input focus">
                  <input
                    className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="number"
                    name="phone"
                    value={phone}
                    placeholder="08xxxxxxxx"
                    onChange={handleChangeInput}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                {/* <p className="my-2 font-bold text-sm md:text-lg">
                วันและเวลาที่ต้องการจองเครื่องมือ :
              </p> */}
                <div className="flex flex-row ">
                  <div class="ui input focus pr-2">
                    <p className="my-2 font-bold text-sm md:text-lg">
                      วันที่เริ่มต้น :
                    </p>
                    <input
                      className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="datetime-local"
                      name="dateBooking"
                      value={dateBooking}
                      onChange={handleChangeInput}
                      required
                    />
                  </div>
                  <div class="ui input focus">
                    <p className="my-2 font-bold text-sm md:text-lg">
                      วันที่สิ้นสุด :
                    </p>
                    <input
                      className="bg-white appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="datetime-local"
                      name="dateBookingEnd"
                      value={dateBookingEnd}
                      onChange={handleChangeInput}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {/* <p className="my-2 font-bold text-sm md:text-lg">
                วันและเวลาที่ต้องการจองเครื่องมือ :
              </p> */}
                <div className="flex flex-row ">
                  <div class="ui input focus pr-2">
                    <label className="my-2 font-bold text-sm md:text-lg">
                      อัตราค่าบริการ :
                    </label>
                    {product1.nameRate.map((item) => (
                      <select
                        id="price"
                        onChange={handleChangeInput}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        name="price"
                        value={price}
                      >
                        <option value="all">เลือกอัตราค่าบริการ</option>
                        <option key={item._id} value={item.price1}>
                          {item.price1}
                        </option>
                        <option key={item._id} value={item.price2}>
                          {item.price2}
                        </option>
                        <option key={item._id} value={item.price3}>
                          {item.price3}
                        </option>
                        <option key={item._id} value={item.price4}>
                          {item.price4}
                        </option>
                        <option key={item._id} value={item.price5}>
                          {item.price5}
                        </option>
                      </select>
                    ))}
                  </div>
                  <div className="col-md-8 text-secondary table-responsive my-3">
                    {/* <h2 className="text-uppercase">Shopping Cart</h2>

          <table className="table my-3">
            <tbody>
              {
                showBooking.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} product={product} />
                
                  ))
              }
            </tbody>
          </table> */}
                  </div>
                </div>
                {/* <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
            <form>
              <h2>Shipping</h2>

              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address"
              className="form-control mb-2" value={address}
              onChange={e => setAddress(e.target.value)} />

              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
            </form>

            <h3>Total: <span className="text-danger">${total}</span></h3>

            
            <Link href={auth.user ? '#!' : '/signin'}>
              <a className="btn btn-dark my-2" onClick={handlePayment}>Proceed with payment</a>
            </Link>
            
        </div> */}
              </div>
            </div>
            <button
              type="submit"
              className=" bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg text-white font-bold py-2 px-4 border-b-4  rounded-full block w-full p-2.5 mt-2"
            >
              {onEdit ? "อัพเดต" : "สร้าง"}
            </button>
          </form>
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
