import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useUserContext } from "../../../../Contexts/Context";
// import required modules
import { Navigation } from "swiper";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import "./styleElon.scss";
import Likes from "./Likes";
function MuallifningBoshqaElonlari({  name }) {
  const { products,onCardItemClick } = useUserContext();
    function ClikcItmId(itm){
      onCardItemClick(itm)
      window.location.reload(false)
    }
  return (
    <div className="col-12 boshqaElonlar">
      <div className="row">
        <h4>Muallifning boshqa e'lonlari </h4>
        <hr />
        <Swiper
          slidesPerView={5}
          slidesPerGroup={1}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {products
            .filter((f) => f.name === name)
            .map((itm, idx) => (
              <SwiperSlide>
                <div className="col-11   " key={idx}>
                  <div className="card  ">
                    <div className="photo">
                      <Link
                        onClick={() => ClikcItmId(itm)}
                        to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                      >
                        <img
                          src={itm.url}
                          className={"img-fluid"}
                          alt="Error"
                        />
                      </Link>
                    </div>
                    <div className="context_">
                      <h4 className="sarlavha">
                        <Link
                          onClick={() => ClikcItmId(itm)}
                          to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                        >
                          <small>{itm.sarlavha.substr(0, 70)}... </small>
                        </Link>
                      </h4>
                      <small className="small">{itm.joylashuv}</small>
                      <small className="small">
                        <Moment format="D-MMM-YYYY">
                          {itm.timestamp?.toDate()}
                        </Moment>
                        {" - "}
                        <Moment format="hh:mm:ss">
                          {itm.timestamp?.toDate()}
                        </Moment>
                      </small>
                      <div className="d-flex align-items-center justify-content-between">
                        <small>
                          {itm.narx} {"  "} {itm.valyuta}
                        </small>
                        <Likes itm={itm} />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MuallifningBoshqaElonlari;
