import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { getData } from '../../../utils/fetchData'
import BaseCard from "../baseCard/BaseCard";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../store/GlobalState";
import { data } from "autoprefixer";

const SalesOverview = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const router = useRouter();
  const query = router.query
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
 let sum = 0
  const [newscount, setnewscount] = useState();
  useEffect(() => {
    getdata(query)
    // checkCate()
    // checkCat()
  }, [state,sum]);
 
  async function getdata(query) {

    const page = query.page || 1;
    const category = query.category || 'all';
    const sort = query.sort || '';
    const search = query.search || 'all';
  
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
      setmachincount(resprod.products.length)
      setresprod(resprod.products)

      setallusercount(state.users.length)
      setusercount(state.users.filter(checkUser).length)
      setadmincount(state.users.filter(checkAdmin).length)
      
      setnewscount(resnews.products.length)

      setcat(state.categories)


      
        setCatname1(resprod.products.filter(checkCat1).length)
        setCatname2(resprod.products.filter(checkCat2).length)
        setCatname3(resprod.products.filter(checkCat3).length)
        setCatname4(resprod.products.filter(checkCat4).length)
        setCatname5(resprod.products.filter(checkCat5).length)
      //  sum = parseInt(catname1)+parseInt(catname2)+parseInt(catname3)+parseInt(catname4)+parseInt(catname5)
       
      //  setCatnameother(parseInt(machincount) - sum)
      
 console.log("cat1",catname1)
 console.log("cat2",catname2)
 console.log("cat3",catname3)
 console.log("cat4",catname4)
 console.log("cat5",catname5)
//  console.log("catother",catnameother)

  }
function checkCate(){

console.log(state.categories)
console.log(resprod)

if(resprod){
  const final = {};
  resprod.forEach((v) => {
    const cat = v.category;
    if (cat in final) {
       final[cat]++;
    } else {
       final[cat] = 1;
    }
  });
console.log(final)
let arrayObj = resprod
arrayObj = arrayObj.map(item => {

  return {
    name: item.name,
    cate: item.category
  };
});
console.log(arrayObj)
    
console.log("arrayObj = " + JSON.stringify(arrayObj));

}
}
  function checkUser(user){
 
    return user.role == "user";
  }
    function checkAdmin(user){
    return user.role == "admin";
  }   

 function checkCat1(cat){
     //งานวิเคราะห์ด้วยกล้องจุลทรรศน์
  
    return cat.category == "6332c30fef36f259682ef9ca";
  }  
   function checkCat2(cat){
    // งานวิเคราะห์ทางเคมีและชีวเคมี
    return  cat.category =="633562ae0965da53b8325fbd";
  }   
   function checkCat3(cat){
    // งานวิเคราะห์ทางจุลชีววิทยา
    return  cat.category =="633562b90965da53b8325fc0";
  }      
   function checkCat4(cat){
    // งานวิเคราะห์ทางกายภาพ
    return  cat.category =="633562e70965da53b8325fc3";
  }   
function checkCat5(cat){
  // งานวิเคราะห์ทางน้ำ
    return  cat.category == "633563020965da53b8325fc6";
  }   

  return (
    <BaseCard title="Sales Overview">
    <BaseCard title="เครื่องมือทั้งหมด">
     <div className="text-xl ">{machincount}<br/> ชิ้น</div><br/>
   
<h1>งานวิเคราะห์ด้วยกล้องจุลทรรศน์ {catname1}</h1>
<h1>งานวิเคราะห์ทางเคมีและชีวเคมี {catname2}</h1>
<h1>งานวิเคราะห์ทางจุลชีววิทยา {catname3}</h1>
<h1>งานวิเคราะห์ทางกายภาพ {catname4}</h1>
<h1>งานวิเคราะห์ทางน้ำ {catname5}</h1>

    </BaseCard>
    <BaseCard title="ผู้ใช้ทั้งหมด">
     <div className="text-xl ">ทั้งหมด {allusercount} บัญชี</div>
     <div className="text-xl ">แอดมิน {admincount} บัญชี</div>
     <div className="text-xl ">ผู้ใช้ {usercount} บัญชี</div>
    </BaseCard> 
    <BaseCard title="ข่าวทั้งหมด">
     <div className="text-xl ">{newscount}<br/> รายการ</div>
    </BaseCard>
    </BaseCard>
  );
};





export default SalesOverview;