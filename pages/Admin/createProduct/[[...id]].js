import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imageUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import FullLayout from "../../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../src/theme/theme";
import ProductItem from '../../../components/product/ProductItem'
import filterSearch from '../../../utils/filterSearch'
import Filter from '../../../components/Filter'


import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const ProductsManager = (props) => {
  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  const initialState = {
    title: "",
    en: "",
    brand: "",
    modelName: "",
    room: "",
    roomen: "",
    manager: "",
    detailCapability: "",
    detailRestrictions: "",
    category: "",
  };

  const [product, setProduct] = useState(initialState);
  const {
    title,
    en,
    brand,
    modelName,
    room,
    roomen,
    manager,
    detailCapability,
    detailRestrictions,
    category,
  } = product;

  //machinery
  const [machinery, setMachinery] = useState(props.products)
  
  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setMachinery(props.products)
  },[props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleCheck = (id) => {
    machinery.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setMachinery([...machinery])
  }

  const handleCheckALL = () => {
    machinery.forEach(product => product.checked = !isCheck)
    setMachinery([...machinery])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    machinery.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            title: 'ลบ?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }
  //end machinery

  

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
        setInputFields(res.product.nameRate);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 2024 * 2024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (
      !title ||
      !en ||
      !brand ||
      !modelName ||
      !room ||
      !roomen ||
      !manager ||
      !detailCapability ||
      !detailRestrictions ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields111." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        {
          ...product,
          nameRate: [...inputFields],
          images: [...imgOldURL, ...media],
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        {
          ...product,
          nameRate: [...inputFields],
          images: [...imgOldURL, ...media],
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const [inputFields, setInputFields] = useState([
    {
      idx: uuidv4(),
      ListName: "",
      price1: "",
      price2: "",
      price3: "",
      price4: "",
      price5: "",
    },
  ]);

  const handleChangeInput2 = async (idx, event) => {
    const newInputFields = inputFields.map((i) => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        idx: uuidv4(),
        ListName: "",
        price1: "",
        price2: "",
        price3: "",
        price4: "",
        price5: "",
      },
    ]);
  };

  const handleRemoveFields = (idx) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.idx === idx),
      1
    );
    setInputFields(values);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
          Nav {
            display: none;
          }
        `}</style>
        <FullLayout>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Add Machinery</Tab>
              <Tab>Edit Machinery</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Head>
                  <title>การจัดการเครื่องมือ</title>
                </Head>
                <div className="products_manager">
                  <section className="bg-white">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
                        การจัดการเครื่องมือ
                      </h2>
                      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                        ไม่รู้จะใส่อะไร เผื่ออยากใส่
                      </p>
                      <form
                        method="post"
                        onSubmit={handleSubmit}
                        className="space-y-8"
                      >
                        <div className="flex flex-row">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              ชื่อเครื่องมือ (ภาษาไทย)
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={title}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-[335px] p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="ชื่อเครื่องมือ (ภาษาไทย)"
                              required
                            />
                          </div>

                          <div className="ml-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              ชื่อเครื่องมือ (ภาษาอังกฤษ)
                            </label>
                            <input
                              type="text"
                              name="en"
                              value={en}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-[335px] p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="ชื่อเครื่องมือ (ภาษาอังกฤษ)"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              ชื่อห้องปฎิบัติการ (ภาษาไทย)
                            </label>
                            <input
                              type="text"
                              name="room"
                              value={room}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-[335px] p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="ชื่อห้องปฎิบัติการ (ภาษาไทย)"
                              required
                            />
                          </div>
                          <div className="ml-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              ชื่อห้องปฎิบัติการ (ภาษาอังกฤษ)
                            </label>
                            <input
                              type="text"
                              name="roomen"
                              value={roomen}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-[335px] p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="ชื่อห้องปฎิบัติการ (ภาษาอังกฤษ)"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                            ชื่อผู้ดูแลเครื่องมือ
                          </label>
                          <input
                            type="text"
                            name="manager"
                            value={manager}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                            onChange={handleChangeInput}
                            placeholder="ชื่อผู้ดูแลเครื่องมือ"
                            required
                          />
                        </div>

                        <div className="flex flex-row">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              ยี่ห้อ
                            </label>
                            <input
                              type="text"
                              name="modelName"
                              value={modelName}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-[335px] p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="ยี่ห้อ"
                              required
                            />
                          </div>
                          <div className="ml-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                              รุ่น
                            </label>
                            <input
                              type="text"
                              name="brand"
                              value={brand}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-[335px] p-2.5 "
                              onChange={handleChangeInput}
                              placeholder="รุ่น"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="message"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                            >
                              ความสามารถของเครื่องมือ
                            </label>
                            <textarea
                              rows="6"
                              className="block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border 
              border-gray-300 focus:ring-primary-500 focus:border-primary-500 w-[335px]"
                              placeholder="ความสามารถของเครื่องมือ"
                              required
                              onChange={handleChangeInput}
                              name="detailCapability"
                              value={detailCapability}
                            ></textarea>
                          </div>

                          <div className="sm:col-span-2 ml-5">
                            <label
                              htmlFor="message"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                            >
                              ข้อจำกัดเครื่องมือ
                            </label>
                            <textarea
                              rows="6"
                              className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border 
              border-gray-300 focus:ring-primary-500 focus:border-primary-500 w-[335px]"
                              placeholder="ข้อจำกัดเครื่องมือ"
                              required
                              onChange={handleChangeInput}
                              name="detailRestrictions"
                              value={detailRestrictions}
                            ></textarea>
                          </div>
                        </div>
                        <div className="mr-8"></div>
                        <label>อัตราค่าบริการ : บาท/ตัวอย่าง</label>

                        {inputFields.map((inputField) => (
                          <div key={inputField.idx} className="row g-8">
                            <div className="ml-3">
                              <div>
                                <input
                                  type="text"
                                  name="ListName"
                                  value={inputField.ListName}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                            block p-2.5 w-55"
                                  onChange={(event) =>
                                    handleChangeInput2(inputField.idx, event)
                                  }
                                  placeholder="ชื่อรายการ"
                                  required
                                />
                              </div>
                            </div>

                            <div className="ml-2">
                              <div>
                                <input
                                  type="number"
                                  name="price1"
                                  value={inputField.price1}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                            block p-2.5 w-20"
                                  onChange={(event) =>
                                    handleChangeInput2(inputField.idx, event)
                                  }
                                  placeholder="อัตราที่ 1"
                                  required
                                />
                              </div>
                            </div>

                            <div className="ml-2">
                              <div>
                                <input
                                  type="number"
                                  name="price2"
                                  value={inputField.price2}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                            block p-2.5 w-20"
                                  onChange={(event) =>
                                    handleChangeInput2(inputField.idx, event)
                                  }
                                  placeholder="อัตราที่ 2"
                                  required
                                />
                              </div>
                            </div>

                            <div className="ml-2">
                              <div>
                                <input
                                  type="number"
                                  name="price3"
                                  value={inputField.price3}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                            block p-2.5 w-20"
                                  onChange={(event) =>
                                    handleChangeInput2(inputField.idx, event)
                                  }
                                  placeholder="อัตราที่ 3"
                                  required
                                />
                              </div>
                            </div>

                            <div className="ml-2">
                              <div>
                                <input
                                  type="number"
                                  name="price4"
                                  value={inputField.price4}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                            block p-2.5 w-20"
                                  onChange={(event) =>
                                    handleChangeInput2(inputField.idx, event)
                                  }
                                  placeholder="อัตราที่ 4"
                                  required
                                />
                              </div>
                            </div>

                            <div className="ml-2">
                              <div>
                                <input
                                  type="number"
                                  name="price5"
                                  value={inputField.price5}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                            block p-2.5 w-20"
                                  onChange={(event) =>
                                    handleChangeInput2(inputField.idx, event)
                                  }
                                  placeholder="อัตราที่ 5"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <button
                                className="w-20 h-[41px] ml-3 rounded-sm bg-red-400 text-white "
                                disabled={inputFields.length === 1}
                                onClick={() =>
                                  handleRemoveFields(inputField.idx)
                                }
                              >
                                ลบช่อง
                              </button>
                            </div>
                          </div>
                        ))}

                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 "
                        ></label>
                        <select
                          id="category"
                          onChange={handleChangeInput}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          name="category"
                          value={category}
                        >
                          <option value="all">งานเครื่องมือทั้งหมด</option>
                          {categories.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>

                        <div
                          className="flex justify-center items-center w-full"
                          hidden={images.length > 0 ? true : false}
                        >
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 
                                border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 
                                dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                              <svg
                                aria-hidden="true"
                                className="mb-3 w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  คลิกเพื่ออัพโหลด
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                รองรับ PNG หรือ JPG (สูงสุด. 2024x2024px)
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              onChange={handleUploadInput}
                              accept="image/*"
                              multiple
                            />
                          </label>
                        </div>
                        <div className="row img-up mx-0">
                          {images.map((img, index) => (
                            <div key={index} className="file_img my-1">
                              <img
                                src={
                                  img.url ? img.url : URL.createObjectURL(img)
                                }
                                alt=""
                                className="img-thumbnail rounded"
                              />

                              <span onClick={() => deleteImage(index)}>X</span>
                            </div>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="shadow-sm bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 
          hover:border-green-500 rounded block w-full p-2.5 "
                        >
                          {onEdit ? "อัพเดต" : "สร้าง"}
                        </button>
                      </form>

                      <button
                        className="btn btn-info w-full mt-5"
                        onClick={handleAddFields}
                      >
                        เพิ่มช่อง
                      </button>
                    </div>
                  </section>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="products_manager">
                  <section className="bg-white">
                  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                  <Filter state={state} />

{
  auth.user && auth.user.role === 'admin' &&
  <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>
    <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
    style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />

    <button className="btn btn-danger ml-2"
    data-toggle="modal" data-target="#exampleModal"
    onClick={handleDeleteAll}>
      ลบข้อมูลทั้งหมด
    </button>
  </div>
}

<div className="products">
  {
    machinery.length === 0 
    ? <h2>ไม่มีข้อมูลเครื่องมือวิทยาศาสตร์</h2>

    : machinery.map(product => (
      <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
    ))
  }
</div>

{
  props.result < page * 6 ? ""
  : <button className="btn btn-outline-info d-block mx-auto mb-4"
  onClick={handleLoadmore}>
    Load more
  </button>
}
                  </div>
                  </section>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default ProductsManager;
