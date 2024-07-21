import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asynloadtv, removetv } from "../store/actions/TvActions";
import "remixicon/fonts/remixicon.css";
import imdb from "/imdb.png";
import Loading from "./Loading";
import HorizontalSlide from "./Partials/Horizontalslide";
import HorizontalPeople from "./Partials/HorizontalPeople";

function TvDetails() {
  const { info } = useSelector((state) => state.tv);
  const navg = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div className=" h-[160vh] relative w-full ">
      <img
        className="absolute opacity-65 h-full w-full object-cover  "
        src={`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`}
        alt=""
      />
      <div className=" z-[999] absolute w-full h-full px-[10%]">
        {/* part-1 nav */}
        <nav className=" w-full text-white text-[3.3vh] flex gap-[8vh] py-4">
          <Link>
            <i
              onClick={() => navg(-1)}
              className=" mr-3 ri-arrow-left-line"
            ></i>
          </Link>
          <a
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i class=" ri-earth-line"></i>
          </a>
          <a href={info.detail.homepage}>
            <i class="ri-share-box-fill"></i>
          </a>
          <a
            className=""
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            <img
              className=" h-[6vh]  -translate-y-1 object-cover "
              src={imdb}
              alt=""
            />
          </a>
        </nav>

        {/* part-2 poster  */}
        <div className="pl-5 flex gap-[12vh] text-white">
          <img
            className="head h-[50vh] w-[35vh] object-cover  "
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <div className=" leading-7">
            <div className="title leading-[6vh]">
              <h1 className=" text-[8vh] font-black tracking-wider text-white py-2 ">
                {info.detail.original_name}
              </h1>
              {/* <p>by {info.detail.created_by.map((i)=>i.name).join(" , ")}</p> */}
            </div>

            <div className="2ndline text-white flex gap-9 ">
              <span className=" text-[2.3vh] font-medium -tracking-tight">
                {info.detail.first_air_date}
              </span>
              <span className=" text-[2.3vh] font-medium -tracking-tight">
                {info.detail.genres.map((i) => i.name).join(",")}
              </span>
              <span className=" text-[2.3vh] font-medium -tracking-tight">
                Seasons {info.detail.number_of_seasons}
              </span>
              <span className=" text-[2.3vh] font-medium -tracking-tight">
                Ep {info.detail.number_of_episodes}
              </span>
              <span className=" text-[2.3vh] font-medium -tracking-tight">
                {" "}
                <i class="mr-1 ri-star-line"></i> {info.detail.vote_average}
              </span>
            </div>

            <p className="text-[2.3vh] py-3 font-medium italic -tracking-tight">
              {info.detail.tagline}
            </p>

            <h1 className=" text-[3.7vh] font-semibold tracking-tight">
              Overview
            </h1>
            {info.detail.overview ? (
              <p className="text-[2.3vh] leading-5 py-3 tracking-tight">
                {info.detail.overview}
              </p>
            ) : (
              <p className="pl-2 font-extralight">
                <i class="ri-skull-line"></i> Not Available Sorry
              </p>
            )}

            <div className=" leading-7">
              <h1 className=" text-[3.7vh] font-semibold tracking-tight">
                Directed by
              </h1>
              <p className=" tracking-tight">
                {info.detail.created_by.map((i) => i.name).join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* part-3 watch */}
        <div className=" pl-5 w-full">
          <div>
            {info.watchproviders && info.watchproviders.flatrate ? (
              <div className=" flex gap-3 items-center">
                <h1 className="recom text-white text-[2.5vh] font-semibold tracking-tight  px-3 py-2 rounded ">
                  Available On -
                </h1>
                {info.watchproviders &&
                  info.watchproviders.flatrate &&
                  info.watchproviders.flatrate.map((item, index) => (
                    <img
                      className=" w-[6vh] object-cover rounded-lg py-2"
                      src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                      alt=""
                    />
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* part-4 recommd n similar */}
          <div className=" mt-[1.7vh]">
            <h1 className=" recom inline-block px-4 py-1 rounded-md text-white font-medium text-[3vh] tracking-tighter translate-x-5 mb-2">
              Recommendations
            </h1>
            <HorizontalSlide
              data={info.recommendation ? info.recommendation : info.similar}
            />
          </div>
          
          {/*part-5 cast */}
          <div className=" mt-[1vh]">
            <h1 className=" recom inline-block px-4 py-1 rounded-md text-white font-medium text-[3vh] tracking-tighter translate-x-5 mb-2">
              People Acted
            </h1>
            <HorizontalPeople data={info.credits.cast} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
