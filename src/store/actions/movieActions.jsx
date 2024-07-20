export { removemovie } from "../reducers/MovieSlice";
import axios from "../../utilis/axios";
import { loadmovie, removemovie } from "../reducers/MovieSlice";

export const asynloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let bigdata = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((i)=>i.english_name),
      videos: videos.data.results.find(t=>t.type==="Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadmovie(bigdata));
    console.log(bigdata);
  } catch (error) {
    console.log("error:", error);
  }
};
