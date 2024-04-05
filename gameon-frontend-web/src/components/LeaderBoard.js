import React, { useEffect, useState } from 'react';
import PlayerData from './PlayerData'

const LeaderBoard = () => {

    const [players, setPlayers] = useState([]);
    const [curUser, setCurUser] = useState([]);
    const [curRank, setCurRank] = useState('');
    const app_name = 'group8large-57cfa8808431';

    let username = "";

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
        fetchUser();
        fetchPlayer();
    }, []);

    const fetchPlayer = async event => {
        var obj = {};
        var js = JSON.stringify(obj);
        try {
            const res = await fetch(buildPath('api/leaderboard'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            const player = await res.json();

            setPlayers(player.results);

            var count = 1;
            players.forEach(element => {
                if (element.Username === username) {
                    setCurRank(count);
                }
                count += 1;
            });
        } catch (e) {
            console.error(e)
        }
    }

    const fetchUser = async event => {
        var obj = { username };
        var js = JSON.stringify(obj);
        try {
            const res = await fetch(buildPath('api/userData'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            const user = await res.json();

            setCurUser(user.results);
        } catch (e) {
            console.error(e)
        }
    }

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

    return <>
        <div class='row align-items-center'>
            {/* Detail */}
            <div class='p-5 col-4'>
                <div class="card" >
                    <div class="card-body">
                        <h3 class="card-title">Player Name: </h3>
                        <h5 class="card-subtitle mb-2 text-muted">Best Score:</h5>
                        <p class="card-text">Other Scores1</p>
                        <p class="card-text">Other Scores2</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>

            {/* Rank list */}
            <div class="p-5 col-7">
                <table class="table table-striped">

                    <thead class="bg-info">
                        {/* <PlayerData players={curUser}/> */}
                        <tr>
                        </tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Accuracy</th>
                        <th>Speed</th>
                        <th>Score</th>
                        <th>Device</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        <PlayerData players={players} />
                    </tbody>
                </table>

            </div>
        </div>
    </>
}

export default LeaderBoard;