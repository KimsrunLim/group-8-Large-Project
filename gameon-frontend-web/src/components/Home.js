import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import temp1 from "../assets/astronaut.png";
import temp2 from "../assets/celebrating.png";
import temp3 from "../assets/taken.png";

// add more as games built
const gameView = [
  {
    name: 'typeRacer',
    img: temp1,
    overview: 'type as fast as you can'
  },
  {
    name: 'game2',
    img: temp2,
    overview: 'game description 2'
  },
  {
    name: 'game3',
    img: temp3,
    overview: 'game description 3'
  },
];

function Home()
{
  const settings = {

    slidesToScroll: 1,
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500
  };

  return (
  <div className="center w-3/4">
    <div className="mt-20">
      <Slider {...settings}>
        {gameView.map((item) => (
          <div>
            <div className="text-center">
              <img src={item.img} alt="gameimg" className="h-44 w-44 rounded-full block mx-auto" />
            </div>
            
            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <p className="text-xl font-semibold text-center">{item.name}</p>
              <p className="text-center">{item.overview}</p>
              <button className="bg-black text-white text-lg">Play</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
  );
}

export default Home;