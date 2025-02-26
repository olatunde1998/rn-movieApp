const accessToken = process.env.EXPO_PUBLIC_MOVIE_DB_ACCESS_TOKEN;
const headers = {
  accept: "application/json",
  Authorization: "Bearer " + accessToken,
};

export const fetchWatchListMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/account/21842334/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc";

  const options = {
    method: "GET",
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json.results;
};

export const addMovieToWatchList = async (movieId: number) => {
  const url = "https://api.themoviedb.org/3/account/21842334/watchlist";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Bearer " + accessToken,
    },

    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json;
};
