import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import temp1 from "../assets/astronaut.png";
import temp2 from "../assets/celebrating.png";
import temp3 from "../assets/taken.png";
import "../pages/SpeedTypingPage"

// add more as games built
const gameView = [
  {
    name: 'Type Racer',
    img: temp1,
    overview: 'type as fast as you can',
    link: "speedtyping"
  },
  {
    name: 'Reaction Game',
    img: temp2,
    overview: 'click when the screen color change',
    link: "reactiongame"
  },
  // {
  //   name: 'game3',
  //   img: temp3,
  //   overview: 'game description 3',
  //   link: "reactiongame"
  // },
];

function Home()
{
  const settings = {
    slidesToScroll: 1,
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 2,
    // autoplay: true,
    // autoplaySpeed: 2000,
    speed: 500
  };

  return (
  <div className="center items-center">
    <div className="mt-20">
      <Slider {...settings}>
        {gameView.map((item) => (
          <div>
            <div className="text-center">
              <img src={item.img} alt="gameimg" height="500rh" className="h-44 w-44 rounded-full block mx-auto" />
            </div>
            
            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <h1 className="text-xl font-semibold text-center" >{item.name}</h1>
              <p className="text-center">{item.overview}</p>
              <a href= {item.link} class="btn btn-info" tabindex="-1" role="button">Play</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
  );
}

export default Home;