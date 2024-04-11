import { useState, useRef, useEffect } from "react";

function ReactionGame()
{
    const [endTime, setEndTime] = useState(null);
    const [output, setOutput] = useState(null);
    const [unit, setUnit] = useState(null);
    const [user, setUser] = useState("");
    const [sum, setSum] = useState(0);
    const [count, setCount] = useState(0);
    const canvasRef = useRef(null);
    var result = endTime;
    const [lastScore, setLastScore] = useState(null);
    const [dynamictxt, setDynamictxt] = useState(null);
    const [lastunit, setLastunit] = useState(null);

    const [compare, setCompare] = useState(0);
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
            // console.log("starttime:", start);
            canvasRef.current.addEventListener('click', async function() {
                
                let date2 = new Date().getTime();
                if(result === 0) {
                    setEndTime(date2 - start);
                    result = endTime;
                    setOutput("Time: ");
                    setUnit(" ms");
                    setCount(count + 1);
                }
            })
        }, time)
        
    }

    const startGame = () => {
        canvasRef.current.style.backgroundColor = 'rgb(243,16,16)';
        // console.log("game start");
        let changeColorTime = randomTime(8); //max time as 8 sec.
        result = 0;
        setOutput(null);
        setUnit(null);
        setEndTime(null);
        setDynamictxt(null);
        setLastScore(null);
        setLastunit(null);
        setCompare(0);
        getStartingtime(changeColorTime);
    };

    const calcAve = () => {
        if (compare > 0)
        {
            return;
        }
        if (!isNaN(+result) ) 
        {
            setCompare(compare+1);
            setSum(sum + result);
            
            // console.log("score",result);
            // console.log("count", count);
            // console.log("sum", sum);
    
            if(count === 5) {
                // console.log("show result ave");
                // console.log((sum +result) / 5);
                setLastScore(result);
                setLastunit(" ms");
                setDynamictxt("Time: ");
                result = (sum +result) / 5;
                setSum(0);
                setCount(0);
                setOutput("Your Averge Reaction Time is: ");
                setEndTime(result);
                submitStats();
            }
            
        }
    };

    const submitStats = async () => {

        let time = new Date();
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        const date = time.getDate();
        let day = `${month}-${date}-${year}`;
        // console.log("date: " , day);
        // console.log("to leaderboard::",result);
        if ((!isNaN(+result)) && (!(user === "")))
        {
            // send the score to leaderboard
            var obj = { username: user, time: result, date: day, device: "Computer" };
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
        <div className="text-center" style={{}}>
            <div>
                <h1 className="mt-5">Reaction Test</h1>
                <h5 className="m-1">Click the Area When Color Change To <span className="text-success fw-bold">GREEN</span></h5>
                <p className="m-1">This Test Will Take The Average Of 5 trials</p>
                <p className="m-1">You have {5-count} {(count === 4)? "round":"rounds"} left</p>
            </div>
            <div>
            </div>
            <button className="btn btn-primary m-2" onClick={startGame}>Start</button>
            <h4>{dynamictxt}{lastScore}{lastunit}</h4>
            <h4>
                {endTime !== null && <span> {output}{endTime}{unit}</span>}
            </h4>
            <canvas onClick={calcAve} className="w-100" style={{height: "70vh"}} ref={canvasRef}></canvas>
        </div>
    )
}
export default ReactionGame;
