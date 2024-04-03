const PlayerData = ({players}) => {
    return(
        <>
            {
                players.map((curPlayer,index) => {
                    const {name, speed, score, device, dt} = curPlayer;
                
                    return(
                        <tr>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{speed}</td>
                            <td>{score}</td>
                            <td>{device}</td>
                            <td>{dt}</td>
                        </tr>
                    )
                    
                })
            }
        </>
    )
}
export default PlayerData;