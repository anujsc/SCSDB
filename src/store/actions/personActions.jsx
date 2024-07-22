export { removeperson } from "../reducers/PersonSlice";
import axios from "../../utilis/axios";
import { loadperson, removeperson } from "../reducers/PersonSlice";

export const asynloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const moviecredits = await axios.get(`/person/${id}/movie_credits`);
    const tvcredits = await axios.get(`/person/${id}/tv_credits`);
    const translations = await axios.get(`/person/${id}/translations`);

    let bigdata = {
      detail: detail.data,
      externalid: externalid.data,
      moviecredits: moviecredits.data,
      tvcredits: tvcredits.data,
      translations: translations.data.translations.map((i)=>i.english_name),

    };
    dispatch(loadperson(bigdata));
    console.log(bigdata);
  } catch (error) {
    console.log("error:", error);
  }
};
