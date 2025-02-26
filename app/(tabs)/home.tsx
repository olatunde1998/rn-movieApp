import { Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieListItem from "@/components/MovieListItem";
import { fetchTopRatedMovies } from "@/services/movies";
import { useInfiniteQuery } from "@tanstack/react-query";
import EmptyState from "@/components/EmptyState";

const Home = () => {
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam }) => fetchTopRatedMovies(pageParam as number | any),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const movies = data?.pages?.flat();
  // console.log(JSON.stringify(movies, null, 2));

  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold text-center mb-5">Movies</Text>
      <FlatList
        data={movies}
        numColumns={2}
        contentContainerClassName="gap-5 p-5 pb-48"
        columnWrapperStyle={{ gap: 5 }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size="large" className="text-red-800 mt-40" />
          ) : (
            <EmptyState
              title="No Movie Found"
              subTitle="Be the first one to watch a movie"
            />
          )
        }
        renderItem={({ item }) => <MovieListItem movie={item} />}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
