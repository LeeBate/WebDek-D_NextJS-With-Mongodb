import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { getData, putData, postData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { BsHeartFill,BsHeart } from "react-icons/bs";
import { deleteData } from '../../utils/fetchData'

const DetailProduct = (props,query) => {
   let  [fav,setFav] = useState()
  const [favoriteData,setFavoriteData] = useState(fav);

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
  let [tempcheck,setTemcheck] = useState([]);
  let [gg,setGg] = useState();
 
  const [checkFavExit,setcheckFavExit] = useState(tempcheck)




 useEffect(() => {
  if(tempcheck.length > 0){
    setToggler(false)
  
  }else{
    setToggler(true)
   
  }
  }, [fav,checkFavExit,tempcheck]);

  useEffect(() => {
    HandleCheckFavorite()

  },[auth,tempcheck,checkFavExit,gg])



 async function  HandleCheckFavorite(){
  if(Object.keys(auth).length !== 0){
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'
  
     fav = await getData(
    
      `favorite?limit=${page * 500}&category=${category}&sort=${sort}&title=${search}`
    )
 
    console.log("fav api",fav)

    filleredProd = []

    for (let i = 0; i <fav.favorits.length; i++) {
      if (fav.favorits[i].userid === auth.user.email) {
          filleredProd.push(fav.favorits[i]);
      }
  }

 // setFavoriteData(filleredProd)

  
  //  console.log("filleredProdFavoriteData",filleredProd)
  //  console.log("auth.user.email",auth.user.email)
   
   for (let i = 0; i <filleredProd.length; i++) {
    if (filleredProd[i].prodid === product._id) {
        tempcheck.push(filleredProd[i]);
    }

  

}
    setcheckFavExit(tempcheck)
   console.log("tempcheck=",tempcheck)
         if(tempcheck.length > 0){
  setToggler(false)

}else{
  setToggler(true)
 
}
}else{
console.log("enter else")
  setFavoriteData(props.favorite.favorits)
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
   
    
    
    dispatch({type: 'NOTIFY', payload: {loading: true}})
    deleteData(`favorite/${checkFavExit[0]._id}`, auth.token)
    .then(res => {
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
         else{
          console.log("hahahaha")
          setTemcheck([])
        HandleCheckFavorite()
        
   return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
      }
     
    })




  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    HandleCheckFavorite()
    // if()
    // setToggler(false)


    const { auth } = await state;

    if (Object.keys(auth).length === 0) 
      return dispatch({
        type: "NOTIFY",
        payload: { error: "login ด้วยไอสัส" },
      });

    if (!title || !en || !prodid || !userid || !category || !images)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields111." },
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
    HandleCheckFavorite()
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div>
      <div className="row detail_page">
        <Head>
          <title>Detail Product</title>
        </Head>
        <div className="text-capitalize font-bold text-3xl mx-[80px] my-5">
          <h1>{product.en}</h1>
          <h2 className="text font-light text-xl ">{product.title}</h2>
        </div>
        <div className="flex flex-row bg-indigo-100 mx-24 rounded-xl">
          <div className="basis-4/10 ml-3">
            <img
              src={product.images[tab].url}
              alt={product.images[tab].url}
              className="d-block img-thumbnail rounded-xl mt-4 ml-3 max-w-xl max-h-fit"
            />

            <div className="row mx-0 mb-4 mt-3" style={{ cursor: "pointer" }}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.url}
                  className={`img-thumbnail rounded ml-3 ${isActive(index)}`}
                  style={{ height: "80px", width: "20%" }}
                  onClick={() => setTab(index)}
                />
              ))}
            </div>
          </div>

          <div className="basis-6/10 mx-5 my-4">
            {/* <h1 className="text-capitalize font-bold text-2xl font-serif ">{product.en}</h1>
                <h2 className="text font-light text-xl ">{product.title}</h2> */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <p className="my-2 font-bold">ยี่ห้อ : </p>
                <p className="my-2 ml-[8px]">{product.brand}</p>
              </div>
              <div className="flex flex-row">
                <p className="my-2 font-bold">รุ่น : </p>
                <p className="my-2 ml-[8px]">{product.modelName}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <p className="my-2 font-bold">ห้องปฏิบัติการ (ภาษาไทย) : </p>
                <p className="my-2 ml-[8px]">{product.room}</p>
              </div>
              <div className="flex flex-row">
                <p className="my-2 font-bold">ห้องปฏิบัติการ (ภาษาอังกฤษ) : </p>
                <p className="my-2 ml-[8px]">{product.roomen}</p>
              </div>
              <div className="flex flex-row">
                <p className="my-2 font-bold">ผู้ดูแลเครื่องมือ : </p>
                <p className="my-2 ml-[8px]">{product.manager}</p>
              </div>
              <p className="my-2 font-bold">รายละเอียดเครื่องมือ :</p>
            </div>
            <div className="grid gap-4 grid-cols-2 grid-flow-col">
              <div>
                <p className="font-semibold">ความสามารถของเครื่องมือ</p>
                <p>{product.detailCapability}</p>
              </div>
              <div>
                <p className="font-semibold">ข้อจำกัดของเครื่องมือ</p>
                <p>{product.detailRestrictions}</p>
              </div>
            </div>

            <br />
          </div>
        </div>
        <div className="text-2xl mx-24 mt-14 mb-2">
          <p>อัตราค่าบริการ : บาท/ชั่วโมง (Baht / Hour)</p>
        </div>
        <div className="flex items-center w-full mx-24">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>ลำดับ</th>
                <th>รายการ</th>
                <th>
                  อัตรา1
                  <br />
                  (100%)
                </th>
                <th>
                  อัตรา2
                  <br />
                  (75%)
                </th>
                <th>
                  อัตรา3
                  <br />
                  (50%)
                </th>
                <th>
                  อัตรา4
                  <br />
                  (นักวิจัย)
                </th>
                <th>
                  อัตรา5
                  <br />
                  (บัณฑิต)
                </th>
              </tr>
            </thead>
            <tbody>
              {product.nameRate.map((obj, i) => (
                <tr key={i} className="bg-gray-50 text-center">
                  <td>
                    <span>{i + 1 || "-"}</span>
                  </td>
                  <td>
                    <span>{obj.ListName || "Unknown"}</span>
                  </td>
                  <td>
                    <span>{obj.price1 || "-"}</span>
                  </td>
                  <td>
                    <span>{obj.price2 || "-"}</span>
                  </td>
                  <td>
                    <span>{obj.price3 || "-"}</span>
                  </td>
                  <td>
                    <span>{obj.price4 || "-"}</span>
                  </td>
                  <td>
                    <span>{obj.price5 || "-"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mb-5  justify-between items-center">
        <p className="ml-[80px]">
          หมายเหตุ : เฉพาะเจ้าหน้าที่ทดสอบ ติดต่อสอบถามโดยตรงกับเจ้าหน้าที่
        </p>
        <div className="mr-[72px]">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-indigo-900 text-white border-2 mr-2 ml-[265px]"
          >
            ติดต่อขอรับบริการ
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-green-700 text-white border-2 mr-2"
          >
            จองเข้าใช้เครื่องมือ
          </button>
          { 
           toggler 
           ?
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center px-3 py-2 rounded-xl bg-[#f6f6f6] text-black border-2 "> <BsHeart className="mr-2"/>เพิ่มรายการ</button>
           :
           <button
            type="button"
            // data-toggle="modal" data-target="#exampleModal"
            onClick={handleRemove}
            className="flex items-center px-3 py-2 rounded-xl bg-[#f6f6f6] text-black border-2 "> <BsHeartFill color="fe4141" className="mr-2"/>เพิ่มแล้ว</button>
          }
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id  } ,query }) {
  const res = await getData(`product/${id}`);

  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const resfav = await getData(
    
    `favorite?limit=${page * 500}&category=${category}&sort=${sort}&title=${search}`
  )
  
    // server side rendering
console.log(resfav)
  return {
    props: { product: res.product ,  result: resfav.result ,favorite: resfav }
    
    // will be passed to the page component as props
  };

}

export default DetailProduct;