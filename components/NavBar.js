
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";


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
          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Dashboard</a>
        </Link>
      </>
    );
  };
  const adminRouterMobile = () => {
    return (
      <>
      
        <Link href="/Admin">
          <a className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white text-white">
            Dashboard
          </a>
        </Link>
      </>
    );
  };
  const LogoutRouter = () => {
    return (
      <>
        <Link href="/">
          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
            ออกจากระบบ
          </a>
        </Link>
      </>
    );
  };
  const LogoutRouterMobile = () => {
    return (
      <>
        <Link href="/">
          <a
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
            onClick={handleLogout}
          >
            ออกจากระบบ
          </a>
        </Link>
      </>
    );
  };
  // const user = {
  //   name: "Tom Cook",
  //   email: "tom@example.com",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  // };
  // const navigation = [
  //   { name: "เครื่องมือวิทยาศาสตร์", href: "/machinery", current: false },
  //   { name: "บริการวิเคราะห์ทดสอบ", href: "#", current: false },
  //   { name: "ติดตามผล", href: "#", current: false },
  //   { name: "เกี่ยวกับเรา", current: false },
  // ];
  const navigation1 = [
    { name: "เครื่องมือวิทยาศาสตร์", href: "/machinery", current: false },
  ];
  const navigation2 = [
    { name: "บริการวิเคราะห์ทดสอบ", href: "#", current: false },
  ];
  const navigation3 = [
    { name: "ติดตามผลวิเคราะห์ทดสอบ", href: "#", current: false },
  ];
  const navigation4 = [{ name: "เกี่ยวกับเรา", current: false }];
  const userNavigation = [
    { name: "โปรไฟล์", href: "/profile" },
    { name: "เครื่องมือที่ชอบ", href: "/favorite" },
  ];
  const dropdownMenu = [
    { name: "ข่าวประชาสัมพันธ์", href: "/Inform", current: false },
    { name: "บุคลากร", href: "#", current: false },
    { name: "ติดต่อเรา", href: "/contactemail", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const loggedRouter = () => {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={auth.user.avatar}
              alt={auth.user.avatar}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {auth.user.role === "admin" && adminRouter()}
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </a>
                )}
              </Menu.Item>
            ))}
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
              <button
                type="button"
                className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-1 px-2 pb-3">
            {auth.user.role === "admin" && adminRouterMobile()}
            {userNavigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </Disclosure.Button>
            ))}

            {auth.user.role === "admin" && LogoutRouterMobile()}
            {auth.user.role === "user" && LogoutRouterMobile()}
          </div>
        </div>
      </Menu>
    );
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink w-24">
                      <a href="/">
                        <img
                          className="h-16 w-24 cursor-pointer"
                          src={"/images/CALLLAB.png"}
                          alt="logo"
                        />
                      </a>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation1.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white no-underline"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white no-underline",
                              "px-3 py-2 rounded-md text-sm font-medium no-underline"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        {navigation2.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        {navigation3.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              {navigation4.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              ))}
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
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
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
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <span className="sr-only">Open user menu</span>
                          {Object.keys(auth).length === 0 ? (
                            <Link href="/signin">
                              <a className={isActive("/signin")}>
                                <i
                                  className="fas fa-user text-white"
                                  aria-hidden="true"
                                ></i>{" "}
                                เข้าสู่ระบบ
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
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item></Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation1.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
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
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
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
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
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
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block px-3 py-2 rounded-md text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
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
                          className="block rounded-md px-3 py-1 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white "
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </Menu>
                </div>

                <div>
                  <span className="sr-only">Open user menu</span>
                  {Object.keys(auth).length === 0 ? (
                    <Link href="/signin">
                      <a className={isActive("/signin")}>
                        <i
                          className="fas fa-user text-white"
                          aria-hidden="true"
                        ></i>{" "}
                        เข้าสู่ระบบ
                      </a>
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
    </>
  );
}

export default NavBar;
