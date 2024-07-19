import React from "react";
import { Link } from "react-router-dom";

function MovCards({ data, title }) {
  return (
    <div className="flex flex-wrap px-[3%]  bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link key={i} className="opacity-55 hover:opacity-100 duration-75 mt-[5vh] pl-[10vh] w-[45vh] mr-[2%] mb-[5%] ">
          <img
            className="head h-[40vh] w-[34vh] object-cover  "
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className=" text-[2.2vh] bg-[#6556cd] rounded px-2 py-2 tracking-tight text-zinc-300 mt-1 font-semibold">
            {c.title || c.original_name || c.original_title}
            <div className=" flex gap-3 text-white text-[2vh]">
          <div>
            <i className=" text-[#f5c518] font-bold mr-2 ri-star-line"></i>
            {c.vote_average}
          </div>
          <div>
          <i className="text-[#f5c518] font-bold mr-2 ri-video-on-fill"></i>
            {c.release_date || "NO INFO" } 
          </div>
        </div>
          </h1>
        </Link>
      ))}
    </div>
  );
}

export default MovCards;
