import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Toolbar from "@mui/material/Toolbar";

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

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
          <div className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 ">
            แดชบอร์ด
          </div>
        </Link>
      </>
    );
  };
  const adminRouterMobile = () => {
    return (
      <>
        <Link href="/Admin">
          <div className="block px-3 py-2 rounded-md text-base cursor-pointer font-medium hover:bg-gray-700 hover:text-white text-white">
            แดชบอร์ด
          </div>
        </Link>
      </>
    );
  };
  const LogoutRouter = () => {
    return (
      <>
        <Link href="/">
          <div
            className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-red-500 hover:text-gray-50 "
            onClick={handleLogout}
          >
            ออกจากระบบ
          </div>
        </Link>
      </>
    );
  };

  const LogoutRouterMobile = () => {
    return (
      <>
        <span className="sr-only">Open user menu</span>
        <Link href="/">
          <a className={isActive("/")}>
            <Disclosure.Button>
              <div
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                onClick={handleLogout}
              >
                ออกจากระบบ
              </div>
            </Disclosure.Button>
          </a>
        </Link>
      </>
    );
  };

  const navigation1 = [
    { name: "เครื่องมือวิทยาศาสตร์", href: "/machinery", current: false },
  ];
  const navigation2 = [
    { name: "บริการวิเคราะห์ทดสอบ", href: "/#services", current: false },
  ];
  const navigation3 = [
    { name: "ติดตามผลวิเคราะห์ทดสอบ", href: "#", current: false },
  ];
  const navigation4 = [{ name: "เกี่ยวกับเรา", current: false }];

  const userNavigation = [
    { name: "โปรไฟล์", href: "/profile", current: false },
    { name: "เครื่องมือที่ชอบ", href: "/favorite", current: false },
  ];
  const dropdownMenu = [
    { name: "ข่าวประชาสัมพันธ์", href: "/Inform", current: false },
    { name: "บุคลากร", href: "/about", current: false },
    { name: "ติดต่อเรา", href: "/contactemail", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const userRouter = () => {
    return (
      <>
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <a
                href={item.href}
                className={classNames(
                  active ? "bg-gray-100 w-full text-start" : "",
                  "block w-full px-4 text-start py-2 text-sm text-gray-700"
                )}
              >
                <button>{item.name}</button>
              </a>
            )}
          </Menu.Item>
        ))}
      </>
    );
  };
  const userRouterMobile = () => {
    return (
      <>
        {userNavigation.map((item) => (
          <a
            key={item.name}
            as="a"
            href={item.href}
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
          >
            <div>{item.name}</div>
          </a>
        ))}
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <Menu as="div" className="relative ml-3 ">
        <div>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-12 w-12 rounded-full"
              src={auth.user.avatar}
              alt={auth.user.avatar}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100 no-underline"
          enterFrom="transform opacity-0 scale-95 no-underline"
          enterTo="transform opacity-100 scale-100 no-underline"
          leave="transition ease-in duration-75 no-underline"
          leaveFrom="transform opacity-100 scale-100 no-underline"
          leaveTo="transform opacity-0 scale-95 no-underline"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {auth.user.role === "admin" && adminRouter()}
            {auth.user.role === "user" && userRouter()}
            {auth.user.role === "admin" && LogoutRouter()}
            {auth.user.role === "user" && LogoutRouter()}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };
  const loggedRouterMobile = () => {
    return (
      <Menu as="div" className="relative ">
        <div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center ml-4 mr-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={auth.user.avatar}
                  alt={auth.user.avatar}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {auth.user.name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {auth.user.email}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-1 px-2 pb-3">
            {auth.user.role === "admin" && adminRouterMobile()}
            {auth.user.role === "user" && userRouterMobile()}
            {auth.user.role === "admin" && LogoutRouterMobile()}
            {auth.user.role === "user" && LogoutRouterMobile()}
          </div>
        </div>
      </Menu>
    );
  };


  return (
    <>
    <header>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-[#1a237e] ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-[1620px] px-4 sm:px-6 md:px-6 lg:px-8">
                <div className="flex h-16 md:h-16 lg:h-24 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink w-auto mr-10">
                      <a href="/">
                        <img
                          className="h-16 w-full md:h-16 lg:h-24 cursor-pointer aspect-square"
                          src={"/images/LOGO.png"}
                          alt="logo"
                        />
                      </a>
                    </div>
                    <div className="hidden lg:block">
                      <div className="flex items-baseline space-x-4">
                        {navigation1.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                              ? "bg-gray-900 text-white"
                              : "text-white border-2  border-[#1a237e]  hover:border-b-[#ffffff] hover:border-2 hover:text-white",
                            "px-3 py-2  text-sm"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <button>{item.name}</button>
                          </a>
                        ))}
                        {navigation2.map((item) => (
                          <a

                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                              ? "bg-gray-900 text-white"
                              : "text-white border-2  border-[#1a237e]  hover:border-b-[#ffffff] hover:border-2 hover:text-white",
                            "px-3 py-2  text-sm"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <button>{item.name}</button>
                          </a>
                        ))}
                        {navigation3.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                              ? "bg-gray-900 text-white"
                              : "text-white border-2  border-[#1a237e]  hover:border-b-[#ffffff] hover:border-2 hover:text-white",
                            "px-3 py-2  text-sm"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <button>{item.name}</button>
                          </a>
                        ))}
                        <Menu as="div" className="relative ml-3">
                          <div>
                          <Menu.Button className="inline-flex w-full justify-center text-white border-2  border-[#1a237e]  hover:border-b-[#ffffff] hover:border-2   px-4 py-2  text-sm font-medium  focus:outline-none hover:text-white">
                              เกี่ยวกับเรา
                              <ChevronDownIcon
                                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100 no-underline"
                            enterFrom="transform opacity-0 scale-95 no-underline"
                            enterTo="transform opacity-100 scale-100 no-underline"
                            leave="transition ease-in duration-75 no-underline"
                            leaveFrom="transform opacity-100 scale-100 no-underline"
                            leaveTo="transform opacity-0 scale-95 no-underline"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {dropdownMenu.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                      )}
                                    >
                                      <button>{item.name}</button>
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <span className="sr-only">Open user menu</span>
                          {Object.keys(auth).length === 0 ? (
                            <Link href="/signin">
                              <a className={isActive("/signin")}>
                                <button className=" hover:bg-white hover:text-black text-gray-50 px-4 py-2 rounded-lg">
                                  เข้าสู่ระบบ
                                </button>
                              </a>
                            </Link>
                          ) : (
                            loggedRouter()
                          )}
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        ></Transition>
                      </Menu>
                    </div>
                  </div>

                  {/* Mobile menu button */}
                  <div className="mr-2 flex md:block lg:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation1.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-white hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <div>{item.name}</div>
                    </Disclosure.Button>
                  ))}
                  {navigation2.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-white hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <div>{item.name}</div>
                    </Disclosure.Button>
                  ))}
                  {navigation3.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-white hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <div>{item.name}</div>
                    </Disclosure.Button>
                  ))}
                  <Menu as="div" className="relative ">
                    <div>
                      <Menu.Button>
                        <span className="sr-only">Open user menu</span>
                        {navigation4.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-white hover:bg-gray-700 hover:text-white",
                              "block px-3 py-2 rounded-md text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <div>{item.name}</div>
                          </Disclosure.Button>
                        ))}
                      </Menu.Button>
                    </div>
                    <div className="mt-1 space-y-1 px-2 ">
                      {dropdownMenu.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-1 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                        >
                          <div>{item.name}</div>
                        </Disclosure.Button>
                      ))}
                    </div>
                  </Menu>
                </div>

                <div>
                  <span className="sr-only">Open user menu</span>
                  {Object.keys(auth).length === 0 ? (
                    <Link href="/signin">
                      <div className="pb-3 px-3">
                        <a className={isActive("/signin")}>
                          <Disclosure.Button>
                            <button className="hover:bg-gray-700 text-white px-1 py-2 rounded-lg">
                              เข้าสู่ระบบ
                            </button>
                          </Disclosure.Button>
                        </a>
                      </div>
                    </Link>
                  ) : (
                    loggedRouterMobile()
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
</div>
      </header>
      
    </>
  );
}

export default NavBar;
