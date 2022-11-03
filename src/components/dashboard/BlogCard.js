import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import user1 from "../../../assets/images/backgrounds/u2.jpg";
import user2 from "../../../assets/images/backgrounds/u3.jpg";
import user3 from "../../../assets/images/backgrounds/u4.jpg";
import BaseCard from "../baseCard/BaseCard";
import { m } from "framer-motion";

const blogs = [
  {
    img: user1,
    title: "ผู้ใช้ทั้งหมด",
    subtitleuser: "25 คน",
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
  return (
    <BaseCard title="แดชบอร์ด">
      <Grid container>
        {blogs.map((blog, index) => (
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
                  align="center"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  align="center"
                  color="white"
                  sx={{
                    fontSize: "50px",
                    fontWeight: "400",
                  }}
                >
                  {blog.subtitleuser}
                  {blog.subtitleM}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {blogs1.map((blog, index) => (
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
                  align="center"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    placeItems: "center",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  align="center"
                  color="white"
                  sx={{
                    fontSize: "h3.fontSize",
                    fontWeight: "400",
                  }}
                >
                  {blog.subtitle0}
                  {blog.subtitle1}
                  {blog.subtitle2}
                  {blog.subtitle3}
                  {blog.subtitle4}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {blogs2.map((blog, index) => (
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
                  align="center"
                  sx={{
                    fontSize: "h1.fontSize",
                    fontWeight: "500",
                    placeItems: "center",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  align="center"
                  color="white"
                  sx={{
                    fontSize: "50px",
                    fontWeight: "400",
                  }}
                >
                  {blog.subtitleuser}
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
