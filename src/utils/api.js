import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const get_tmdb_token = import.meta.env.VITE_APP_TMDB_TOKEN;

const TMDB_TOKEN = get_tmdb_token;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
}

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {headers, params});
        return data;
    }
    catch (err) {
        return err;
    }
}