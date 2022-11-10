import Head from "next/head";
import { useContext } from "react";
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
import BaseCard from "../../src/components/baseCard/BaseCard";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth, modal } = state;

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
        <div className="bg-black p-2 md:p-3 xl:p-5 rounded-md">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <Table
              aria-label="simple table"
              sx={{
                mt: 2,
                whiteSpace: "nowrap",
              }}
            >
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
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.name}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "600",
                            }}
                          >
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
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "600",
                            }}
                          >
                            {user.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    {/* <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user.pname}
                </Typography>
              </TableCell> */}
                    <TableCell>
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
                            <i
                              aria-hidden="true"
                              className="fas fa-check text-success"
                            >
                              {" "}
                              Root
                            </i>
                          ) : (
                            <i
                              aria-hidden="true"
                              className="fas fa-check text-success"
                            ></i>
                          )
                        ) : (
                          <i
                            aria-hidden="true"
                            className="fas fa-times text-danger"
                          ></i>
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
                              auth.user.root && auth.user.email !== user.email
                                ? `/edit_user/${user._id}`
                                : "#!"
                            }
                          >
                            <a>
                              <i
                                aria-hidden="true"
                                className="fas fa-edit text-info mr-2"
                                title="Edit"
                              ></i>
                            </a>
                          </Link>

                          {auth.user.root && auth.user.email !== user.email ? (
                            // <i
                            //   aria-hidden="true"
                            //   className="fas fa-trash-alt text-danger ml-2"
                            //   title="Remove"
                            //   data-toggle="modal"
                            //   data-target="#exampleModal"
                            //   onClick={() =>
                            //     dispatch({
                            //       type: "ADD_MODAL",
                            //       payload: [
                            //         {
                            //           data: users,
                            //           id: user._id,
                            //           title: user.name,
                            //           type: "ADD_USERS",
                            //         },
                            //       ],
                            //     })
                            //   }
                            // ></i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
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
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          ) : (
                            // <i
                            // aria-hidden="true"
                            //   className="fas fa-trash-alt text-danger ml-2"
                            //   title="Remove"
                            // ></i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          )}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Users;
