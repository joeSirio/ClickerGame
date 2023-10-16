import { UpgradeOptions } from "@/enums/upgradeOptions";


interface IUpgrades {
    id: number,
    upgrade: UpgradeOptions,
    passiveIncrease: number,
    amount: number,
    nextUpgradeCost: number
}

export default IUpgrades;