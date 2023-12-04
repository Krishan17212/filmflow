import './style.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadImage/Img'
import avatar from '../../../assets/avatar.png'
import { useSelector } from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
  } from "react-icons/bs";


const Cast = ({data,loading}) => {
    const { url } = useSelector((state) => state.home);

    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: <CustomArrow direction="prev" />,
        nextArrow: <CustomArrow direction="next" />,
        responsive: [
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              arrows: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              arrows: true,
            },
          },
        ],
      };

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
  return (
    <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        <Slider {...settings}>
                        {data?.map((item) => {
                            let imgUrl = item?.profile_path ? url?.profile + item?.profile_path  : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} alt={item.name}/>
                                    </div>
                                    <div className="name">
                                        {item.name}
                                    </div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            )
                        })}
                        </Slider>
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
  )
}

const CustomArrow = ({ direction, onClick }) => {
    const ArrowIcon =
      direction === "prev"
        ? BsFillArrowLeftCircleFill
        : BsFillArrowRightCircleFill;
    return (
      <div className={`${direction === "prev" ? 'carouselLeftNav' : 'carouselRightNav' } arrow ${direction}`} onClick={onClick}>
        <ArrowIcon />
      </div>
    );
  };

export default Cast
