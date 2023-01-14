import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";
import { getData, putData, postData } from "../../utils/fetchData";

import { useRouter } from "next/router";

import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";

const EditBooing = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [showBooking, setShowBooking] = useState(props.booking);
  console.log(showBooking);
  const [onEdit, setOnEdit] = useState(false);
  

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setShowBooking({ ...booking, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    if (onEdit) {
      res = await putData(
        `bookingApi/${id}`,
        {
          ...showBooking,
          
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "bookingApi",
        {
          ...showBooking,
          
        },
        auth.token
      );

      if (res.err) return dispatch({ type: "NOTIFY", payload: { error: "" } });
    }
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    return router.replace("/machinery");
  };

  useEffect(() => {
    if(id){
        setOnEdit(true)
        getData(`bookingApi/${id}`).then(res => {
            setShowBooking(res.booking)
        })
    }else{
        setOnEdit(false)
        setShowBooking("")
    }
},[id])

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        Nav {
          display: none;
        }
      `}</style>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>

      <Head>
        <title>แก้ไขการจอง</title>
      </Head>
      <div className="container py-0 h-100">
        <div className="d-flex justify-center items h-100">
          <div className="col col-xl-9 col-lg-8 ">
            <button className="btn btn-dark" onClick={() => router.back()}>
              <i className="fas fa-long-arrow-alt-left" aria-hidden></i>{" "}
              ย้อนกลับ
            </button>
            <div>
              

                {showBooking.map((booking) => (
                  <form
                    method="post"
                    onSubmit={handleSubmit}
                    className="space-y-7 md:space-y-8"
                    key={booking._id}
                  >
                    <div className="md:flex flex-row">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                        ชื่อ-นามสกุล
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          value={booking.fullname}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                          block w-full md:w-[335px] p-2.5 mb-2 xl:mr-5 md:mr-5"
                          onChange={handleChangeInput}
                          placeholder="ชื่อเครื่องมือ (ภาษาไทย)"
                          required
                        />
                      </div>

                      <div className="md:ml-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                        รหัสนักศึกษา
                        </label>
                        <input
                          type="text"
                          name="studentID"
                          value={booking.studentID}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                          block w-full md:w-[335px] p-2.5 "
                          onChange={handleChangeInput}
                          placeholder="ชื่อเครื่องมือ (ภาษาอังกฤษ)"
                          required
                        />
                      </div>
                    </div>

                    <div className="md:flex flex-row">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                        อีเมล
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={booking.email}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                          block w-full md:w-[335px] p-2.5 mb-2 xl:mr-5 md:mr-5"
                          onChange={handleChangeInput}
                          placeholder="ชื่อห้องปฎิบัติการ (ภาษาไทย)"
                          required
                        />
                      </div>
                      <div className="md:ml-5 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                          วันที่เริ่มต้นการจอง
                        </label>
                        <input
                          type="text"
                          name="dateBooking"
                          value={booking.dateBooking}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                          block w-full md:w-[335px] p-2.5 "
                          onChange={handleChangeInput}
                          placeholder="ชื่อห้องปฎิบัติการ (ภาษาอังกฤษ)"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                        วันที่สิ้นสุดการจอง
                      </label>
                      <input
                        type="text"
                        name="dateBookingEnd"
                        value={booking.dateBookingEnd}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                        block w-full md:w-[710px] xl:w-[710px] p-2.5 "
                        onChange={handleChangeInput}
                        placeholder="ผู้ดูแลเครื่องมือ"
                        required
                      />
                    </div>
<button
                  type="submit"
                  className="shadow-sm bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 
hover:border-green-500 rounded block w-full p-2.5 "
                >
                 {onEdit ? "อัพเดต" : "สร้าง"}
                </button>
                  </form>
                ))}
                
              </div>
            </div>
          </div>
        </div>
    </ThemeProvider>
  );
};

export async function getServerSideProps({ query, params: { id } }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";
  const res = await getData(
    `bookingApi?limit=${
      page * 100
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      booking: res.booking,
    
    },
  };
}
export default EditBooing;
