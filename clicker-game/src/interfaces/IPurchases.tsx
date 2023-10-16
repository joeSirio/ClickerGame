import { PurchaseOptions } from "@/enums/purchaseOptions";


interface IPurchases {
    id: number,
    purchase: PurchaseOptions,
    passiveIncrease: number,
    amount: number,
    nextPurchaseCost: number
}

export default IPurchases;