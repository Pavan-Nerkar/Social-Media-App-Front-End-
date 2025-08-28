import { Grid } from "@mui/material";
import React, { useEffect } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import MiddlePart from "../../Components/MiddlePart/MiddlePart";
import Reels from "../../Components/Reels/Reels";
import CreateReelsFrom from "../../Components/Reels/CreateReelsFrom";
import Profile from "../Profile/Profile";
import HomeRight from "../../Components/HomeRight/HomeRight";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import { store } from "../../Redux/store";

const HomePage = () => {
  // get User ProfileAction
  const dispatch=useDispatch() 
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store=>store)

  console.log("auth",auth);




    return (
    <div className="px-20">

      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0 ">
            <Sidebar />
          </div>
        </Grid>

        <Grid item xs={12} lg={6} className="max-w-[700px] ">
          {/* <div className="max-w-[600px] "> */}
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsFrom />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
          {/* </div> */}
        </Grid>

       
      {location.pathname==="/home" && <Grid item lg={3} className="relative ">
          <div className="sticky top-0 w-full">

            <HomeRight/>

          </div>

        </Grid>}
      </Grid>
    </div>
  );
};

export default HomePage;
