import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Linking, FlatList, Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ItemSeperator from '../components/ItemSeperator';
import Colors from '../constants/Colors';
import { getLanguage, getMovieById, getPoster, getVideo } from '../services/MovieService';
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from '../constants/Urls';
import Castcard from '../components/CastCard';


const { height, width } = Dimensions.get("screen")

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;


const MovieScreen = ({ route, navigation }) => {

  const { movieId } = route.params;

  const [movie, setMovie] = useState({})


  useEffect(() => {
    getMovieById(movieId, `${AR.VIDEOS},${AR.CREDITS}`).then((response) => {
      return setMovie(response?.data);
    })
  }, [])


  return (
    <ScrollView>
      <StatusBar style='light' />

      <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]
      } start={[0, 0.3]} style={styles.linearGradient} />

      <View style={styles.movieposterimagecontainer}>
        <Image source={{ uri: getPoster(movie?.backdrop_path) }} style={styles.moviePosterImage} resizeMode="cover" />
      </View>

      <View style={styles.headerContainer} >
        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.goBack()}>
          <Feather name='chevron-left' size={35} color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.5} onPress={() => Share.share({ message: `${movie?.title}\n\n${movie?.homepage}` })}>
          <Text style={styles.headerText} >Share</Text>

        </TouchableOpacity>

      </View>
      <TouchableOpacity onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))} style={styles.playButton}>
        <Ionicons name='play-circle-outline' size={70} color={Colors.WHITE} />
      </TouchableOpacity>
      <ItemSeperator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2} >{movie?.original_title}</Text>
        <View style={styles.row}>
          <Ionicons name='heart' size={22} color={Colors.HEART} />
          <Text style={styles.ratingText} >{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText} >{movie?.genres?.map(genre => genre.name).join(", ")} |  {movie.runtime} Min</Text>
      <Text style={styles.genreText} >{getLanguage(movie?.original_language)?.english_name}</Text>

      <View style={styles.overviewContainer}>
        <Text style={styles.overViewTitle} >OVERVIEW</Text>
        <Text style={styles.overViewSubtitle}>{movie?.overview}</Text>
      </View>

      <View>
        <Text style={{ ...styles.overViewTitle, paddingLeft: 20, fontWeight: "500", paddingBottom: 10 }}>CAST</Text>
        <FlatList
          data={movie?.credits?.cast}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeperator width={20} />}
          ListFooterComponent={() => <ItemSeperator width={20} />}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />}
          renderItem={(item) => <Castcard
            image={item?.item?.profile_path}
            characterName={item?.item?.character}
            originalName={item?.item?.name} />}
        />
      </View>

      <View>
        <Text style={{ ...styles.overViewTitle, paddingLeft: 20, fontWeight: "500", paddingBottom: 10 }}>CREW</Text>
        <FlatList
          data={movie?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeperator width={20} />}
          ListFooterComponent={() => <ItemSeperator width={20} />}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />}
          renderItem={(item) => <Castcard
            image={item?.item?.profile_path}
            characterName={item?.item?.job}
            originalName={item?.item?.name} />}
        />
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BG,
  },
  movieposterimagecontainer: {
    height: setHeight(35),
    width: setWidth(145),
    position: 'absolute',
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
    backgroundColor: Colors.YELLOW,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    height: setHeight(35),
    width: setWidth(145)
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: 'absolute',
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  movieTitle: {
    color: Colors.BLACK,
    fontSize: 18,
    fontWeight: "bold",
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: Colors.BLACK,
    fontSize: 15,
    fontWeight: "bold"
  },
  genreText: {
    color: Colors.GRAY,
    paddingHorizontal: 20,
    paddingVertical: 3,
    fontWeight: '400',
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: Colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overViewTitle: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 17,
    paddingVertical: 5,
  },
  overViewSubtitle: {
    color: Colors.LIGHT_GREY,
    paddingTop: 10,
    fontWeight: '400',
    fontSize: 13,
    textAlign: "justify"
  },
});


export default MovieScreen;