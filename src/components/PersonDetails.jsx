import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asynloadperson, removeperson } from "../store/actions/personActions";
import "remixicon/fonts/remixicon.css";
import imdb from "/imdb.png";
import Loading from "./Loading";
import HorizontalSlide from "./Partials/Horizontalslide"
import HorizontalPeople from "./Partials/HorizontalPeople";

function PersonDetails() {
  const { info } = useSelector((state) => state.person);
  const navg = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return (
    <div className=" h-[140vh] w-full relative ">
   hlw
    </div>
 
)}

export default PersonDetails;
