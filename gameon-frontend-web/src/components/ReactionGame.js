import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

function ReactionGame()
{
    const [endTime, setEndTime] = useState(null);
    const [output, setOutput] = useState(null);
    const [unit, setUnit] = useState(null);
    const [user, setUser] = useState("");
    
    const canvasRef = useRef(null);
    var result = endTime;

    const app_name = 'group8large-57cfa8808431'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }
    let curUsername = "";
    // get cur user
    useEffect(() => {
        readCookie();
    }, []);

    const readCookie = () => {
        let data = document.cookie;
        let tokens = data.split("=");
        if (tokens[0] === "username") {
            curUsername = tokens[1];
        }

        setUser(curUsername);
    }

    const randomTime = (max) => {
        let time = Math.floor(Math.random() * Math.floor(max) ) + 1;
        time *= 1000;
        console.log("time:", time / 1000, "s");
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
            canvasRef.current.addEventListener('click', async function() {
                
                let date2 = new Date().getTime();
                if(result === 0) {
                    setEndTime(date2 - start);
                    result = endTime;
                    setOutput("Time: ", result, " ms");
                    setUnit(" ms");
                    
                }
            })
        }, time)
        
    }

    const startGame = () => {
        canvasRef.current.style.backgroundColor = 'rgb(243,16,16)';
        console.log("game start");
        let changeColorTime = randomTime(2); //max time as 8 sec.
        result = 0;
        setOutput(null);
        setUnit(null);
        setEndTime(null);
        getStartingtime(changeColorTime);

    };

    const submitStats = async (payload) => {
        if (!isNaN(+result))
        {
            // send the score to leaderboard
            var obj = { username: user, time: result, date: "smaple", device: "Computer" };
            var js = JSON.stringify(obj);

            try {
                const response = await fetch(buildPath('api/addReactionData'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                var res = JSON.parse(await response.text());
                
            } catch (error) {
                console.error('Failed to send typing data:', error);
            }
        }
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
            <canvas onClick={submitStats} className="w-100" style={{height: "70vh"}} ref={canvasRef}></canvas>
        </div>
    )
}
export default ReactionGame;
