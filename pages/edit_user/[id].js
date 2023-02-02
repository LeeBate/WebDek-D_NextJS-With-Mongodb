import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";

import { useRouter } from "next/router";
import { patchData } from "../../utils/fetchData";

import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  const handleSubmit = () => {
    let role = checkAdmin ? "admin" : "user";
    if (num % 2 !== 0) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch(
          updateItem(
            users,
            editUser._id,
            {
              ...editUser,
              role,
            },
            "ADD_USERS"
          )
        );

        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
    }
  };

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
        <FullLayout>
      <Head>
        <title>แก้ไขผู้ใช้</title>
      </Head>
        <div className="container py-0 h-100">
          <div className="d-flex justify-center items h-100">
            <div className="col col-xl-9 col-lg-8 ">
          <button className="btn btn-dark" onClick={() => router.back()}>
            <i className="fas fa-long-arrow-alt-left" aria-hidden></i> ย้อนกลับ
          </button>
              <div className="card rounded-[1rem] mt-5">
                <div className=" items-center pl-4 py-4">
                  <div className="text-start p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1 ">
                        <span className="h1 font-bold mb-0">แก้ไขผู้ใช้</span>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          ชื่อผู้ใช้
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          defaultValue={editUser.name}
                          disabled
                        ></input>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          อีเมล์ผู้ใช้
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          defaultValue={editUser.email}
                          disabled
                        ></input>
                      </div>
                      <div className="form-group">
                        <input
                          type="checkbox"
                          id="isAdmin"
                          checked={checkAdmin}
                          style={{ width: "20px", height: "20px" }}
                          onChange={handleCheck}
                        />

                        <label
                          htmlFor="isAdmin"
                          style={{ transform: "translate(4px, -3px)" }}
                        >
                          แอดมิน
                        </label>
                      </div>
                    </form>
                    <div className="pt-1 mb-4">
                      <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-[#0070BB] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#208BD4] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={handleSubmit}
                      >
                        อัพเดต
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </FullLayout>
    </ThemeProvider>
  );
};

export default EditUser;
