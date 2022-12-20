import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { getData, putData, postData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { deleteData } from "../../utils/fetchData";
import Link from "next/link";



const BookingDetail = (props, query) => {
  let initialState = {
    email: "",
    fullname: "",
    studentID: "",
    phone: "",
    prodid: "",
    userid: "",
  };

  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [onEdit, setOnEdit] = useState(false);

  const [booking, setBooking] = useState(initialState);
  const { email, fullname, studentID, phone, prodid, userid } = booking;

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      setOnEdit(true);

      setBooking({
        email: product.email,
        fullname: product.fullname,
        studentID: product.studentID,
        phone: product.phone,
        userid: auth.user.email,
        prodid: !product._id ? "no prodid" : product._id,
      });
    } else {
      getData(`product/${id}`).then((res) => {
        setBooking(res.product);
      });
    }
  }, [id]);


  return (
    <section className="p-1">
      <Head>
        <title>{product.title}</title>
      </Head>

      <div className="grid bg-[#e0e7ff] pb-8 rounded-md  mt-28 mx-auto w-[95%] content-center    grid-cols-1 lg:grid-cols-5 grid-rows-5  px-8 h-auto gap-4">
        <div className=" my-auto col-span-3 lg:col-span-5 ">
          <div className="text-capitalize font-bold text-4xl ">
            <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
              {product.en}
            </h1>
            <h1 className="text-sm md:text-xl ">{product.title}</h1>
          </div>
        </div>

        <div className=" col-span-2 pb-0 xl:pb-3 max-h-[589px]  rounded-md row-span-4 bg-white">
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
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
              {product.nameRate.map((obj, i) => (
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
            <div className="flex flex-row mt-3">
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
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-2 md:ml-3 xl:ml-4">
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
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder="08xxxxxxxx"
                />
              </div>
            </div>
           

          </div>
        </div>
        
      </div>
    </section>
  );
};

export async function getServerSideProps({ params: { id }, query }) {
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
  console.log(resfav);
  return {
    props: { product: res.product, result: resfav.result, favorite: resfav },

    // will be passed to the page component as props
  };
}

export default BookingDetail;
