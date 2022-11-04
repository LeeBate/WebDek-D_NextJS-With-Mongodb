import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { getData, putData, postData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { deleteData } from "../../utils/fetchData";

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

      // setFavoriteData(filleredProd)

      //  console.log("filleredProdFavoriteData",filleredProd)
      //  console.log("auth.user.email",auth.user.email)

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
    // if()
    // setToggler(false)

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

    // console.log(auth.token);
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

  return (
    <section className="p-1">
      
        <Head>
          <title>{product.title}</title>
        </Head>
        <div className="flex flex-col bg-indigo-100 mt-24  rounded-xl mx-1 sm:mx-4 md:mx-14 xl:mx-24">
          <div className="text-capitalize font-bold text-3xl mt-[36px] ml-5 mr-5 mx-[20px] md:mx-[40px] xl:mx-[60px]">
            <h1 className="text-lg md:text-xl ">
              {product.en}
            </h1>
            <h1 className="text-sm md:text-lg ">{product.title}</h1>
          </div>
          <div className="flex flex-col mx-4 sm:flex-col md:flex-col xl:flex-row sm:mx-4 md:mx-14 xl:mx-24 ">
            <div className="mx-3 md:mx-auto">
              <img
                src={product.images[tab].url}
                alt={product.images[tab].url}
                className="img-thumbnail rounded mt-4 w-[250px] h-[250px] md:w-full md:h-[600px] xl:w-[900vh] xl:h-[ุ600px]"
              />

              <div className="row mx-0 mt-3 mb-4" style={{ cursor: "pointer" }}>
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.url}
                    className={`img-thumbnail rounded h-[60px] w-[83px] mx-[2px] md:h-24 md:w-40 ${isActive(
                      index
                    )}`}
                    // style={{height: '60px', width: '80px'}}
                    onClick={() => setTab(index)}
                  />
                ))}
                
              </div>
              
            </div>

            <div className=" mx-3 sm:mx-2 md:mx-3 xl:mx-5 mt-1 mb-4">
              <div className=" mx-1 my-2.5">
                {/* <h1 className="text-capitalize font-bold text-2xl font-serif ">{product.en}</h1>
                <h2 className="text font-light text-xl ">{product.title}</h2> */}
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <p className="my-2 font-bold text-sm md:text-lg">ยี่ห้อ : </p>
                    <p className="my-2 ml-[8px] text-sm md:text-lg">{product.brand}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="my-2 font-bold text-sm md:text-lg">รุ่น : </p>
                    <p className="my-2 ml-[8px] text-sm md:text-lg">{product.modelName}</p>
                  </div>
                </div>
                <div className="flex flex-col">
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
                    <p className="my-2 ml-[8px] text-sm md:text-lg">{product.roomen}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="my-2 font-bold text-sm md:text-lg">ผู้ดูแลเครื่องมือ : </p>
                    <p className="my-2 ml-[8px] text-sm md:text-lg">{product.manager}</p>
                  </div>
                  <p className="my-2 font-bold text-sm md:text-lg">รายละเอียดเครื่องมือ :</p>
                </div>
                <div className="grid gap-4 grid-cols-2 grid-flow-col">
                  <div>
                    <p className="font-semibold text-sm md:text-lg">ความสามารถของเครื่องมือ</p>
                    <p className="text-sm md:text-lg">{product.detailCapability }</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-lg">ข้อจำกัดของเครื่องมือ</p>
                    <p className="text-sm md:text-lg">{product.detailRestrictions}</p>
                  </div>
                </div>

                <br />
              </div>
              <div className=" flex justify-end items-end font-bold">โพสต์เมื่อ {ConvertDate(product.createdAt)} น.</div>
            </div>
          </div>
        </div>

        <div className="text-xl sm:text-lg mx-7 xl:mx-22 mt-8 mb-3 ">
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

        <p className="text-sm xl:text-base mx-7 xl:mx-22 mt-3">
          หมายเหตุ : เฉพาะเจ้าหน้าที่ทดสอบ ติดต่อสอบถามโดยตรงกับเจ้าหน้าที่
        </p>

        <div className="flex justify-center xl:justify-end md:justify-end mt-3 md:mr-5 xl:mr-5">
          <button
            type="button"
            className=" rounded-xl bg-green-700 text-white border-2 px-2 py-1 text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3"
          >
            จองเข้าใช้เครื่องมือ
          </button>

          <button
            type="button"
            className=" rounded-xl bg-indigo-900 text-white border-2 px-2 py-1 text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3"
          >
            ติดต่อขอรับบริการ
          </button>

          {toggler ? (
            <button
              type="button"
              onClick={handleSubmit}
              className=" flex items-center rounded-xl bg-[#f6f6f6] text-black border-2 px-2 py-1 text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3"
            >
              {" "}
              <BsHeart className="mr-2" />
              เพิ่มรายการโปรด
            </button>
          ) : (
            <button
              type="button"
              // data-toggle="modal" data-target="#exampleModal"
              onClick={handleRemove}
              className=" flex items-center rounded-xl bg-[#f6f6f6] text-black border-2 px-2 py-1 text-sm sm:text-sm md:text-base mr-1 md:mr-2 xl:mr-3"
            >
              {" "}
              <BsHeartFill color="fe4141" className="mr-2" />
              เพิ่มแล้ว
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
