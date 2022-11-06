import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
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
  const [catname1, setCatname1] = useState();
  const [catname2, setCatname2] = useState();
  const [catname3, setCatname3] = useState();
  const [catname4, setCatname4] = useState();
  const [catname5, setCatname5] = useState();
  const [catnameother, setCatnameother] = useState();

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
      }&category=${category}&sort=${sort}&title=${search}`
    );
    const resnews = await getData(
      `productNews?limit=${
        page * 500
      }&category=${category}&sort=${sort}&title=${search}`
    );
    setmachincount(resprod.products.length);
    setresprod(resprod.products);

    setallusercount(state.users.length);
    setusercount(state.users.filter(checkUser).length);
    setadmincount(state.users.filter(checkAdmin).length);

    setnewscount(resnews.products.length);

    setcat(state.categories);

    setCatname1(resprod.products.filter(checkCat1).length);
    setCatname2(resprod.products.filter(checkCat2).length);
    setCatname3(resprod.products.filter(checkCat3).length);
    setCatname4(resprod.products.filter(checkCat4).length);
    setCatname5(resprod.products.filter(checkCat5).length);
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
    <BaseCard title="แดชบอร์ด">
      <Grid container>
        {blogs.map((index) => (
          <Grid
            key={index}
            item
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
                backgroundColor: "#3949ab",
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
                  align="left"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    color:"yellow"
                  }}
                >
                  ผู้ใช้ทั้งหมด 
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  ผู้ใช้ทั้งหมด {allusercount} บัญชี
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  แอดมิน {admincount} บัญชี
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  ผู้ใช้ {usercount} บัญชี
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {blogs1.map((index) => (
          <Grid
            key={index}
            item
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
                backgroundColor: "#3949ab",
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
                  align="left"
                  
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    placeItems: "center",
                    color:"yellow"
                  }}
                >
                  เครื่องมือวิทยาศาสตร์
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  เครื่องมือวิทยาศาสตร์ทั้งหมด {machincount} ชิ้น
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  งานวิเคราะห์ด้วยกล้องจุลทรรศน์ {catname1} ชิ้น
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  งานวิเคราะห์ทางเคมีและชีวเคมี {catname2} ชิ้น
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  งานวิเคราะห์ทางจุลชีววิทยา {catname3} ชิ้น 
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  งานวิเคราะห์ทางกายภาพ {catname4} ชิ้น
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                  งานวิเคราะห์ทางน้ำ {catname5} ชิ้น
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {blogs2.map((index) => (
          <Grid
            key={index}
            item
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
                backgroundColor: "#3949ab",
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
                  align="left"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    placeItems: "center",
                    color:"yellow"
                  }}
                >
                   ข่าวประชาสัมพันธ์ 
                </Typography>
                <Typography
                  align="left"
                  color="white"
                  sx={{
                    fontSize: "h5.fontSize",
                    fontWeight: "400",
                  }}
                >
                 ข่าวประชาสัมพันธ์ {newscount} รายการ
                </Typography>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </BaseCard>
  );
};

export default BlogCard;
