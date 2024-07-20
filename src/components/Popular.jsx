import React, { useEffect, useState } from "react";
import Dropdown from "./Partials/Dropdown";

import "remixicon/fonts/remixicon.css";
import Topnav from "./Partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";


function Popular() {
  document.title="SCSDB | Popular";
  const navg = useNavigate();
  const [Category, setCategory] = useState("movie");
  const [Popular, setPopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${Category}/popular?page=${page}`);
      if (data.results.length>0) {
        setPopular((prevState)=>[...prevState, ...data.results]);
      setpage(page+1);
      } else{
        sethasmore(false);
      }
      // setPopular(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };


  const refreshHandler=async()=>{
    if (Popular.length === 0) {
      getPopular();
    }else{
      setpage(1);
      setPopular([]);
      getPopular();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return Popular.length ? (
    <div className=" py-2 w-full h-full ">
      <div className=" px-[3%]  w-full flex items-center justify-center">
        <h1 className=" w-[20%] text-2xl font-semibold text-zinc-300 ">
          <i onClick={() => navg(-1)} className="mr-3 ri-arrow-left-line"></i>
          Popular
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={Popular.length}
        next={getPopular}
        hasMore={true}
        loader={<h1>loading</h1>}
      >
        <Cards data={Popular} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
