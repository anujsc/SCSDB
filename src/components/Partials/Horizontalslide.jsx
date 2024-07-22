import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";

function Horizontalslide({data}) {
  return data?(
    <div className=" w-[160vh] h-[40vh]">
      <div className=" w-full flex ml-9 mr-3 mt-2 gap-[6vh] text-white overflow-x-auto duration-300">
      {data.map((item, index) => (
          <Link to={`/${item.media_type || title}/details/${item.id}`} className={` px-1 ${!item.profile_path && item.profile_path === undefined  ?`bg-[#1f1e24]`:""} } h-[38vh] min-w-[15%]`}>
            <img
              className=" h-[18vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                item.backdrop_path || item.poster_path || item.profile_path  
              }`}
              alt=""
            />
            {console.log(item.media_type)}
            <h1 className={`${item.profile_path?`text-black bg-[#6556CD] rounded inline-block mt-2 px-2 `:`text-white`} font-bold py-2 leading-4`}>{item.title || item.original_name || item.original_title}</h1>
            {item.overview?
            <p className=" text-[2vh] opacity-60">{item.overview.slice(0,100)} <span className=" text-[#6556cd] opacity-100">more...</span> </p>:""}
          </Link>
      ))}
       </div>
    </div>
  ): (<Loading/>);
}

export default Horizontalslide;
