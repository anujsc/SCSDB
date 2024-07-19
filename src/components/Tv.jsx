import React, { useEffect, useState } from "react";
import Dropdown from "./Partials/Dropdown";
import "remixicon/fonts/remixicon.css";
import Topnav from "./Partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axios";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import TvCards from "./Partials/TvCards";

function Tv() {
  document.title = "SCSDB | Tv Shows";
  const navg = useNavigate();
  const [Category, setCategory] = useState("on_the_air");
  const [Tv, setTv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const getTv = async () => {
    try {
      const { data } = await axios.get(`tv/${Category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
      // setTv(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const refreshHandler = async () => {
    if (Tv.length === 0) {
      getTv();
    } else {
      setpage(1);
      setTv([]);
      getTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return Tv.length ? (
    <div className=" py-2 w-full h-full ">
      <div className=" px-[3%]  w-full flex items-center justify-center">
        <h1 className=" w-[20%] text-2xl font-semibold text-zinc-300 ">
          <i onClick={() => navg(-1)} className="mr-3 ri-arrow-left-line"></i>
          Tv
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["on_the_air", "airing_today", "popular", "top_rated"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={Tv.length}
        next={getTv}
        hasMore={true}
        loader={<h1>loading</h1>}
      >
        <TvCards data={Tv} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tv;
