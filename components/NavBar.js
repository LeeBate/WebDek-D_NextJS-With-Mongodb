import { useState } from "react";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import Image from "next/image";
import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'

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

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const navigation = [
    { name: 'เครื่องมือวิทยาศาสตร์', href: '#', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    // <div>
    //   <nav className="w-full bg-indigo-900 bg-opacity-100 shadow">
    //     <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
    //       <div>
    //         <div className="flex items-center justify-between py-3 md:py-5 md:block">
    //           <a href="/">
    //             <img
    //               src={"/images/callab2.png"}
    //               className="rounded cursor-pointer"
    //               width={150}
    //               height={51.95}
    //             />
    //           </a>
    //           <div className="md:hidden">
    //             <button
    //               className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
    //               onClick={() => setNavbar(!navbar)}
    //             >
    //               {navbar ? (
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="w-6 h-6 text-white"
    //                   viewBox="0 0 20 20"
    //                   fill="currentColor"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //               ) : (
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="w-6 h-6 text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                   strokeWidth={2}
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M4 6h16M4 12h16M4 18h16"
    //                   />
    //                 </svg>
    //               )}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <div
    //           className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
    //             navbar ? "block" : "hidden"
    //           }`}
    //         >
    //           <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
    //             <li className="text-white hover:underline">
    //               <Link href="/machinery">
    //                 <a>เครื่องมือวิเคราะห์</a>
    //               </Link>
    //             </li>
    //             <li className="text-white hover:underline">
    //               <Link href="#">
    //                 <a>บริการวิเคราะห์ทดสอบ</a>
    //               </Link>
    //             </li>
    //             <li className="text-white hover:underline">
    //               <Link href="#">
    //                 <a>ติดตามผลการวิเคราะห์ทดสอบ</a>
    //               </Link>
    //             </li>
    //             <li className="text-white hover:underline">
    //               <div
    //                 className="nav-link dropdown-toggle  "
    //                 href="#"
    //                 id="navbarDropdownMenuLink"
    //                 data-toggle="dropdown"
    //                 aria-haspopup="true"
    //                 aria-expanded="false"
    //               >
    //                 <a className="text-white cursor-pointer no-underline">
    //                   เกี่ยวกับเรา
    //                 </a>
    //               </div>

    //               <div
    //                 className="dropdown-menu"
    //                 aria-labelledby="navbarDropdownMenuLink"
    //               >
    //                 <Link href="/Inform">
    //                   <a className="dropdown-item">ข่าวประชาสัมพันธ์</a>
    //                 </Link>
    //                 <div className="dropdown-divider"></div>
    //                 <Link href="/profile">
    //                   <a className="dropdown-item">บุคลากร</a>
    //                 </Link>
    //                 <div className="dropdown-divider"></div>
    //                 <Link href="/contactemail">
    //                   <a className="dropdown-item">ติดต่อเรา</a>
    //                 </Link>
    //               </div>
    //             </li>

    //             <div className="hidden md:block text-white">|</div>
    //             <ul className="text-white hover:underline">
    //               {Object.keys(auth).length === 0 ? (
    //                 <li className="nav-item">
    //                   <Link href="/signin">
    //                     <a className={"nav-link" + isActive("/signin")}>
    //                       <i className="fas fa-user" aria-hidden="true"></i>{" "}
    //                       เข้าสู่ระบบ
    //                     </a>
    //                   </Link>
    //                 </li>
    //               ) : (
    //                 loggedRouter()
    //               )}
    //             </ul>
    //             <Link href={"/"}>
    //               <a>
    //                 <Image
    //                   src={"/images/en.png"}
    //                   className="rounded"
    //                   width={26}
    //                   height={26}
    //                 />
    //               </a>
    //             </Link>
    //             <Link href={"/"}>
    //               <a>
    //                 <Image
    //                   src={"/images/th.png"}
    //                   className="rounded"
    //                   width={30}
    //                   height={30}
    //                 />
    //               </a>
    //             </Link>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    //   <div className="flex justify-center items-center "></div>
    // </div>
    <>
    <div className="min-h-full">
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
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
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
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
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user.name}</div>
                  <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
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
