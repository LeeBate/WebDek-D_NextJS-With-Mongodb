import React from 'react'
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";

import { getData } from "../../../utils/fetchData";
import FavoriteItem from "../../../components/product/BookingItem";
import filterSearch from "../../../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../../../components/Filter";
import Link from "next/link";

export default function DataBookings() {
    const router = useRouter();
    const { state, dispatch } = useContext(DataContext);
    const { auth, notify, orders } = state;
  return (
    <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-24 mx-auto">
        <Head><title>CALLLAB</title></Head>
 <disv class="lg:w-2/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            การชำระเงิน
            </h1>
        <div className="my-3 table-responsive">
          <table
            className="table-bordered table-hover w-100 text-uppercase"
            style={{ minWidth: "600px", cursor: "pointer" }}
          >
            <thead className="bg-light font-weight-bold text-center">
              <tr>
                <td className="p-2">ID</td>
                <td className="p-2">ชื่อเครื่องมือ</td>
                <td className="p-2">วันที่ชำระเงิน</td>
                <td className="p-2">จำนวนเงิน</td>
                <td className="p-2">การอนุมัติการจอง</td>
                <td className="p-2">การชำระเงิน</td>
              </tr>
            </thead>

            <tbody className=" text-center">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-2 flex justify-center items-center">
                    <Link href={`/order/${order._id}`}>
                     <img className=" rounded-full  w-[60px] h-[60px]" src={order.images}/>
                    </Link>
                  </td>
                  <td className="p-2">{order.title}</td>
                  <td className="p-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">${order.total}</td>
                  <td className="p-2">
                    {order.delivered ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  <td className="p-2">
                    {order.paid ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <a className="btn btn-info">อนุมัติการจอง</a>
                      </Link>
                    </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </disv>
      </div>
    </section>
  )
}
