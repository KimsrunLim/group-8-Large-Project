import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';

const LeaderBoard = () => {

    const [players, setPlayers] = useState([]);
    const [curUser, setCurUser] = useState([]);


    const app_name = 'group8large-57cfa8808431';

    const [username, setUsername] =useState("");
    // let username;
    var rank = 1;
    const reactionHeader = () => {
        return(
            <>
            <tr class="col-7 overflow-auto">
                <th className='bg-info bg-gradient'>Rank</th>
                <th className='bg-info bg-gradient'>Player</th>
                <th className='bg-info bg-gradient'></th>
                <th className='bg-info bg-gradient'></th>
                <th className='bg-info bg-gradient'>Time</th>
                <th className='bg-info bg-gradient'></th>
                <th className='bg-info bg-gradient'>Device</th>
                <th className='bg-info bg-gradient'>Date</th>
            </tr>
            </>
        )
    }

    const speedTypingHeader = () => {
        return(
            <>
            <tr class="col-7 overflow-auto">
            <th className='bg-info bg-gradient'>Rank</th>
            <th className='bg-info bg-gradient'>Name</th>
            <th className='bg-info bg-gradient'>Accuracy</th>
            <th className='bg-info bg-gradient'>Speed</th>
            <th className='bg-info bg-gradient'></th>
            <th className='bg-info bg-gradient'>Score</th>
            <th className='bg-info bg-gradient'>Device</th>
            <th className='bg-info bg-gradient'>Date</th> 
            </tr>
            </>
        )  
    }

    const [header, setHeader] = useState(speedTypingHeader());
    // var gameData = 'api/ReactionLeaderboard';
    var gameData = 'api/TypingLeaderboard';
    
    const handleSelect = (selectedKey) => {
        console.log("here?", username);
        if (selectedKey === "link-1") {
            setHeader(speedTypingHeader());
            gameData = 'api/TypingLeaderboard';
            console.log("Speed userData:", curUser);

        } else if (selectedKey === "link-2") {
            setHeader(reactionHeader());
            gameData = 'api/ReactionLeaderboard';
            console.log("React userData:", curUser);
        }
        
        fetchPlayer();
    };


    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }

    useEffect(() => {
        readCookie();
        fetchPlayer();
    }, []);

    const readCookie = () => {
        let data = document.cookie;
        let tokens = data.split("=");
        if (tokens[0] === "username") {
            setUsername(tokens[1]);
        }
    }


    // initial table without user data row cuz call 
    //readCookie() and fetchplayer at the same time, computer hasnot got username yet
    const fetchPlayer = async () => {
        var obj = {};
        var js = JSON.stringify(obj);
        try {
            const res = await fetch(buildPath(gameData),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            const player = await res.json();

            setPlayers(player.results);

            // add case when user not found in leaderboard
            var ourUser = player.results.find(x => x.Username === username);
            console.log(username);
            if (ourUser) {
                console.log(`User ${ourUser.Username} found!`);
                ourUser.Rank = await player.results.findIndex(x => x.Username === username) + 1;
                console.log("hereh",ourUser);
                setCurUser(ourUser);

            } else {
                // User not found
                console.log("User not found");
                setCurUser("");
            }
    
        } catch (e) {
            console.error(e)
        }
    }

    
    return <>
               
        <div className='d-flex p-5 align-items-center justify-content-center' style={{ height: "90vh" }}>
            {/* Rank list */}
            <div className="col-8 overflow-auto h-100" style={{ border: "2px solid black", borderRadius:"10px" }}>
                <Nav justify variant="tabs" defaultActiveKey="/home" onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Type Racer</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Reaction Game</Nav.Link>
                    </Nav.Item>
                </Nav>
                <table className="table table-striped">
                    <thead className='sticky-top'>
                        <tr>
                            <td>{curUser.Rank}</td>
                            <td>{curUser.Username}</td>
                            <td>{curUser.Accuracy}</td>
                            <td>{curUser.Speed}</td>
                            <td>{curUser.Time}</td>
                            <td>{curUser.Score}</td>
                            <td>{curUser.Device}</td>
                            <td>{curUser.Date}</td>
                        </tr>
                        {header}
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player.username}>
                                <td>{rank++}</td>
                                <td>{player.Username}</td>
                                <td>{player.Accuracy}</td>
                                <td>{player.Speed}</td>
                                <td>{player.Time}</td>
                                <td>{player.Score}</td>
                                <td>{player.Device}</td>
                                <td>{player.Date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    </>
}

export default LeaderBoard;