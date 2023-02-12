import Head from "next/head";
import {  Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";

import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { DataContext } from "../../store/GlobalState";
import { useState, useContext, useEffect } from "react";
import DailyActivity from "../../src/components/dashboard/DailyActivity";


export default function Index() {
  const { state } = useContext(DataContext);
  const { auth } = state;
  return (
    
    <ThemeProvider theme={theme}> 
    
     <FullLayout> 
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
    <Grid container spacing={0}>
      
      {/* ------------------------- row 1 ------------------------- */}
      <Grid  item xs={12} lg={5}>
        <DailyActivity />
        
      </Grid>
      {/* <Grid item xs={12} lg={12}>
        <ProductPerfomance />
      </Grid> */}
      <Grid item xs={12} lg={7}>
        <BlogCard />
      </Grid>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* <Grid item xs={12} lg={12}>
        <ReportAll />
      </Grid> */}
    </Grid>
    </FullLayout> 
     </ThemeProvider>
  );
      }