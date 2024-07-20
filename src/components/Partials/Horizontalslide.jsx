import axios from "../../utilis/axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";

function Horizontalslide({data}) {
  // const [Horicards, setHoricards] = useState([]);

  // const getCards = async () => {
  //   try {
  //     const { data } = await axios.get(`/trending/all/day`);
  //     setHoricards(data.results);
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   !!Horicards && getCards();
  // }, []);

  return data?(
    <div className=" w-full h-[40vh]">
      <div className=" w-full flex ml-9 mr-3 mt-2 gap-[6vh] text-white overflow-x-auto duration-300">
      {data.map((item, index) => (
          <Link to={`/${item.media_type}/details/${item.id}`} className=" px-1 bg-[#1F1E24] h-[38vh] min-w-[15%]">
            <img
              className=" h-[18vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                item.backdrop_path || item.poster_path
              }`}
              alt=""
            />
            <h1 className=" text-[2.3vh] font-bold py-2 leading-4">{item.title || item.original_name || item.original_title}</h1>
            <p className=" text-[2vh] opacity-60">{item.overview.slice(0,100)} <p className=" text-[#6556cd] opacity-100">more...</p> </p>
          </Link>
      ))}
       </div>
    </div>
  ): (<Loading/>);
}

export default Horizontalslide;
