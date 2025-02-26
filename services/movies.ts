const accessToken = process.env.EXPO_PUBLIC_MOVIE_DB_ACCESS_TOKEN;
const headers = {
  accept: "application/json",
  Authorization: "Bearer " + accessToken,
};

export const fetchTopRatedMovies = async ({ pageParam = 1 }) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const options = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
  return json.results;
};

export const fetchMovie = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json;
};
