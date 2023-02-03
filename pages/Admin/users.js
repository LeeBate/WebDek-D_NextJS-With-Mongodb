import Head from "next/head";
import { useContext } from "react";
import * as React from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { BsTrash } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import sortBy from "sort-by";

import Paper from "@mui/material/Paper";

import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const {users, auth, modal } = state;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <Head>
        <title>CALLLAB</title>
      </Head>
      <FullLayout>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Id
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Avatar
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Admin
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary" variant="h6">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {users.length === 0 ? (
                <TableBody className="alert alert-warning my-auto">
                  <TableRow>
                    <TableCell className="swap-off">
                      😭 <span className=" underline decoration-red-800">กำลังโหลดข้อมูลโปรดรอสักครู่</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                users
                .sort(sortBy("role")).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableBody key={user._id}>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell key={user.id}>
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell key={user.id}>
                          <img
                            src={user.avatar}
                            alt={user.avatar}
                            style={{
                              width: "30px",
                              height: "30px",
                              overflow: "hidden",
                              objectFit: "cover",
                            }}
                          />
                        </TableCell>
                        <TableCell key={user.id}>{user.name}</TableCell>
                        <TableCell key={user.id}>
                          <Chip
                            sx={{
                              pl: "4px",
                              pr: "4px",
                              backgroundColor: "#1a237e",
                              color: "#fff",
                            }}
                            size="small"
                            label={user.email}
                          ></Chip>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            {user.role === "admin" ? (
                              user.root ? (
                                <p className="flex">
                                  <AiOutlineCheck className="fas text-green-700 w-6 h-6 mr-2"></AiOutlineCheck>{" "}
                                  Root
                                </p>
                              ) : (
                                <AiOutlineCheck className="fas text-green-700 w-6 h-6 mr-2"></AiOutlineCheck>
                              )
                            ) : (
                              <GrFormClose className="fas text-red-700 w-6 h-6 mr-2"></GrFormClose>
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" className="cursor-pointer">
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "600",
                              }}
                            >
                              <Link
                                href={
                                  auth.user.root &&
                                  auth.user.email !== user.email
                                    ? `/edit_user/${user._id}`
                                    : "#!"
                                }
                              >
                                <MdEditNote className="fas text-info mr-2 w-8 h-8" />
                              </Link>

                              {auth.user.root &&
                              auth.user.email !== user.email ? (
                                <BsTrash
                                  className="fas text-danger ml-2  w-6 h-6"
                                  title="Remove"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  onClick={() =>
                                    dispatch({
                                      type: "ADD_MODAL",
                                      payload: [
                                        {
                                          data: users,
                                          id: user._id,
                                          title: user.name,
                                          type: "ADD_USERS",
                                        },
                                      ],
                                    })
                                  }
                                ></BsTrash>
                              ) : (
                                <BsTrash
                                  className="fas text-danger ml-2 w-6 h-6"
                                  title="Remove"
                                ></BsTrash>
                              )}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 50, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Users;
