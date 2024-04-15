import React, { useEffect } from "react";
import AttendanceProfile from "./components/user-attendance-profile/AttendanceProfile";
import Layout from "./components/layout/Layout";
import Register from "./components/register/Register";
import { Routes, Route } from "react-router-dom";
const App = () => {



//   useEffect(()=>{

// navigator.geolocation.getCurrentPosition((err,position)=>{

//   if(err){
//     console.log(err)
//   }else{
//     console.log(position)
//   }

// })


//   },[])


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<AttendanceProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
