<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=FD366E" alt="clerk" />
    <img src="https://img.shields.io/badge/NativeWind-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="nativewind" />
     <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>
  <h3 align="center">TheMovieApp</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [More](#more)


## <a name="introduction">🤖 Introduction</a>

Built with React Native Framework (EXPO) for seamless user experiences, Animatable for captivating animations, clerk for authentication management and integrated with themoviedb api [TMDB API]. Designed with modern tools like Expo SDK 52, Tailwind CSS, tanStack Query and TypeScript for a seamless and scalable experience

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Expo
- Nativewind
- Animatable
- TMDB 
- React Tanstack Query
- Clerk


## <a name="features">🔋 Features</a>

👉 **Onboarding Screen**: Engaging graphics and clear instructions welcome users to the app.

👉 **Robust Authentication & Authorization System**: Secure email login safeguards user accounts using Clerk.

👉 **Dynamic Home Screen with Animated Flat List**: Smoothly animated flat list showcases the latest movies for seamless browsing.

👉 **Pull-to-Refresh Functionality + Infinite Scrolling**: Users can refresh content with a simple pull gesture for up-to-date information.

👉 **Tab Navigation**: Navigate between sections like Home, Movie, WatchList and Profile with ease using tab navigation.

👉 **Adding A watchlist to Movie WatchList Screen**: Upload video and image posts directly from the app with integrated media selection.

👉 **Profile Screen with Detailed Insights**: View account details and activity.

👉 **Responsiveness**: Smooth performance and adaptability across various devices and screen sizes for a consistent user experience.

👉 **Animations**: Dynamic animations using the Animatable library to enhance user interaction and engagement throughout the app's UI.

👉 **Centralized Data Fetching**: Custom-built solution inspired by TanStack’s useQuery for efficient API calls.

and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/olatunde1998/rn-movieApp.git
cd rn-movieApp
```
**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npx expo start
```

**Expo Go**

Download the [Expo Go](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
         "spaceMono-regular": ["Poppins-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>Font Loaded</code></summary>

```javascript
const [fontsLoaded, error] = useFonts({
   "spaceMono-regular": ["Poppins-Regular", "sans-serif"],
});

useEffect(() => {
  if (error) throw error;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, error]);

if (!fontsLoaded && !error) {
  return null;
}
```

</details>

<details>
<summary><code>Services [Movies]</code></summary>

```javascript
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

```

</details>

<details>
<summary><code>Services [WatchList]</code></summary>

```javascript
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

```
</details>

## <a name="links">🔗 Links</a>

Sdk file can be found [here](https://expo.dev/artifacts/eas/heSToshftt3AEBuWpSviak.apk)



## <a name="more">🚀 Deployment</a>

**This app was deployed on EAS [Expo Application Services] and google play store**


## <a name="links">🔗 License</a>

The MIT License - Copyright (c) 2025 - Present, geodevcodes / Storage Service.


## <a name="links">🔗 Author</a>

Rasheed Olatunde (Software Developer)