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
    <div className="col-md-8 mt-48">
        <Head><title>CALLLAB</title></Head>
        <h3 className="">Payment</h3>

        <div className="my-3 table-responsive">
          <table
            className="table-bordered table-hover w-100 text-uppercase"
            style={{ minWidth: "600px", cursor: "pointer" }}
          >
            <thead className="bg-light font-weight-bold">
              <tr>
                <td className="p-2">ID</td>
                <td className="p-2">วันที่</td>
                <td className="p-2">จำนวนเงิน</td>
                <td className="p-2">การอนุมัติการจอง</td>
                <td className="p-2">การชำระเงิน</td>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-2">
                    <Link href={`/order/${order._id}`}>
                      <a>{order._id}</a>
                    </Link>
                  </td>
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
      </div>
  )
}
