import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmE0YTAwMjJmNWJhZWQ0OWE3Y2VlY2NjMmJkMGI5YiIsIm5iZiI6MTcyMTE1NTQyOS45MjQ5MDMsInN1YiI6IjY2OTY5MGUxODk3NzNmNGFkMjVkZDQwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BuP4gJ5Td7nyasivLytBGY8jZ88hn9fCxGTZDki4cAM",
  },
});

export default instance;
