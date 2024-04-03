import React, {useEffect, useState} from 'react';
import { LeaderboardData } from './tempDatabase';
import PlayerData from './PlayerData'
// const API = "links"

const LeaderBoard = () => {

<<<<<<< Updated upstream
=======
    // var firstName = '';
    // var lastName = '';
    // var username = '';
    // var password = '';

>>>>>>> Stashed changes
    const [players, setPlayers] = useState([])
    // Unlock when having api url
        const fetchPlayer = async (url) => {
            try {
                const res = await fetch(url);
                const player = await res.json();
                if (player.length > 0) {
                    setPlayers(player);
                }
                console.log(player);
            } catch (e) {
                console.error(e)
            }
        }

        useEffect(() => {
            // fetchUser(API);
        }, [])
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
                            <td>456</td>
                            <td>device</td>
                            <td>2025-13-13</td>
                        </tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Speed</th>
                        <th>Score</th>
                        <th>Device</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        <PlayerData players={filt(LeaderboardData)} />
                        {/* <PlayerData players={filt(players)} />   (api version) */}   
                    </tbody>
                </table>

            </div>
        </div>
       </>
}

// filter
function filt(data){

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