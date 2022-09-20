
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GenreCard from '../components/GenreCard';
import ItemSeperator from '../components/ItemSeperator';
import Colors from '../constants/Colors';
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getNowPlayingMovies, getComingSoonMovies, getAllgenres } from '../services/MovieService';

// const Genres = ["All", "Action", "Comedy", "Romance", "Horror",]

const HOmeScreen = ({ navigation }) => {

    const [activeGenre, setActiveGenre] = useState("All")

    const [nowPlayingMovies, setNowplayingMovies] = useState({})
    const [comingSoonMovies, setComingSoonMovies] = useState({})
    const [genres, setGenres] = useState([{ id: 10110, name: "All" }])


    useEffect(() => {
        getNowPlayingMovies().then((movieresponse => setNowplayingMovies(movieresponse.data)));
        getComingSoonMovies().then((movieresponse => setComingSoonMovies(movieresponse.data)));
        getAllgenres().then((genreresponse => setGenres([...genres, ...genreresponse.data.genres])));
    }, []);

    return (
        <ScrollView style={styles.container}>

            <StatusBar
                style='auto' translucent={false} backgroundColor={Colors.BASIC_BG} />

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle} >Now Showing</Text>
                <Text style={styles.headerSubtitle} >VIEW ALL</Text>
            </View>

            <View style={styles.genreListContainer}>
                <FlatList
                    horizontal
                    data={genres}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={() => <ItemSeperator width={20} />}
                    ListFooterComponent={() => <ItemSeperator width={20} />}
                    ItemSeparatorComponent={() => <ItemSeperator width={20} />}
                    renderItem={({ item, index }) => <GenreCard
                        genereName={item.name}
                        active={item.name === activeGenre}
                        onPress={setActiveGenre} />}
                />
            </View>

            <View>
                <FlatList
                    horizontal
                    data={nowPlayingMovies.results}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={() => <ItemSeperator width={20} />}
                    ListFooterComponent={() => <ItemSeperator width={20} />}
                    ItemSeparatorComponent={() => <ItemSeperator width={20} />}
                    renderItem={({ item, index }) =>
                        <MovieCard
                            title={item.title}
                            language={item.original_language}
                            voteAverage={item.vote_average}
                            voteCount={item.vote_count}
                            poster={item.poster_path}
                            onPress={() => navigation.navigate("movie", { movieId: item.id })}
                        />
                    }
                />
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle} >Coming Soon</Text>
                <Text style={styles.headerSubtitle} >VIEW ALL</Text>
            </View>

            <ItemSeperator height={10} />

            <View>
                <FlatList
                    horizontal
                    data={comingSoonMovies.results}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={() => <ItemSeperator width={20} />}
                    ListFooterComponent={() => <ItemSeperator width={20} />}
                    ItemSeparatorComponent={() => <ItemSeperator width={20} />}
                    renderItem={({ item, index }) =>
                        <MovieCard
                            title={item.title}
                            language={item.original_language}
                            voteAverage={item.vote_average}
                            voteCount={item.vote_count}
                            poster={item.poster_path}
                            size={0.6}
                            heartvisible={false}
                            onPress={() => navigation.navigate("movie", { movieId: item.id })}
                        />
                    }
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
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    headerTitle: {
        fontSize: 23,
    },
    headerSubtitle: {
        fontSize: 13,
        color: Colors.ACTIVE,
    },
    genreListContainer: {
        paddingVertical: 10,
    },

});


export default HOmeScreen;