import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { getData, putData, postData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { deleteData } from "../../utils/fetchData";
import { FaFilePdf } from "react-icons/fa";
import {AiFillVideoCamera} from "react-icons/ai";
import {MdContactMail} from "react-icons/md";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineScience } from "react-icons/md";

const DetailProduct = (props, query) => {
  let [fav, setFav] = useState();
  const [favoriteData, setFavoriteData] = useState(fav);

  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const { state, dispatch } = useContext(DataContext);

  const { auth } = state;

  const [toggler, setToggler] = useState();

  let initialState = {
    title: "",
    en: "",
    images: "",
    category: "",
    userid: "",
    prodid: "",
  };

  const [favorite, setFavorite] = useState(initialState);
  const { title, en, category, prodid, userid, images } = favorite;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  let filleredProd = [];
  let [tempcheck, setTemcheck] = useState([]);
  let [gg, setGg] = useState();

  const [checkFavExit, setcheckFavExit] = useState(tempcheck);

  useEffect(() => {
    if (tempcheck.length > 0) {
      setToggler(false);
    } else {
      setToggler(true);
    }
  }, [fav, checkFavExit, tempcheck]);

  useEffect(() => {
    HandleCheckFavorite();
  }, [auth, tempcheck, checkFavExit, gg]);

  async function HandleCheckFavorite() {
    if (Object.keys(auth).length !== 0) {
      const page = query.page || 1;
      const category = query.category || "all";
      const sort = query.sort || "";
      const search = query.search || "all";

      fav = await getData(
        `favorite?limit=${
          page * 500
        }&category=${category}&sort=${sort}&title=${search}`
      );

      console.log("fav api", fav);

      filleredProd = [];

      for (let i = 0; i < fav.favorits.length; i++) {
        if (fav.favorits[i].userid === auth.user.email) {
          filleredProd.push(fav.favorits[i]);
        }
      }

      for (let i = 0; i < filleredProd.length; i++) {
        if (filleredProd[i].prodid === product._id) {
          tempcheck.push(filleredProd[i]);
        }
      }
      setcheckFavExit(tempcheck);
      console.log("tempcheck=", tempcheck);
      if (tempcheck.length > 0) {
        setToggler(false);
      } else {
        setToggler(true);
      }
    } else {
      console.log("enter else");
      setFavoriteData(props.favorite.favorits);
    }
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      setOnEdit(true);

      setFavorite({
        title: product.title,
        en: product.en,
        images: product.images[0].url,
        category: product.category,
        userid: auth.user.email,
        prodid: !product._id ? "no prodid" : product._id,
      });
    } else {
      getData(`product/${id}`).then((res) => {
        setFavorite(res.product);
      });
    }
  }, [id]);

  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setFavorite({ ...favorite, [name]: value });
  //   dispatch({ type: "NOTIFY", payload: {} });
  // };

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`favorite/${checkFavExit[0]._id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      else {
        console.log("hahahaha");
        setTemcheck([]);
        HandleCheckFavorite();

        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    HandleCheckFavorite();
    const { auth } = await state;
    if (Object.keys(auth).length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "โปรดเข้าสู่ระบบ" },
      });

    if (!title || !en || !prodid || !userid || !category || !images)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "โปรดกรอกข้อมูลให้ครบ." },
      });
    let res;
    if (false) {
      res = await putData(
        `favorite/${id}`,
        {
          ...favorit,
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData("favorite", { ...favorite }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }
    HandleCheckFavorite();
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  function ConvertDate(date) {
    const data = new Date(date).toLocaleString("th-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return data;
  }

  const alert = async (e) => {
    e.preventDefault();
    const { auth } = await state;
    if (Object.keys(auth).length === 0) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "กรุณาเข้าสู่ระบบ" },
      });
    }
  };

  return (
    <section >
      <Head>
        <title>{product.title}</title>
      </Head>

      <div className="grid bg-[#e0e7ff] pb-8 rounded-md mx-auto w-[95%] content-center grid-cols-1 lg:grid-cols-5 grid-rows-5  px-8 h-auto gap-4 my-5">
        <div className=" my-auto col-span-3 lg:col-span-5 ">
          <div className="text-capitalize font-bold text-4xl ">
            <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
              {product.en}
            </h1>
            <h1 className="text-sm md:text-xl ">{product.title}</h1>
          </div>
        </div>

        <div className=" col-span-2 pb-0 xl:pb-3 max-h-[589px]  rounded-md row-span-4 bg-white">
          {/* <div className="grid grid-cols-1 bg-red-400 grid-rows-7 w-full h-full"> */}
          {/* <div className=" h-full w-full row-span-5"> */}
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className=" object-fill py-3 rounded h-[100%] max-h-[589px] w-auto mx-auto "
          />
          {/* </div> */}
          {/* <div className="h-full w-full row-span-2"> */}
          {/* </div> */}
          {/* </div> */}
        </div>
        <div className="col-span-3  row-span-2">
          <div className="flex flex-col ml-2 md:ml-3 xl:ml-4">
            <div className="flex flex-row">
              <p className="my-2 font-bold text-sm md:text-lg">ยี่ห้อ : </p>
              <p className="my-2 ml-[8px] text-sm md:text-lg">
                {product.brand}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="my-2 font-bold text-sm md:text-lg">รุ่น : </p>
              <p className="my-2 ml-[8px] text-sm md:text-lg">
                {product.modelName}
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-2 md:ml-3 xl:ml-4">
            <div className="flex flex-row">
              <p className="my-2 font-bold text-sm md:text-lg">
                ห้องปฏิบัติการ (ภาษาไทย) :{" "}
              </p>
              <p className="my-2 ml-[8px] text-sm md:text-lg">{product.room}</p>
            </div>
            <div className="flex flex-row">
              <p className="my-2 font-bold text-sm md:text-lg">
                ห้องปฏิบัติการ (ภาษาอังกฤษ) :{" "}
              </p>
              <p className="my-2 ml-[8px] text-sm md:text-lg">
                {product.roomen}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="my-2 font-bold text-sm md:text-lg">
                ผู้ดูแลเครื่องมือ :{" "}
              </p>
              <p className="my-2 ml-[8px] text-sm md:text-lg">
                {product.manager}
              </p>
            </div>
          </div>
        </div>
        <div className="  col-span-3 ml-2 md:ml-3 xl:ml-4 row-span-2">
          <div className="grid w-full h-full grid-cols-2 gap-4 grid-rows-1">
            <div className="...">
              <div>
                <p className="font-semibold  text-sm md:text-lg">
                  ความสามารถของเครื่องมือ
                </p>
                <p className="text-sm whitespace-pre-line md:text-lg">{product.detailCapability}</p>
              </div>
            </div>
            <div className="...">
              <div>
                <p className="font-semibold text-sm md:text-lg">
                  ข้อจำกัดของเครื่องมือ
                </p>
                <p className="text-sm whitespace-pre-line md:text-lg">
                  {product.detailRestrictions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-base xl:text-3xl sm:text-lg mx-7 xl:mx-22 mb-3 px-8 gap-4">
        <p>อัตราค่าบริการ : บาท/ชั่วโมง (Baht / Hour)</p>
      </div>

      <div className="mx-1 md:mx-14 xl:mx-24 px-8 gap-4">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm xl:text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
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
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-lg"
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
        <p className="text-sm xl:text-base  xl:mx-22 mt-3 ">
        หมายเหตุ : เฉพาะเจ้าหน้าที่ทดสอบ ติดต่อสอบถามโดยตรงกับเจ้าหน้าที่
      </p>
      </div>

      

      <div className="flex flex-col md:flex-row justify-start xl:justify-end md:justify-end mt-3 mb-8 px-8  space-y-2">
        {Object.keys(auth).length !== 0 ? (
          <Link href={`/booking/${product._id}`}>
            {/* <a
              rel="noopener noreferrer"
            className="text-center rounded-full btn bg-[#FFA500] hover:bg-[#1a237e] text-white border-2  px-2 py-2  text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3">

            
            <button >
              <div className="flex items-center justify-center  ">
              จองเครื่องมือ<MdOutlineScience className="inline ml-2"></MdOutlineScience>
              </div>
            </button>
            </a> */}
            <a
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-[#FFA500] hover:bg-[#1a237e] shadow-md hover:shadow-lg text-white px-2 py-2 mr-1.5 rounded-full text-center no-underline"
            >
          <button
            type="button"
            
          >
           จองเครื่องมือ
           <MdOutlineScience className="inline ml-2"/>
          </button>
          </a>
          </Link>
        ) : (
          <Link href="#">
            <button
              className="btn bg-[#FFA500] hover:bg-[#1a237e] px-2 py-2 mr-1.5 rounded-full text-white"
              onClick={alert}
            >
              <div className="flex items-center justify-center ">
                จองเครื่องมือ<MdOutlineScience className="inline ml-2"></MdOutlineScience>
                
              </div>
            </button>
          </Link>
        )}
        {product.pdf.length > 0 ? (
            <Link href={ product.pdf[0].url}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="  bg-[#1a237e] shadow-md hover:shadow-lg text-white px-2 py-2 mr-1.5 rounded-full text-center no-underline"
            >
              <button>
                คู่มือการใช้งาน
                <FaFilePdf className="inline ml-2" />
              </button>
            </a>
          </Link>
        ) : (
          
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="  hover:bg-[#8e8e8e] bg-[#8e8e8e] shadow-md hover:shadow-lg text-white px-2 py-2 mr-1.5 rounded-full text-center no-underline"
          >
            <button disabled>
              ไม่มีคู่มือการใช้งาน
              <FaFilePdf className="inline ml-2" />
            </button>
          </a>
        
        )}

        <Link href="https://drive.google.com/file/d/1gVu30s01a_tcPBb4F8TRt4fqwUcDhY8S/view?usp=sharing">
        <a
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-[#1a237e] shadow-md hover:shadow-lg text-white px-2 py-2 mr-1.5 rounded-full text-center no-underline"
            >
          <button
            type="button"
            
          >
            ใบคำขอรับบริการ
            <MdContactMail className=" inline ml-2" />
          </button>
          </a>
        </Link>

        {product.video.length !==0 && product.video !== "-" ? (
          <Link href={product.video}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="  bg-[#1a237e] shadow-md hover:shadow-lg text-white px-2 py-2 mr-1.5 rounded-full text-center no-underline"
          >
            <button >
              วิดีโอการใช้งาน
              <AiFillVideoCamera className="inline ml-2" />
            </button>
          </a>
        </Link>
        ) : (
         
          <a
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:bg-[#8e8e8e] bg-[#8e8e8e] shadow-md hover:shadow-lg text-white px-2 py-2 mr-1.5 rounded-full text-center no-underline"
            
          >
            <button disabled>
              ไม่มีวิดีโอเครื่องมือ
              <FaFilePdf className="inline ml-2" />
            </button>
          </a>
        
        )}
        {toggler ? (
          <button
            type="button"
            onClick={handleSubmit}
            className=" flex justify-center items-center rounded-full bg-[#f6f6f6] text-black border-2 px-2 py-1.5 text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3"
          >
            {" "}
            เพิ่มรายการโปรด
            <BsHeart className="ml-2" />
          </button>
        ) : (
          <button
            type="button"
            // data-toggle="modal" data-target="#exampleModal"
            onClick={handleRemove}
            className=" flex justify-center items-center rounded-xl bg-[#ffffffd3] text-black border-2 px-2 py-2 text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3"
          >
            {" "}
            
            <BsHeartFill color="fe4141" />
          </button>
        )}
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
    `favorite?limit=${
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

export default DetailProduct;
