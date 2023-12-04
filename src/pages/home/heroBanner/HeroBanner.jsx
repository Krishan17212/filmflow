import { useState, useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {data, loading} = useFetch('/movie/upcoming');
  const {url} = useSelector((state) => state.home);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandlerButton = () => {
    if ( query.length > 0) {
      navigate(`/search/${query}`);
    }
  }

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  },[data]);

  return (
    <div className="heroBanner_wrapper">
      {! loading && <div className="backdrop_img">
        <Img src={background} alt={'background image'} />
      </div>}
      <ContentWrapper className="wrapper">
        <div className="heroBanner_content">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
          <input
            type="text"
            placeholder="Search for a movie or TV show...."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
          <button onClick={searchQueryHandlerButton}>Search</button>
        </div>
        </div>
        
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
