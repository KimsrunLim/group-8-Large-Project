import React, { useState } from 'react';
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reactionPreview from "../assets/game2.gif";
import typingPreview from "../assets/game1.gif";
import "../pages/SpeedTypingPage"
import Carousel from 'react-bootstrap/Carousel';

function Home() {

  return (
    <Carousel indicators={false} data-bs-theme="dark" className='pt-5'>
      <Carousel.Item withinterval={5000}>
        <div className="text-center">
          <img className='mb-4 justify-content-center img-fluid' src={typingPreview} alt='#' />
          <h2 className="text-black mb-4">Measure how quickly and accurately</h2>
          <h2 className="text-black mb-4">you can type text within a minute!</h2>
          <a href={"speedtyping"} className="btn btn-primary btn-lg w-50" tabindex="-1" role="button">Play</a>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <div className="text-center">
          <img className='mb-4 justify-content-center img-fluid' src={reactionPreview} alt='#' />
          <h2 className="text-black text-center mb-4">Measure the speed at which</h2>
          <h2 className="text-black text-center mb-4">you can react to a specific cue!</h2>
          <a href={"reactiongame"} className="btn btn-primary btn-lg w-50" tabindex="-1" role="button">Play</a>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;