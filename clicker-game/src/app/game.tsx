"use client";

import { PurchaseOptions } from "@/enums/purchaseOptions";
import { UpgradeOptions } from "@/enums/upgradeOptions";
import IPurchases from "@/interfaces/IPurchases";
import IUpgrades from "@/interfaces/IUpgrades";
import { useEffect, useState } from "react";
import BuyMenu from "./buyMenu";
import ClickerSection from "./clickerSection";
import GameInfo from "./gameInfo";
import UpgradeMenu from "./upgradeMenu";


export default function Game(){
    const [purchases, setPurchases] = useState<IPurchases[]>([]);
    const [upgrades, setUpgrades] = useState<IUpgrades[]>([]);
    const [passiveIncome, setPassiveIncome] = useState(500);
    const [clickBasePower, setClickBasePower] = useState(1);
    const [clickMultiplier, setClickMultiplier] = useState(1);
    const [clickPower, setClickPower] = useState(clickBasePower * clickMultiplier);
    const [score, setScore] = useState(0);
    const [ticking, setTicking] = useState(true);

    useEffect(() => {
        let purchases = [{
            id: 1,
            purchase: PurchaseOptions.furniture,
            passiveIncrease: 5,
            amount: 0,
            nextPurchaseCost: 50
        },
        {
            id: 2,
            purchase: PurchaseOptions.garden,
            passiveIncrease: 10,
            amount: 0,
            nextPurchaseCost: 500
        }];
        let upgrades = [{
            id: 1,
            upgrade: UpgradeOptions.clickPower,
            passiveIncrease: 1,
            amount: 0,
            nextUpgradeCost: 50
        },
        {
            id: 2,
            upgrade: UpgradeOptions.clickMultiplier,
            passiveIncrease: 0.1,
            amount: 0,
            nextUpgradeCost: 500
        }];

        setPurchases(purchases);
        setUpgrades(upgrades);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => ticking && handleGameTick(), 1e3)
        return () => clearTimeout(timer)
       }, [score, ticking])

    useEffect(() => {
        setClickPower(Math.ceil(clickBasePower * clickMultiplier))
    }, [clickBasePower, clickMultiplier])

    const handleGameItemClick = () =>{
        console.log('click');
        setScore(score + clickPower);
    }

    const handleGameTick = () => {
        setScore(score + passiveIncome)
    }

    const handlePurchaseClick = (purchaseOption: IPurchases) => {
        let newPurchases = purchases;
        let purchase = newPurchases.find(x => x.id === purchaseOption.id);
        let purchaseCost = purchase!.nextPurchaseCost;

        if(score < purchaseCost)
            return false;

        purchase!.amount+=1;
        purchase!.nextPurchaseCost = Math.pow((purchase!.amount * 3), 2) + purchaseCost;
        setPurchases(newPurchases);

        setPassiveIncome(passiveIncome + purchase!.passiveIncrease)

        setScore(score - purchaseCost);
    }

    const handleUpgradeClick = (upgradeOption: IUpgrades) => {
        let newUpgrades = upgrades;
        let upgrade = newUpgrades.find(x => x.id === upgradeOption.id);
        let upgradeCost = upgrade!.nextUpgradeCost;

        if(score < upgradeCost)
            return false;

            upgrade!.amount+=1;
        upgrade!.nextUpgradeCost = Math.pow((upgrade!.amount * 3), 2) + upgradeCost;
        setUpgrades(newUpgrades);

        if(upgradeOption.upgrade === UpgradeOptions.clickMultiplier){
            setClickMultiplier(Math.round((clickMultiplier + upgrade!.passiveIncrease) * 10) / 10)
        }
        else{
            setClickBasePower(clickBasePower + upgrade!.passiveIncrease)
        }

        setScore(score - upgradeCost);
    }

    return (
        <div className="game-wrapper">
            <BuyMenu purchaseOptions={purchases} handlePurchaseClick={handlePurchaseClick} />
            <GameInfo score={score} clickPower={clickPower} clickBasePower={clickBasePower} clickMultiplier={clickMultiplier} />
            <ClickerSection handleClick={handleGameItemClick} />
            <UpgradeMenu upgradeOptions={upgrades} handleUpgradeClick={handleUpgradeClick} />
        </div>
    )
}