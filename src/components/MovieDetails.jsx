import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asynloadmovie, removemovie } from "../store/actions/movieActions";
import "remixicon/fonts/remixicon.css";
import imdb from "/imdb.png";
import Loading from "./Loading";
import HorizontalSlide from "./Partials/Horizontalslide"
import HorizontalPeople from "./Partials/HorizontalPeople";

function MovieDetails() {
  const { info } = useSelector((state) => state.movie);
  const navg = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div className=" h-[140vh] w-full relative ">
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
          <div className=" leading-6">
              <div className="title leading-[6vh]">
              <h1 className=" text-[8vh] font-black tracking-wider text-white py-2 ">{info.detail.original_title}
              <span className=" ml-3 text-[3vh]">({info.detail.release_date.split('-')[0]})
                </span> 
              </h1>
              </div>
            
            <div className="2ndline text-white flex gap-9 ">
              <span className=" text-[2.3vh] font-medium -tracking-tight">{info.detail.release_date}</span>
              <span className=" text-[2.3vh] font-medium -tracking-tight">{info.detail.genres.map((i)=>i.name).join(",")}</span>
              <span className=" text-[2.3vh] font-medium -tracking-tight">{info.detail.runtime} min</span>
              <span className=" text-[2.3vh] font-medium -tracking-tight"> <i class="mr-1 ri-star-line"></i> {info.detail.vote_average}</span>
            </div>
            
            <p className="text-[2.3vh] py-3 font-medium italic -tracking-tight">{info.detail.tagline}</p>
            
            <h1 className=" text-[3.7vh] font-semibold tracking-tight">Overview</h1>
            <p className="text-[2.3vh] py-3 tracking-tight">{info.detail.overview}</p>

            <h1 className=" text-[3.7vh] tracking-tight font-semibold">Movie Translated</h1>
            <p className="text-[2.3vh] py-3 tracking-tight">{info.translations.join(", ")}</p>

          </div>

        </div>
        {/* part-3 watch */}
        <div className=" pl-5 w-full">
          <div>
          {info.watchproviders &&
                info.watchproviders.flatrate ?
            <div className=" flex gap-3 items-center">
            <h1 className="recom text-white text-[2.5vh] font-semibold tracking-tight  px-3 py-2 rounded ">Available On -</h1>
              {info.watchproviders &&
                info.watchproviders.flatrate &&
                info.watchproviders.flatrate.map((item, index) => (
                  <img
                    className=" w-[6vh] object-cover rounded-lg py-2"
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                  />
                  
                ))}
            </div>:""}

            {info.watchproviders &&
                info.watchproviders.rent ?
            <div className=" flex gap-3 items-center">
            <h1 className="recom text-white text-[2.5vh] font-semibold tracking-tight px-3 py-2 rounded ">Rent On -</h1>
              {info.watchproviders &&
                info.watchproviders.rent &&
                info.watchproviders.rent.map((item, index) => (
                  <img
                    className=" w-[6vh] object-cover rounded-lg py-2"
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                  />
                ))}
            </div>:""}

            {info.watchproviders &&
                info.watchproviders.buy ?
            <div className=" flex gap-3 items-center ">
            <h1 className="recom text-white text-[2.5vh] font-semibold tracking-tight px-3 py-2 rounded ">Buy On -</h1>
              {info.watchproviders &&
                info.watchproviders.buy &&
                info.watchproviders.buy.map((item, index) => (
                  <img
                    className=" w-[6vh] object-cover rounded-lg py-2"
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                  />
                ))}
            </div>:""}
          </div>
        </div>

        {/* part-4 recommd n similar */}
        <div className=" mt-[1.7vh]">
          <h1 className=" recom inline-block px-4 py-1 rounded-md text-white font-medium text-[3vh] tracking-tighter translate-x-5 mb-2">Recommendations</h1>
          <HorizontalSlide data={info.recommendation?info.recommendation:info.similar}/>
        </div>

        {/*part-5 cast */}
        <div className=" mt-[1vh]">
          <h1 className=" recom inline-block px-4 py-1 rounded-md text-white font-medium text-[3vh] tracking-tighter translate-x-5 mb-2">People Acted</h1>
          <HorizontalPeople data={info.credits.cast}/>
        </div>

      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
