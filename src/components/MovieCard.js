
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableNativeFeedback,
    ImageBackground
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Images from "../constants/Images";
import { getPoster, getLanguage } from "../services/MovieService";
import ItemSeperator from "./ItemSeperator";


const MovieCard = ({ title, poster, language, voteAverage, voteCount, size, heartvisible, onPress }) => {


    const [liked, setLiked] = useState(false)
    const [votecountValue, setVoteCount] = useState(voteCount)


    const languageName = getLanguage(language).english_name;


    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} >
            <ImageBackground style={{ ...styles.container, width: 230 * size, height: 340 * size }} source={{ uri: getPoster(poster) }} imageStyle={{ borderRadius: 12 }} >
                <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
                    <Image source={Images.IMDB} style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }} />
                    <Text style={{ ...styles.imdbRating, marginRight: 5 * size, fontSize: 14 * size }} >{voteAverage}</Text>
                </View>
                {heartvisible ?
                    <TouchableNativeFeedback onPress={() => {
                        setLiked(!liked);
                        setVoteCount(liked ? votecountValue - 1 : votecountValue + 1)

                    }} >
                        <Entypo
                            name={liked ? "heart" : "heart-outlined"}
                            size={25 * size}
                            color={liked ? Colors.HEART : Colors.WHITE}
                            style={{ position: "absolute", bottom: 10, left: 10 }}
                        />
                    </TouchableNativeFeedback> : null}
            </ImageBackground>

            <View>

                <Text
                    style={{ ...styles.movieTitle, width: 230 * size }}
                    numberOfLines={2}
                >{title}
                </Text>

                <View style={styles.movieSubtitleContainer}>
                    <Text >{languageName}</Text>
                    <View style={styles.rowandcenter}>
                        <FontAwesome
                            name="heart"
                            size={20 * size}
                            color={Colors.HEART}
                            style={{ marginRight: 7 }}
                        />
                        <Text>{votecountValue}</Text>
                    </View>
                </View>

            </View>
            <ItemSeperator height={10} />
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ACTIVE,
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2,
    },
    imdbContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: Colors.YELLOW,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 5,
    },
    movieTitle: {
        fontSize: 13,
        fontWeight: '600',
        width: 230,
    },
    movieSubtitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowandcenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius: 3,
    },
    imdbRating: {
        marginRight: 5,
        color: Colors.HEART,
        fontSize: 14,
    }
},);


MovieCard.defaultProps = {
    size: 1,
    heartvisible: true,
}


export default MovieCard;