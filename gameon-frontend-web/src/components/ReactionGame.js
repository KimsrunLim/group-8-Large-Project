import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

function ReactionGame()
{
    const [endTime, setEndTime] = useState(null);
    const [output, setOutput] = useState(null);
    const [unit, setUnit] = useState(null);
    
    const canvasRef = useRef(null);
    var result = 0;
    
    const randomTime = (max) => {
        let time = Math.floor(Math.random() * Math.floor(max) ) + 1;
        time *= 1000;
        console.log("time:", time);
        return time;
    }

    function getStartingtime(time) {

        canvasRef.current.addEventListener('click', function() {
            if(canvasRef.current.style.backgroundColor === "rgb(243, 16, 16)") {
                setEndTime("Too Early, Please Restart The Game");
                result = -1;
                return;
            }
        })
        setTimeout( function() {
            
            let data1 = new Date();
            let start = data1.getTime();
            if(result === 0) {
                canvasRef.current.style.backgroundColor = 'rgb(78,197,78)'; //green
            }
            console.log("starttime:", start);
            canvasRef.current.addEventListener('click', function() {

                let date2 = new Date().getTime();
                if(result === 0) {
                    setEndTime(date2 - start);
                    result = endTime;
                    setOutput("Time: ");
                    setUnit(" ms");
                }
            })
        }, time)
        
    }

    const startGame = () => {
        canvasRef.current.style.backgroundColor = 'rgb(243,16,16)';
        console.log("game start");
        let changeColorTime = randomTime(8); //max time as 8 sec.
        result = 0;
        setOutput(null);
        setUnit(null);
        setEndTime(null);
        getStartingtime(changeColorTime);

    };

    return(
        <div className="text-center">
            <div>
                <h1>ReactionGame</h1>
                <p>Click the area when color change to <span className="text-success fw-bold">GREEN</span></p>
            </div>
            <div>
            </div>
            <button className="btn btn-primary" onClick={startGame}>Start</button>
            <p>
                {endTime !== null && <span> {output}{endTime}{unit}</span>}
            </p>
            <canvas className="w-100" style={{height: "70vh"}} ref={canvasRef}><p>Mango</p></canvas>
        </div>
    )
}
export default ReactionGame;
