import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface MovieListItemProps {
  movie: { id: string; poster_path: string };
}
const MovieListItem = ({ movie }: MovieListItemProps) => {
  return (
    <Link href={`/movie-details/${movie.id}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          }}
          style={{ width: "100%", aspectRatio: 3 / 5, borderRadius: 20 }}
        />
      </Pressable>
    </Link>
  );
};

export default MovieListItem;
