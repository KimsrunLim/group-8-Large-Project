import React, { useState } from 'react';
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import temp1 from "../assets/astronaut.png";
import temp2 from "../assets/celebrating.png";
// import temp3 from "../assets/taken.png";
import "../pages/SpeedTypingPage"

import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
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
    lazeload: true,
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
    <Carousel indicators={false} data-bs-theme="dark">
      <Carousel.Item withinterval={5000}>
          <div className="text-center">
            <img src={temp1} alt='#' className="bg-black"/>
            <h2 className="text-black">Type Racer</h2>
            <p className="text-black">type as fast as you can</p>
            <a href= {"speedtyping"} className="btn btn-info" tabindex="-1" role="button">Play</a>
          </div>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
          <div className="text-center">
            <img src={temp2} alt='#'/>
            <h2 className="text-black text-center">Reaction Game</h2>
            <p className="text-black text-center">click when the screen color change</p>
            <a href= {"reactiongame"} className="btn btn-info" tabindex="-1" role="button">Play</a>
          </div>
      </Carousel.Item>
      {/* <Carousel.Item>
      <img src={temp3} alt='#'/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default Home;