import React from "react";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";

import { getData } from "../../../utils/fetchData";
import FavoriteItem from "../../../components/product/BookingItem";
import filterSearch from "../../../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../../../components/Filter";
import Link from "next/link";

import FullLayout from "../../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../src/theme/theme";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import sortBy from "sort-by";

export default function DataBookings() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function ConvertDate(date) {
    const data = new Date(date).toLocaleString("th-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return data;
  }
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
      <Head>
        <title>CALLLAB</title>
      </Head>
      <FullLayout>
        
        
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">เครื่องมือ</TableCell>
                  <TableCell align="center">ชื่อเครื่องมือ</TableCell>
                  <TableCell align="center">ชื่อผู้ใช้</TableCell>
                  <TableCell align="center">วันที่ชำระเงิน</TableCell>
                  <TableCell align="center">จำนวนเงิน</TableCell>
                  <TableCell align="center">การอนุมัติการจอง</TableCell>
                  <TableCell align="center">การชำระเงิน</TableCell>
                  <TableCell align="center">การจัดการ</TableCell>
                </TableRow>
              </TableHead>
              {orders.length === 0 ? (
               <TableBody className="alert alert-warning my-auto">
               <TableRow>
                 <TableCell className="swap-off">
                   😭 <span className=" underline decoration-red-800">กำลังโหลดข้อมูลโปรดรอสักครู่</span>
                 </TableCell>
               </TableRow>
             </TableBody>
              ) : (
                orders
                  .sort(sortBy("-createdAt"))
                  
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, ict) => (
                    <TableBody key={product._id}>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center" key={product.id}>
                          {ict + 1 + page * rowsPerPage}
                        </TableCell>
                        <Link href={`/order/${product._id}`}>
                          <TableCell align="center" key={product.id}>
                            <img
                              className="rounded-full w-[60px] h-[60px] cursor-pointer"
                              src={product.images}
                            />
                            
                          </TableCell>
                        </Link>
                        <TableCell align="center" key={product.id}>
                          {product.title}
                        </TableCell>
                        <TableCell align="center" key={product.id}>
                          {product.fullname}
                        </TableCell>
                        <TableCell align="center" key={product.id}>
                          {product.dateOfPayment ? ConvertDate(product.dateOfPayment) : "ยังไม่ได้ชำระเงิน"}
                        </TableCell>
                        <TableCell align="center" key={product.id}>{product.price}฿</TableCell>
                        <TableCell align="center" key={product.id}>
                          {product.delivered ? (
                            <i className="fas fa-check text-success"></i>
                          ) : (
                            <i className="fas fa-times text-danger"></i>
                          )}
                        </TableCell>
                        <TableCell align="center" key={product.id}>
                          {product.paid ? (
                            <i className="fas fa-check text-success"></i>
                          ) : (
                            <i className="fas fa-times text-danger"></i>
                          )}
                        </TableCell>
                        {product.delivered ?? product.paid ? (
                          <TableCell align="center">
                            <Link href={`/order/${product._id}`}>
                              <p className="btn btn-info">รายละเอียดเพิ่มเติม</p>
                            </Link>
                          </TableCell>
                        ) : (
                          <TableCell align="center">
                            <Link href={`/order/${product._id}`}>
                              <p className="btn btn-danger">อนุมัติการจอง</p>
                            </Link>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  ))
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </FullLayout>
    </ThemeProvider>
  );
}
