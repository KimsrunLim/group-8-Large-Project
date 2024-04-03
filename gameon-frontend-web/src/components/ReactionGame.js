import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

function ReactionGame()
{
    const [endTime, setEndTime] = useState(null);
    const canvasRef = useRef(null);
    var result = 444;
    var early = true;
    
    const randomTime = (max) => {
        let time = Math.floor(Math.random() * Math.floor(max) ) + 1;
        time *= 1000;
        console.log("time:", time);
        return time;
    }

    function getStartingtime(time) {

        setTimeout( function() {
            let data1 = new Date();
            let start = data1.getTime();
            
            canvasRef.current.style.backgroundColor = 'rgb(78,197,78)'; //green
            console.log("starttime:", start);
            early = false;

            canvasRef.current.addEventListener('click', function() {
                let date2 = new Date().getTime();
                if(result === 0) {
                    setEndTime(date2 - start);
                    result = endTime;
                }
            })
        }, time)
  
    }

    const startGame = () => {
        early = true;
        canvasRef.current.style.backgroundColor = 'rgb(243,16,16)';
        console.log("game start");
        let changeColorTime = randomTime(8); //max time as 8 sec.
        result = 0;
        setEndTime(null);

        getStartingtime(changeColorTime);

    };

    const endGame = () => {
        if (early)
        {
            console.log("YYY");
        }
    };
    return(
        <div class="text-center">
            <div>
                <h1>ReactionGame</h1>
                <p>Click the area when color change to <span className="text-success fw-bold">GREEN</span></p>
            </div>
            <div>
            </div>
            <button className="btn btn-primary" onClick={startGame}>Start</button>
            <p>
                 {endTime !== null && <p>Time: {endTime} ms</p>}
            </p>
            <canvas className="w-100 text-white" ref={canvasRef} onClick={endGame}></canvas>
        </div>
    )
}
export default ReactionGame;
