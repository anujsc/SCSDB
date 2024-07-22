import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asynloadperson, removeperson } from "../store/actions/personActions";
import "remixicon/fonts/remixicon.css";
import imdb from "/imdb.png";
import Loading from "./Loading";
import HorizontalSlide from "./Partials/Horizontalslide";
import Horizontalppldet from "./Partials/Horizontalppldet";


function PersonDetails() {
  const { info } = useSelector((state) => state.person);
  const [movie, setmovie] = useState("movie");
  const [tv, settv] = useState("tv");
  const navg = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className=" h-[170vh] w-full relative bg-[#1F1E24] ">
      <i
        onClick={() => navg(-1)}
        className="mr-3 absolute left-[25vh] top-[6vh] text-white text-[3.5vh] ri-arrow-left-line"
      ></i>
      <div className=" translate-x-[25vh] translate-y-[15vh]">
        <div className=" flex">
          <img
            className=" h-[50vh] w-[30vh] object-cover  "
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />

          <div className=" text-white ml-[15vh]">
            <h1 className=" text-[14vh] -tracking-tighter font-bold">
              {info.detail.name}
            </h1>

            <h1 className=" text-[3vh]">Biography</h1>
            <p className=" opacity-70 w-[80%]">
              {info.detail.biography.slice(0, 450)}
              <span className="text-[#6556CD]"> more...</span>
            </p>
          </div>
        </div>

        <div className=" flex">
          {/*nav and personal  */}
        <div>
          <hr className=" mt-[4vh] -translate-x-2 w-[32vh]" />

          <nav className=" inline-block text-white mt-[.8vh] text-[3.5vh]">
            <a
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i class=" ri-earth-line"></i>
            </a>

            <a
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="px-8 ri-instagram-line"></i>
            </a>

            <a href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i class="pr-8  ri-facebook-circle-fill"></i>
            </a>

            <a href={`https://x.com/${info.externalid.facebook_id}`}>
              <i class="ri-twitter-line"></i>
            </a>
          </nav>

          <ol className=" w-fit text-white leading-[7vh] mt-[2vh]">
            <h1 className=" text-[3vh] font-semibold">Personal Details-</h1>

            <li className=" my-2 leading-5">
              <h1 className=" text-[2.6vh]">Known For</h1>
              <p className=" opacity-50">{info.detail.known_for_department}</p>
            </li>
            <li className=" leading-5">
              <h1 className=" text-[2.6vh]">Born</h1>
              <p className=" opacity-50">{info.detail.birthday}</p>
            </li>

            <li className="mt-2 leading-5">
              <h1 className=" text-[2.6vh]">Death</h1>
              {!info.detail.deathday === null ? (
                <p className=" opacity-50">{info.detail.deathday}</p>
              ) : (
                <p className=" opacity-50">Still living</p>
              )}
            </li>

            <li className=" leading-5 mt-2">
              <h1 className=" text-[2.6vh]">Birth place</h1>
              <p className=" opacity-50">{info.detail.place_of_birth}</p>
            </li>
            <li className=" w-[37vh] leading-5 mt-2">
              <h1 className=" text-[2.6vh]">Also known as</h1>
              <p className=" opacity-50">
                {info.detail.also_known_as.map((i) => i).join(" , ")}
              </p>
            </li>
            <li className=" w-[37vh] leading-5 mt-2">
              <h1 className=" text-[2.6vh]">Languages</h1>
              <p className=" opacity-50">
                {info.translations.map((i) => i).join(" , ")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h1 className=" text-white font-medium text-[3vh] translate-x-10">Movies</h1>
          <Horizontalppldet className="px-4" data={info.moviecredits.cast} movie={movie}  />
          <h1 className=" text-white font-medium text-[3vh] translate-x-10">Tv</h1>
          <Horizontalppldet data={info.tvcredits.cast} tv={tv}/>
        </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
