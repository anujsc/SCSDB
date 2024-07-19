import React, { useEffect, useState } from "react";
import Dropdown from "./Partials/Dropdown";

import "remixicon/fonts/remixicon.css";
import Topnav from "./Partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title="SCSDB | Trending";
  const navg = useNavigate();
  const [Category, setCategory] = useState("all");
  const [Duration, setDuration] = useState("day");
  const [Trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/${Duration}?page=${page}`);
      if (data.results.length>0) {
        setTrending((prevState)=>[...prevState, ...data.results]);
      setpage(page+1);
      } else{
        sethasmore(false);
      }
      // setTrending(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };


  const refreshHandler=async()=>{
    if (Trending.length === 0) {
      getTrending();
    }else{
      setpage(1);
      setTrending([]);
      getTrending();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category, Duration]);

  return Trending.length ? (
    <div className=" py-2 w-full h-full ">
      <div className=" px-[3%]  w-full flex items-center justify-center">
        <h1 className=" w-[20%] text-2xl font-semibold text-zinc-300 ">
          <i onClick={() => navg(-1)} className="mr-3 ri-arrow-left-line"></i>
          Trending
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className=" w-[3%]"></div>
        <Dropdown
          title="Duration"
          options={["day", "week", "all"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={Trending.length}
        next={getTrending}
        hasMore={true}
        loader={<h1>loading</h1>}
      >
        <Cards data={Trending} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
