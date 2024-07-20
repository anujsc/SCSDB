import React, { useState } from "react";
import Headers from "./Partials/Headers";
import Sidebar from "./Partials/Sidebar";
import Topnav from "./Partials/Topnav";
import axios from "../utilis/axios";
import { useEffect } from "react";
import Horizontalslide from "./Partials/Horizontalslide";

function Home() {
  const [Horicards, setHoricards] = useState([]);

  const getCards = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setHoricards(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };
  
  useEffect(() => {
    !!Horicards && getCards();
  }, []);
  return  (

    <div className=" flex h-full w-full">
      <Sidebar />
      <div className=" w-[80%] h-full overflow-x-hidden overflow-auto ">
        <Topnav />
        <Headers />
        <div>
        <h1 className=" bg-[#6556cd] inline-block px-3 rounded-xl text-white text-[3vh] font-medium tracking-tight ml-9 m-3">
          Trending
        </h1>
      </div>
        <Horizontalslide data={Horicards}/>
      </div>
    </div>
  );
}

export default Home;
