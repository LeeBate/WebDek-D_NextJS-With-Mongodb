import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imageUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import FullLayout from "../../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../src/theme/theme";

const NewsManager = () => {
  const initialState = {
    title: "",
    description: "",
  };

  const [product, setProduct] = useState(initialState);
  const { title, description } = product;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`productNews/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
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
      if (num <= 1) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 3)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "อัพโหลดได้ครั้งละ 3 รูปภาพ" },
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

    if (!title || images.length === 0 || !description)
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
        `productNews/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "productNews",
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <ThemeProvider theme={theme}>
        <style jsx global>{`
        Nav {
          display: none;
        }
        
      `}</style>
      <FullLayout>
        <div>
          <div className="products_manager">
            <Head>
              <title>การจัดการข่าวสาร</title>
            </Head>
            <section className="bg-white">
              <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
                  เพิ่มข้อมูลข่าวสาร
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                  ไม่รู้จะใส่อะไร เผื่ออยากใส่
                </p>
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                      หัวเรื่อง
                    </label>
                    <input
                      value={title}
                      type="text"
                      name="title"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 "
                      onChange={handleChangeInput}
                      placeholder="กรอกหัวเรื่อง . . . "
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                      เนื้อหา
                    </label>
                    <textarea
                      rows="6"
                      name="description"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                      placeholder="กรอกเนื้อหา . . ."
                      required
                      value={description}
                      onChange={handleChangeInput}
                    ></textarea>
                  </div>

                  <div
                    className="flex justify-center items-center w-full"
                    hidden={images.length > 3 ? true : false}
                  >
                    <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                          <span className="font-semibold">คลิกเพื่ออัพโหลด</span>
                          
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
                      />
                    </label>
                  </div>
                  <div className="row img-up mx-0">
                    {images.map((img, index) => (
                      <div key={index} className="file_img my-1">
                        <img
                          src={img.url ? img.url : URL.createObjectURL(img)}
                          alt=""
                          className="img-thumbnail rounded"
                        />

                        <span onClick={() => deleteImage(index)}>X</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="shadow-sm bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-green-500 rounded
              block w-full p-2.5 "
                  >
                    {onEdit ? "อัพเดต" : "สร้าง"}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </FullLayout>
    </ThemeProvider>
  );
};

export default NewsManager;
