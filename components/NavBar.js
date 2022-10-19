import { useState, useEffect } from "react";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import Image from "next/image";
import { useTheme } from "next-themes";
import Button from "../components/Button";

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [navbar, setNavbar] = useState(false);

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    // dispatch({ type: 'NOTIFY', payload: {success: 'ออกจากระบบ!'} })
    return router.push("/");
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/Admin">
          <a className="dropdown-item">Dashboard</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle "
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              transform: "translateY(-3px)",
              marginLeft: "30px",
            }}
          />

          {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile">
            <a className="dropdown-item">โปรไฟล์</a>
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            ออกระบบ
          </button>
        </div>
      </li>
    );
  };

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if(!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    if(currentTheme === 'dark') {
      return (
        <Button className="bg-gray-200 dark:bg-gray-600"
          onClick={() => setTheme('light')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        </Button>
      )
    } else {
      return (
        <Button className="bg-gray-200"
          onClick={() => setTheme('dark')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </Button>
      )
    }

  }

  return (
    <div>
      <nav className="w-full bg-brand-bar shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 ">
              <a href="/">
                <img
                  src={"/images/callab2.png"}
                  className="rounded cursor-pointer"
                  width={150}
                  height={51.95}
                />
              </a>
              <div className="lg:hidden  md:pl-[700px] ">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 lg:block 2 lg:px-0 2 lg:py-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:underline">
                  <Link href="/machinery">
                    <a>เครื่องมือวิเคราะห์</a>
                  </Link>
                </li>
                <li className="text-white hover:underline">
                  <Link href="#">
                    <a>บริการวิเคราะห์ทดสอบ</a>
                  </Link>
                </li>
                <li className="text-white hover:underline">
                  <Link href="#">
                    <a>ติดตามผลการวิเคราะห์ทดสอบ</a>
                  </Link>
                </li>
                <li className="text-white hover:underline">
                  <div
                    className="nav-link dropdown-toggle  "
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <a className="text-white cursor-pointer no-underline">
                      เกี่ยวกับเรา
                    </a>
                  </div>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link href="/Inform">
                      <a className="dropdown-item">ข่าวประชาสัมพันธ์</a>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link href="/profile">
                      <a className="dropdown-item">บุคลากร</a>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link href="/contactemail">
                      <a className="dropdown-item">ติดต่อเรา</a>
                    </Link>
                  </div>
                </li>

                <div className="hidden md:block text-white">|</div>
                <ul className="text-white hover:underline">
                  {Object.keys(auth).length === 0 ? (
                    <li className="nav-item">
                      <Link href="/signin">
                        <a className={"nav-link" + isActive("/signin")}>
                          <i className="fas fa-user" aria-hidden="true"></i>{" "}
                          เข้าสู่ระบบ
                        </a>
                      </Link>
                    </li>
                  ) : (
                    loggedRouter()
                  )}
                </ul>
                <Link href={"/"}>
                  <a>
                    <Image
                      src={"/images/en.png"}
                      className="rounded"
                      width={26}
                      height={26}
                    />
                  </a>
                </Link>
                <Link href={"/"}>
                  <a>
                    <Image
                      src={"/images/th.png"}
                      className="rounded"
                      width={30}
                      height={30}
                    />
                  </a>
                </Link>
                {renderThemeChanger()}
              </ul>
            </div>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default NavBar;
