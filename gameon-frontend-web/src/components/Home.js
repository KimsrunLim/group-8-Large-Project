import React, { useState } from 'react';
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reactionPreview from "../assets/game2.gif";
import typingPreview from "../assets/game1.gif";
import "../pages/SpeedTypingPage"
import Carousel from 'react-bootstrap/Carousel';

function Home()
{
  return (
    <Carousel indicators={false} data-bs-theme="dark">
      <Carousel.Item withinterval={5000}>
          <div className="text-center">
            <img  className='mb-4' src={typingPreview} alt='#'/>
            <h2 className="text-black mb-4">Typing Speed Test</h2>
            <a href= {"speedtyping"} className="btn btn-info" tabindex="-1" role="button">Play</a>
          </div>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
          <div className="text-center">
            <img className='mb-4' src={reactionPreview} alt='#'/>
            <h2 className="text-black text-center mb-4">Reaction Speed Test</h2>
            <a href= {"reactiongame"} className="btn btn-info" tabindex="-1" role="button">Play</a>
          </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;