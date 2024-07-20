import React, { useState } from "react";
import axios from "../../utilis/axios";
import { useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Loading from "../Loading";

function Headers() {
  const [Header, setHeader] = useState([]);

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setHeader(randomdata);
    } catch (error) {
      console.log("error:", error);
    }
  };


  useEffect(() => {
    !!Header && getHeader();
  }, []);

  

  return Header? (
    <div className=" h-[62vh] w-full relative  ">
      <div>
        <img
          className="head h-[62vh] w-full "
          src={`https://image.tmdb.org/t/p/original/${
            Header.backdrop_path || Header.profile_path
          }`}
          alt=""
        />
      </div>
      <div className=" -translate-y-[24vh]">
        <h1 className=" ml-[5vh] text-[5vh] text-white font-semibold tracking-tight ">
          {Header.title || Header.original_name || Header.original_title}
        </h1>

        <div className=" flex gap-6 px-5 text-white pl-[5vh] text-[2.4vh]">
          <div>
            <i className=" text-[#f5c518] font-bold mr-3 ri-star-line"></i>
            {Header.vote_average}
          </div>
          <div>
          <i className="text-[#f5c518] font-bold mr-3 ri-video-on-fill"></i>
            {Header.release_date || "NO INFO" } 
          </div>
        </div>

        <p className=" w-3/2 h-[10vh] overflow-y-auto ml-[5vh] text-white font-semibold tracking-tight ">
          {[Header.overview].slice(0, 200)}
        </p>
      </div>
    </div>
  ): (<Loading/>);
}

export default Headers;
