const PlayerData = ({players}) => {
    return(
        <>
            {
                players.map((curPlayer,index) => {
                    const {Username, Accuracy, Speed, Score, Device, Date} = curPlayer;
                
                    return(
                        <tr>
                            <td>{index + 1}</td>
                            <td>{Username}</td>
                            <td>{Accuracy}</td>
                            <td>{Speed}</td>
                            <td>{Score}</td>
                            <td>{Device}</td>
                            <td>{Date}</td>
                        </tr>
                    )
                    
                })
            }
        </>
    )
}
export default PlayerData;