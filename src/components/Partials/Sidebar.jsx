import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Trending from "../Trending";

function Sidebar() {
  return (
    <div className=" w-[20%] h-full border-r-2 border-zinc-300 p-10 ">
      <h1 className=" text-2xl text-white font-medium">
        <i class="text-[#6556cd] mr-3 ri-tv-fill"></i>
        <span>SCSDB</span>
      </h1>

      <hr className=" mt-4 h-[1px] text-zinc-300" />

      <nav className=" flex flex-col gap-2 text-zinc-500 text-xl tracking-tight ">
        <h1 className=" text-white font-semibold text-xl mt-10  ">
          New Feed
        </h1>

        <Link to="/trending" className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
        <i class=" mr-1 ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
        <i class=" mr-1 ri-star-fill"></i> Popular
        </Link>
        <Link  to="/movies" className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
          <i class=" mr-1 ri-movie-2-line"></i> Movies
        </Link>
        <Link to="/tv" className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
        <i class=" mr-1 ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link to="/people" className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
          <i  class=" mr-1 ri-team-fill"></i> People
        </Link>
      </nav>

      <hr className=" mt-2 h-[1px] text-zinc-300" />

      <nav className=" flex flex-col gap-1 text-zinc-500 text-xl tracking-tight ">
        <h1 className=" text-white font-semibold text-xl mt-2 mb-2 ">
          Contact
        </h1>

        <Link className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
        <i class=" mr-1 ri-fire-fill"></i> Trending
        </Link>
        <Link className=" hover:bg-[#6556cd] hover:text-white p-4 rounded duration-300">
        <i class=" mr-1 ri-star-fill"></i> Popular
        </Link>
        
      </nav>
      

    </div>
  );
}

export default Sidebar;
