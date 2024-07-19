import axios from "../../utilis/axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";

function Horizontalslide() {
  const [Horicards, setHoricards] = useState([]);

  const getCards = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setHoricards(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };
  console.log(Horicards);

  useEffect(() => {
    !!Horicards && getCards();
  }, []);

  return  Horicards?(
    <div className=" w-full h-[40vh]">
      <div>
        <h1 className=" bg-[#6556cd] inline-block px-3 rounded-xl text-white text-[3vh] font-medium tracking-tight ml-9 m-3">
          Trending
        </h1>
      </div>

      <div className=" w-full flex ml-9 mr-3 mt-2 gap-[6vh] text-white overflow-x-auto duration-300">
      {Horicards.map((item, index) => (
          <div className=" h-[35vh] min-w-[15%]">
            <img
              className=" h-[18vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                item.backdrop_path || item.poster_path
              }`}
              alt=""
            />
            <h1 className=" text-[2.3vh] font-bold py-2 leading-4">{item.title || item.original_name || item.original_title}</h1>
            <p className=" text-[2vh] opacity-60">{item.overview.slice(0,150)} <p className=" text-[#6556cd] opacity-100">more...</p> </p>
          </div>
      ))}
       </div>
    </div>
  ): (<Loading/>);
}

export default Horizontalslide;
