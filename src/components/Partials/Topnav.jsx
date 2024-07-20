import axios from "../../utilis/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import noimg from "/Noimg.jpg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);

      setsearches(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getSerches();
  }, [query]); //jab jab query chalegi or we can say jab jab search hoga ye useEff chalega

  return (
    <div className=" z-[999] flex justify-center items-center text-white h-[10vh] w-full relative ">
      <i className=" text-3xl ri-search-eye-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className=" px-5 border-none outline-none bg-transparent text-xl w-[50%] text-zinc-200"
        type="text"
        placeholder="Search Anything..."
      />
      <i onClick={() => setquery("")} class=" text-3xl ri-close-line"></i>

      {query.length > 0 && (
        <div className=" bg-[#6556cd] h-[50vh] w-[50%] top-[100%] absolute overflow-auto">
          {searches.map((item, index) => (
            <Link to={`/${item.media_type || title}/details/${item.id}`}
              key={index}
              className=" flex justify-start items-center gap-5 w-[100%] font-semibold opacity-75 hover:opacity-100 hover:bg-[#7f71db] duration-250 border-zinc-200 border-b-[1px] p-10"
            >
              <img
                className=" w-[23vh] h-[15vh] object-cover rounded-[2vh]"
                src={
                  item.backdrop_path ||
                  item.profile_path ?`https://image.tmdb.org/t/p/original/${
                    item.backdrop_path || item.profile_path
                  }`:noimg
                }
                alt=""
              />
              <h1 className=" text-[2.9vh] font-semibold tracking-tight ">
                {item.title || item.original_name || item.original_title}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
