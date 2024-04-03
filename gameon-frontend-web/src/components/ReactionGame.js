import { useEffect, useState, useRef } from "react";
import $ from "jquery";

function ReactionGame()
{
    const [startTime, setStartTime] = useState(null);
    const [playTime, setPlayTime] = useState(0);
    const [endTime, setEndTime] = useState(null);
    const [game, setGame] = useState(false);
    const intervalRef = useRef(null);
    const canvasRef = useRef(null);
    $("body").css("background-color", "white");
    
  

    const randomTime = (max) => {
        let time = Math.floor(Math.random() * Math.floor(max) ) + 1;
        time *= 1000;
        console.log("time:", time);
        return time;
    }
    var timer;
    function getStartingtime(time) {
        
        var timeout= setTimeout( function() {
            let data1 = new Date();
            let start = data1.getTime();
            setStartTime(start);
            $("body").css("background-color", "green");
            canvasRef.current.style.backgroundColor = 'rgb(78,197,78)';
            console.log("starttime:", start);
            timer = setInterval(() => {
                setPlayTime(playTime+1);
            }, 1)

            canvasRef.current.addEventListener('click', function() {
                let date2 = new Date().getTime();
                console.log("endingtime: ",date2)
                setEndTime(date2 - start);
            })
        }, time)
  
    }

    
    const Start = () => {
        $("body").css("background-color", "white");
        console.log("game start");
        let changeColorTime = randomTime(8); //max time as 8 sec.
        setStartTime(0);
        setEndTime(0);
        setGame(true);

        getStartingtime(changeColorTime);

    };

    const calcTime = () => {
        console.log("gameover");
        let date2 = new Date();
        let end = date2.getTime();
        // setEndTime(end - startTime);
        setGame(false);
        $("body").css("background-color", "red");
        clearInterval(timer);
        setStartTime(0);
        return end;
    };
    return(
        <div class="text-center">
            <div>
                <h1>ReactionGame</h1>
                <p>Click Screen when color changed</p>
            </div>
            <div>
                <canvas className="bg-black" ref={canvasRef} onClick={calcTime}>green?</canvas>
            </div>
            <button className="btn btn-primary" onClick={Start}>Start</button>
            <p>Time: </p>
            {endTime !== null && <p>{endTime} ms</p>}
        </div>

    )
}
export default ReactionGame;
