import icons from "@/constants/icons";
import { fetchMovie } from "@/services/movies";
import { addMovieToWatchList } from "@/services/watchList";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", id],
    queryFn: () => fetchMovie(id as number | any),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(id as number | any),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
      Alert.alert("Success", "Movie added to Watch List");
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="relative top-0 left-0 right-0">
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
            }}
            style={{ width: "100%", height: 300 }}
            className="relative"
          />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-10 left-6 right-0"
          >
            <Image
              source={icons.leftArrow}
              tintColor="#FFA001"
              resizeMode="contain"
              className=""
            />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 10 }} className="">
          <Text style={{ fontSize: 30, fontWeight: "500", marginVertical: 10 }}>
            {movie.title}
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Pressable
              onPress={() => mutate()}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <FontAwesome name="bookmark-o" size={24} color="black" />
              <Text>Add to watchlist</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 16 }}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;
