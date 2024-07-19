import React, { useState } from "react";
import Headers from "./Partials/Headers";
import Sidebar from "./Partials/Sidebar";
import Topnav from "./Partials/Topnav";
import axios from "../utilis/axios";
import { useEffect } from "react";
import Horizontalslide from "./Partials/Horizontalslide";

function Home() {
 
  return  (

    <div className=" flex h-full w-full">
      <Sidebar />
      <div className=" w-[80%] h-full overflow-x-hidden overflow-auto ">
        <Topnav />
        <Headers />
        <Horizontalslide/>
      </div>
    </div>
  );
}

export default Home;
