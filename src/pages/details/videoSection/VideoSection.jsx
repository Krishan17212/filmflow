import React, { useState } from "react";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import PlayBtn from "../PlayBtn";
import VideoPopUp from "../../../components/videoPopUp/VideoPopUp";
import Img from "../../../components/lazyLoadImage/Img";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4.2,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    autoplay: true,
    className: "videoSlick_wrapper",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 1,
          arrows: false,
          speed: 1500,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            <Slider {...settings}>
              {data?.results?.map((video) => (
                <div
                  key={video.id}
                  className="videoItem"
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                      alt={video.name}
                    />
                    <PlayBtn />
                  </div>
                  <div className="videoTitle">{video.name}</div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopUp
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

const CustomArrow = ({ direction, onClick }) => {
  const ArrowIcon =
    direction === "prev"
      ? BsFillArrowLeftCircleFill
      : BsFillArrowRightCircleFill;
  return (
    <div
      className={`${
        direction === "prev" ? "carouselLeftNav" : "carouselRightNav"
      } arrow ${direction}`}
      onClick={onClick}
    >
      <ArrowIcon />
    </div>
  );
};

export default VideoSection;
