import React from 'react';
import Navbar from '../components/Navbar';
import LeaderBoard from '../components/LeaderBoard';


const LeaderBoardPage = () =>
{
    return(
        <div>
            <Navbar />
            <LeaderBoard />
            {/* <div class="row">
                <div class="col-4">detail card</div>
                <div class="p-5 col-7"><LeaderBoard /></div>
            </div> */}
            
        </div>
    );
}

export default LeaderBoardPage;