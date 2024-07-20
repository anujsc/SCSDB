import React, { useEffect, useState } from "react";
import Dropdown from "./Partials/Dropdown";
import "remixicon/fonts/remixicon.css";
import Topnav from "./Partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axios";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Partials/Cards";

function People() {
  document.title = "SCSDB | People";
  const navg = useNavigate();
  const [Category, setCategory] = useState("popular");
  const [People, setPeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`person/${Category}?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
      // setPeople(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };
  console.log(People);

  const refreshHandler = async () => {
    if (People.length === 0) {
      getPeople();
    } else {
      setpage(1);
      setPeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return People.length ? (
    <div className=" py-2 w-full h-full ">
      <div className=" px-[3%]  w-full flex items-center justify-center">
        <h1 className=" w-[20%] text-2xl font-semibold text-zinc-300 ">
          <i onClick={() => navg(-1)} className="mr-3 ri-arrow-left-line"></i>
          People
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["popular"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={People.length}
        next={getPeople}
        hasMore={true}
        loader={<h1>loading</h1>}
      >
        <Cards data={People} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
