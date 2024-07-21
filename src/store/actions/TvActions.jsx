export { removetv } from "../reducers/TvSlice";
import axios from "../../utilis/axios";
import { loadtv, removetv } from "../reducers/TvSlice";  

export const asynloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const credits = await axios.get(`/tv/${id}/credits`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    let bigdata = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      credits: credits.data,
      similar: similar.data.results,
      translations: translations.data.translations.map((i)=>i.english_name),
      videos: videos.data.results.find(t=>t.type==="Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadtv(bigdata));
    console.log(bigdata);
  } catch (error) {
    console.log("error:", error);
  }
};
