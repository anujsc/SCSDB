import React, { useEffect, useState } from "react";
import Dropdown from "./Partials/Dropdown";

import "remixicon/fonts/remixicon.css";
import Topnav from "./Partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";


function Movies() {
  document.title="SCSDB | Movies";
  const navg = useNavigate();
  const [Category, setCategory] = useState("now_playing");
  const [Movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`movie/${Category}?page=${page}`);
      if (data.results.length>0) {
        setMovies((prevState)=>[...prevState, ...data.results]);
      setpage(page+1);
      } else{
        sethasmore(false);
      }
      // setMovies(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };


  const refreshHandler=async()=>{
    if (Movies.length === 0) {
      getMovies();
    }else{
      setpage(1);
      setMovies([]);
      getMovies();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return Movies.length ? (
    <div className=" py-2 w-full h-full ">
      <div className=" px-[3%]  w-full flex items-center justify-center">
        <h1 className=" w-[20%] text-2xl font-semibold text-zinc-300 ">
          <i onClick={() => navg(-1)} className="mr-3 ri-arrow-left-line"></i>
          Movies
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["popular", "top_rated","now_playing","upcoming"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={Movies.length}
        next={getMovies}
        hasMore={true}
        loader={<h1>loading</h1>}
      >
        <Cards data={Movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movies;
