import React, { useRef } from "react";
import { Card, CardContent, Typography, Button, Grid ,Box} from "@mui/material";
import Image from "next/image";
import user1 from "../../../assets/images/backgrounds/u2.jpg";
import BaseCard from "../baseCard/BaseCard";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../store/GlobalState";
import { useEffect } from "react";
import { getData } from "../../../utils/fetchData";

import Chart from "chart.js/auto";

const blogs = [
  {
    img: user1,
    title: "ผู้ใช้ทั้งหมด",
    btncolor: "error",
  },
];
const blogs1 = [
  {
    img: user1,
    title: "เครื่องมือวิทยาศาสตร์แต่ละประเภท",
    subtitle0: "กายภาพ 2 เครื่อง",
    subtitle1: "ดิน 20 เครื่อง",
    subtitle2: "น้ำ 200 เครื่อง",
    subtitle3: "ลม 2000 เครื่อง",
    subtitle4: "ไฟ 20000 เครื่อง",
    btncolor: "error",
  },
];
const blogs2 = [
  {
    img: user1,
    title: "ผู้ใช้งาน!",
    subtitleuser: "25 คน",
    btncolor: "error",
  },
];

const BlogCard = () => {
  const { state, dispatch } = useContext(DataContext);

  const router = useRouter();
  const query = router.query;
  const [machincount, setmachincount] = useState();
  const [cat, setcat] = useState([]);

  const [resprod, setresprod] = useState([]);

  const [allusercount, setallusercount] = useState();
  const [usercount, setusercount] = useState();
  const [admincount, setadmincount] = useState();
  let sum = 0;
  const [newscount, setnewscount] = useState();

  useEffect(() => {
    getdata(query);
    // checkCate()
    // checkCat()
  }, [state, sum]);

  async function getdata(query) {
    const page = query.page || 1;
    const category = query.category || "all";
    const sort = query.sort || "";
    const search = query.search || "all";

    const resprod = await getData(
      `product?limit=${
        page * 500
      }&category=${category}&sort=${sort}&en=${search}`
    );
    const resnews = await getData(
      `productNews?limit=${
        page * 500
      }&category=${category}&sort=${sort}&title=${search}`
    );
    setmachincount(resprod.products.length);
    console.log(resprod.products.length);
    console.log("เครื่องมือ1", resprod.products.filter(checkCat1).length);


    setresprod(resprod.products);

    setallusercount(state.users.length);
    setusercount(state.users.filter(checkUser).length);
    setadmincount(state.users.filter(checkAdmin).length);

    setnewscount(resnews.products.length);

    setcat(state.categories);
  }
  function checkUser(user) {
    return user.role == "user";
  }
  function checkAdmin(user) {
    return user.role == "admin";
  }

  function checkCat1(cat) {
    //งานวิเคราะห์ด้วยกล้องจุลทรรศน์
    return cat.category == "6332c30fef36f259682ef9ca";
  }
  function checkCat2(cat) {
    // งานวิเคราะห์ทางเคมีและชีวเคมี
    return cat.category == "633562ae0965da53b8325fbd";
  }
  function checkCat3(cat) {
    // งานวิเคราะห์ทางจุลชีววิทยา
    return cat.category == "633562b90965da53b8325fc0";
  }
  function checkCat4(cat) {
    // งานวิเคราะห์ทางกายภาพ
    return cat.category == "633562e70965da53b8325fc3";
  }
  function checkCat5(cat) {
    // งานวิเคราะห์ทางน้ำ
    return cat.category == "633563020965da53b8325fc6";
  }

  return (
    <BaseCard>
      <Grid container>
        {blogs.map((index) => (
          <Box
            key={index}
            item="true"
            xs={12}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Card
              sx={{
                p: 0,
                width: "100%",
                boxShadow: "0 2px 5px 1px #5c6bc0",
                backgroundColor: "#1a237e",
              }}
            >
              <CardContent
                sx={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingBottom: "0px",
                  color: "white",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  ผู้ใช้ทั้งหมด
                </Typography>
                <Typography
                  align="center"
                  color="white"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "400",
                  }}
                >
                  {allusercount} บัญชี
                </Typography>
                
              </CardContent>
            </Card>
          </Box>
        ))}
        {blogs2.map((index) => (
          <Box
            key={index}
            item="true"
            xs={12}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Card
              sx={{
                p: 0,
                width: "100%",
                boxShadow: "0 2px 5px 1px #5c6bc0",
                backgroundColor: "#1a237e",
              }}
            >
              <CardContent
                sx={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  color: "white",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    placeItems: "center",
                    color: "white",
                  }}
                >
                  ข่าวประชาสัมพันธ์
                </Typography>
                <Typography
                  align="center"
                  color="white"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "400",
                  }}
                >
                  {newscount} รายการ
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
        
      </Grid>
    </BaseCard>
  );
};

export default BlogCard;
