import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asynloadmovie, removemovie } from "../store/actions/movieActions";
import "remixicon/fonts/remixicon.css";
import imdb from "/imdb.png";
import Loading from "./Loading";

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
  }, []);

  return info ? (
    <div className=" h-full w-full relative ">
      <img
        className="absolute  h-full w-full object-cover  "
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

        <div className="pl-5 h-full w-full">
          <div>
            <img
              className="head h-[50vh] w-[35vh] object-cover  "
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.poster_path || info.detail.backdrop_path
              }`}
              alt=""
            />

            <div>
              {info.watchproviders &&
                info.watchproviders.flatrate &&
                info.watchproviders.flatrate.map((item, index) => (
                  <img
                    className=" w-[6vh] object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                  />
                ))}

              {info.watchproviders &&
                info.watchproviders.rent &&
                info.watchproviders.rent.map((item, index) => (
                  <img
                    className=" w-[6vh] object-cover rounded-lg py-1"
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                  />
                ))}

              {info.watchproviders &&
                info.watchproviders.buy &&
                info.watchproviders.buy.map((item, index) => (
                  <img
                    className=" w-[6vh] object-cover rounded-lg py-1"
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
