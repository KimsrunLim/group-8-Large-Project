import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {

    const [players, setPlayers] = useState([]);
    const [curUser, setCurUser] = useState([]);

    const app_name = 'group8large-57cfa8808431';

    let username = "";
    var rank = 1;

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

    function readCookie() {
        let data = document.cookie;
        let tokens = data.split("=");
        if (tokens[0] == "username") {
            username = tokens[1];
        }

        if (username == "") {
            console.log("Dont display current user");
        } else {
            console.log("Display current user");
        }
    }

    const fetchPlayer = async event => {
        var obj = {};
        var js = JSON.stringify(obj);
        try {
            const res = await fetch(buildPath('api/leaderboard'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            const player = await res.json();

            setPlayers(player.results);

            var ourUser = player.results.find(x => x.Username === username);
            ourUser.Rank = player.results.findIndex(x => x.Username === username) + 1;

            setCurUser(ourUser);

        } catch (e) {
            console.error(e)
        }
    }

    return <>
        <div className='row align-items-center'>
            {/* Detail */}
            <div className='p-5 col-4'>
                <div className="card" >
                    <div className="card-body">
                        <h3 className="card-title">Player Name: </h3>
                        <h5 className="card-subtitle mb-2 text-muted">Best Score:</h5>
                        <p className="card-text">Other Scores1</p>
                        <p className="card-text">Other Scores2</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>

            {/* Rank list */}
            <div className="p-5 col-7">
                <table className="table table-striped">

                    <thead className="bg-info">
                        <tr>
                            <td>{curUser.Rank}</td>
                            <td>{curUser.Username}</td>
                            <td>{curUser.Accuracy}</td>
                            <td>{curUser.Speed}</td>
                            <td>{curUser.Score}</td>
                            <td>{curUser.Device}</td>
                            <td>{curUser.Date}</td>
                        </tr>


                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Accuracy</th>
                            <th>Speed</th>
                            <th>Score</th>
                            <th>Device</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player.username}>
                                <td>{rank++}</td>
                                <td>{player.Username}</td>
                                <td>{player.Accuracy}</td>
                                <td>{player.Speed}</td>
                                <td>{player.Score}</td>
                                <td>{player.Device}</td>
                                <td>{player.Date}</td>
                            </tr>
                        ))}
                    </tbody>
                    {/* <tbody>
                        <PlayerData players={players} />
                    </tbody> */}
                </table>

            </div>
        </div>
    </>
}

export default LeaderBoard;