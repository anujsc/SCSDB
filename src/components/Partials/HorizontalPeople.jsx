import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import noimg from "/Noimg.jpg";
function HorizontalPeople({ data }) {
  return data ? (
    <div className=" w-full h-[40vh]">
      <div className=" w-full flex ml-9 mr-3 mt-2 gap-[6vh] text-white overflow-x-auto duration-300">
        {data.map((item, index) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            className=" px-1 bg-transparent h-[38vh] min-w-[15%]"
          >
            {item.profile_path ? (
              <img
                className=" h-[24vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt=""
              />
            ) : (
              <img className=" h-[18vh] object-cover" src={noimg} alt="" />
            )}
            <h1
              className="recom h-[7vh] w-[16vh]  rounded inline-block mt-2 px-3 font-bold py-2 leading-4"
            >
              {item.title || item.original_name || item.original_title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default HorizontalPeople;
