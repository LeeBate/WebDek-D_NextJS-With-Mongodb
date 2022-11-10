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
      <div className ="overflow-x-auto relative shadow-md sm:rounded-lg">
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
            <TableCell >
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
              <TableCell >
                <Typography variant="h6">{user.role === "admin" ? (
                      user.root ? (
                        <i aria-hidden="true" className="fas fa-check text-success"> Root</i>
                      ) : (
                        <i aria-hidden="true" className="fas fa-check text-success"></i>
                      )
                    ) : (
                      <i aria-hidden="true" className="fas fa-times text-danger"></i>
                    )}</Typography>
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
                      <i
                      aria-hidden="true"
                        className="fas fa-trash-alt text-danger ml-2"
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
                      ></i>
                    ) : (
                      <i
                      aria-hidden="true"
                        className="fas fa-trash-alt text-danger ml-2"
                        title="Remove"
                      ></i>
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