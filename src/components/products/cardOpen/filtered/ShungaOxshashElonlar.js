import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useUserContext } from "../../../../Contexts/Context";
// import required modules
import { Pagination, Navigation } from "swiper";
import Moment from "react-moment";

import { Link } from "react-router-dom"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import './styleElon.scss'
function ShungaOxshashElonlar( ) {
  const { products, onCardItemClick,cardItemCategory } = useUserContext();
  return (
    <div className="col-12 boshqaElonlar">
      <div className="row">
        <h4>O'xshash e'lonlar   </h4>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products
            .filter((f) => f.category === cardItemCategory)
            .map((itm, idx) => (
              <SwiperSlide key={idx}>
                <div className="col-8   " key={idx}>
                  <div className="card  ">
                    <div className="photo">
                      <Link
                        onClick={() => onCardItemClick(itm)}
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
                          onClick={() => onCardItemClick(itm)}
                          to={`/card/${itm.category}/${itm.name}/${itm.ID}`}
                        >
                          <small>{itm.sarlavha} </small>
                        </Link>
                      </h4>
                      <small className="small">
                        {itm.joylashuv}
                      </small>
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
                          {itm.narx} so'm{" "}
                        </small>
                        <IconButton>
                          <FavoriteBorderIcon className="like_icon" />
                        </IconButton>
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

export default ShungaOxshashElonlar;
