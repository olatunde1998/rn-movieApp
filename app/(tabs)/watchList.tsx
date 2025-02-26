import { ActivityIndicator, FlatList, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import MovieListItem from "@/components/MovieListItem";
import { fetchWatchListMovies } from "@/services/watchList";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";

export default function WatchList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchListMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold text-center mb-5">Watch List</Text>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerClassName="gap-5 p-5 pb-48"
        columnWrapperStyle={{ gap: 5 }}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <EmptyState
              title="No Watch List Movie Found"
              subTitle="Add a movie to in Movies tab to watch list"
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
}

