import { Text, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieListItem from "@/components/MovieListItem";
import { fetchTopRatedMovies } from "@/services/movies";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "@/components/EmptyState";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchTopRatedMovies,
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // const movies = data?.pages?.flat();
  // console.log(JSON.stringify(data, null, 2));
  // console.log(JSON.stringify(movies, null, 2));

  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold text-center mb-5">Movies</Text>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerClassName="gap-5 p-5 pb-32"
        columnWrapperStyle={{ gap: 5 }}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <EmptyState
              title="No Movie Found"
              subTitle="Be the first one to watch a movie"
            />
          )
        }
        renderItem={({ item }) => <MovieListItem movie={item} />}
        onEndReached={() => {
          // fetchNextPage();
          console.log("fetching next page");
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
