

export default function GameInfo(props:any) {
    
    return (
        <div className="game-info">
            <div className="score">
                Money: ${props.score}
            </div>
            <div className="click-power">
                Click Power: {props.clickPower}
            </div>

            <div className="click-power-info">
                Click Base Power: {props.clickBasePower}
                &nbsp;
                Click Multiplier: {props.clickMultiplier}
            </div>
        </div>
    )
}