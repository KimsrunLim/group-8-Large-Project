import React, {useEffect, useState} from 'react';
import PlayerData from './PlayerData'
const API = '/api/leaderboard'

const LeaderBoard = () => {

    var firstName = '';
    var lastName = '';
    var username = '';
    var password = '';

    const [players, setPlayers] = useState([])
    const app_name = 'group8large-57cfa8808431'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }
        const fetchPlayer = async (url) => {
            var obj = { };
            var js = JSON.stringify(obj);
            try {
                const res = await fetch(buildPath('api/leaderboard'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                const player = await res.json();
                if (player.length > 0) {
                }
                setPlayers(player.results);
                console.log("This One: ", player);
            } catch (e) {
                console.error(e)
            }
        }

        useEffect(() => {
            fetchPlayer(API.results);
        }, []);

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
                        <tr>
                            <td>curPlayer</td>
                            <td>temp</td>
                            <td>123</td>
                            <td>123</td>
                            <td>456</td>
                            <td>device</td>
                            <td>2025-13-13</td>
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
                        <PlayerData players={filt(players)} /> 
                    </tbody>
                </table>

            </div>
        </div>
       </>
}

// filter
function filt(data){
    console.log(data);

    // TBD
    let filter = data.filter(val => {
        return val;
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })

}

export default LeaderBoard;