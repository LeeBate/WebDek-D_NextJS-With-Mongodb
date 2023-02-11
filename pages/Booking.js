import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import React from "react";
import { getData } from "../utils/fetchData";
import FavoriteItem from "../components/product/BookingItem";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import Filter from "../components/Filter";
import Link from "next/link";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const Favorite = (props) => {
  const [products, setProducts] = useState(props.products);
  const [products1, setProducts1] = useState(props.booking);

  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let filleredProd = [];
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;

  console.log("orders", orders);
  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      for (let i = 0; i < props.booking.length; i++) {
        if (props.booking[i].userid === auth.user.email) {
          filleredProd.push(props.booking[i]);
        }
      }
      setProducts1(filleredProd);

      delay();

      //  console.log("filleredProd",filleredProd)
      //  console.log("auth.user.email",auth.user.email)
      //   console.log("products1.userid",products.userid)
      //   console.log("props.products",props.products)
    } else {
      //setLoading(false)
      setProducts1(props.booking);
    }
  }, [props.booking]);

  console.log("book", products1);

  const delay = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>CALLLAB</title>
      </Head>
      <div class="container px-5 mt-24 mb-48 mx-auto">
       

        
      <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">
                การชำระเงิน
              </h1>
         
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">เครื่องมือ</TableCell>
                  <TableCell align="center">เครื่องมือ</TableCell>
                  <TableCell align="center">ชื่อ-นามสกุล</TableCell>
                  <TableCell align="center">รหัสนักศึกษา</TableCell>
                  <TableCell align="center">วันที่เริ่ม-สิ้นสุด</TableCell>
                  <TableCell align="center">จำนวนเงิน</TableCell>
                  <TableCell align="center">การอนุมัติการจอง</TableCell>
                  <TableCell align="center">การชำระเงิน</TableCell>
                  <TableCell align="center">การจัดการ</TableCell>
                </TableRow>
              </TableHead>
              {orders.length === 0 ? (
                <div className="alert alert-warning my-auto">
                  <div>
                    <div className="swap-off">
                      😭 <span>ไม่พบข้อมูล! โปรดค้นหาใหม่อีกครั้ง</span>
                    </div>
                  </div>
                </div>
              ) : (
                orders
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
                              className="rounded-full w-[60px] h-[60px] cursor-pointer  "
                              src={product.images}
                              alt={product.title}
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
                          {product.studentID}
                        </TableCell>
                        <TableCell align="center" key={product.id}>
                          {new Date( product.calendarData[0].start).toLocaleString()} -{" "}
                          {new Date(product.calendarData[0].end).toLocaleString()}
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
                        {product.paid ? (
                          <TableCell align="center">
                            <Link href={`/order/${product._id}`}>
                              <a className="btn btn-info">ชำระเงินเรียบร้อย</a>
                            </Link>
                          </TableCell>
                        ) : (
                          <TableCell align="center">
                            <Link href={`/order/${product._id}`}>
                              <a className="btn btn-danger">ชำระเงิน</a>
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
        </div>
     
      </ThemeProvider>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res1 = await getData(
    `bookingApi?limit=${
      page * 500
    }&category=${category}&sort=${sort}&title=${search}`
  );

  //   const res = await getData(
  //     `favorite?limit=${
  //       page * 500
  //     }&category=${category}&sort=${sort}&title=${search}`
  //   );
  // server side rendering
  return {
    props: {
      //   products: res.favorits,
      //   result: res.result,
      booking: res1.booking,
    }, // will be passed to the page component as props
  };
}

export default Favorite;
