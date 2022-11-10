import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";

const Profile = () => {
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialSate);
  const { avatar, name, password, cf_password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist." },
      });

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image size is 1mb." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect." },
      });

    setData({ ...data, avatar: file });
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  
  return (
    <div className="profile_page pt-36">
      <Head>
        <title>CALLLAB</title>
      </Head>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <section className=" flex items-center justify-center  pb-36 ">
        <div className="lg:w-1/3 w-4/5">
          {/* {Object.keys(auth).length !== 0 ? (
            <h3 className="text-center text-uppercase text-2xl md:text-3xl lg:text:3xl xl:text-4xl ">
              {auth.user.role === "user" ? "โปรไฟล์" : "โปรไฟล์"}
            </h3>
          ) : (
            <h3 className="text-center text-uppercase text-2xl md:text-3xl lg:text:3xl xl:text-4xl ">
              No Profile
            </h3>
          )} */}

          <div className="avatar">
          {Object.keys(auth).length !== 0 ? (
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt="avatar"
            />
            ) : (
              <img
                src={
                  "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                }
                width="30"
                height="30"
                className="roundedCircle"
              />
            )}
            <span>
              <i aria-hidden className="fas fa-camera"></i>
              <p>เปลี่ยน</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>
          
          <div className="form-group ">
            <label htmlFor="name">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ชื่อของคุณ"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          
            <label htmlFor="email">อีเมล์</label>
            {Object.keys(auth).length !== 0 ? (
            <input
              type="text"
              name="อีมเล์"
              defaultValue={auth.user.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={true}
            />
            ) : (
              <p>Loading..</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">รหัสผ่านใหม่</label>
            <input
              type="password"
              name="password"
              value={password}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="รหัสผ่านใหม่ของคุณ"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ยืนยันรหัสผ่าน"
              onChange={handleChange}
            />
          </div>

          <button
           className=" bg-[#1a237e] hover:bg-[#FFA500] shadow-md hover:shadow-lg  rounded-full text-white w-full py-2 "
            disabled={notify.loading}
            onClick={handleUpdateProfile}
          >
            อัปเดตโปรไฟล์
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
