const axios = require("axios").default
import Languages from "../constants/Languages";
import {
    TMDB_BASE_URL,
    TMDB_IMAGE_BASE_URL,
    TMDB_API_KEY,
    ENDPOINTS,
    YOUTUBE_BASE_URL,
} from "../constants/Urls";


const TMDB_HTTP_REQUEST = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    }
})


const getComingSoonMovies = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES)

const getNowPlayingMovies = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES)

const getMovieById = (movieId, append_to_response = "") => TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}`, append_to_response ? { params: { append_to_response } } : null)

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}${path}`

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`

const getLanguage = (language_Iso) => Languages.find((language => language.iso_639_1 === language_Iso))

const getAllgenres = () => {

    try {
        return TMDB_HTTP_REQUEST.get(ENDPOINTS.GENERS);
    } catch (error) {
        console.log("catch block called")
        console.log(error)
    }

}



export {
    getNowPlayingMovies,
    getPoster,
    getLanguage,
    getComingSoonMovies,
    getAllgenres,
    getMovieById,
    getVideo,
}