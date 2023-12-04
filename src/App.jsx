import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import { useDispatch, useSelector } from "react-redux"
import { getApiConfigurations, getGenres } from "./store/homeSlice"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import PageNotFound from "./pages/error/PageNotFound"
import Details from "./pages/details/Details"
import Explore from "./pages/explore/Explore"
import SearchResult from "./pages/searchResult/SearchResult"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      const newUrl = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      }
      dispatch(getApiConfigurations(newUrl))
    })
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ['movie', 'tv'];
    let allGenres = {};

    endPoints.forEach((endpoint) => {
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
    });
    
    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    // console.log(allGenres);
    dispatch(getGenres(allGenres));
  }

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  },[]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
