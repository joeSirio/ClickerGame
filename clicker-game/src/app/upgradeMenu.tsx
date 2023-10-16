import IUpgrades from "@/interfaces/IUpgrades";


export default function UpgradeMenu(props:any){

    const upgradeClick = (upgradeOption: IUpgrades) => {
        props.handleUpgradeClick(upgradeOption)
    }

    return(
        <div className="upgrade-menu">
            {props.upgradeOptions.map((option: IUpgrades) => (
                <div className="upgrade-option" key={option.id} onClick={() => {upgradeClick(option)}}>
                    <div className="upgrade-info">
                        {option.upgrade} : {option.nextUpgradeCost}
                    </div>
                    <div className="upgrade-amount-owned">
                        {option.amount}
                    </div>
                </div>
            ))}
        </div>
    )
}