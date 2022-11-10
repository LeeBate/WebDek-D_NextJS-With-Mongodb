import React from "react";
import FeatherIcon from "feather-icons-react";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
const ProfileDD = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "ออกจากระบบ!" } });
    return router.push("/");
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          {Object.keys(auth).length !== 0 ? (
            <img
              src={auth.user.avatar}
              width="30"
              height="30"
              className="roundedCircle"
            />
          ) : (
            <img
              src={
                "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
              }
              width="30"
              height="30"
              className="roundedCircle"
            />
          )}

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="white"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              สวัสดี,
            </Typography>
            <Typography
            color="white"
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {Object.keys(auth).length !== 0 ? (
                auth.user.name
              ) : (
                <p>Loading..</p>
              )}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
            
              onClick={handleClose4}
            >
              <ListItemButton href="/Admin/profile">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <ListItemText primary="โปรไฟล์" />
              </ListItemButton>
              {/* <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton> */}
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Button
              onClick={handleLogout}
              className="btn bg-red-600 hover:bg-red-800 shadow-md hover:shadow-lg text-white rounded-full"
              fullWidth
              variant="contained"
              color="primary"
            >
              ออกจากระบบ
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
