import Head from "next/head";
import {  Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { DataContext } from "../../store/GlobalState";
import { useState, useContext, useEffect } from "react";


export default function Index() {
  const { state } = useContext(DataContext);
  const { auth } = state;
  if(!auth.user) return null;
  return (
    
    <ThemeProvider theme={theme}> 
    
     <FullLayout> 
     <style jsx global>{`
        Nav {
          display: none;
        }
      `}</style>
      
     <Head>
        <title>Dashboard</title>
    </Head>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      {/* <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid> */}
      {/* <Grid item xs={12} lg={12}>
        <ProductPerfomance />
      </Grid> */}
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
    </FullLayout> 
     </ThemeProvider>
  );
      }