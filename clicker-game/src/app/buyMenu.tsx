import IPurchases from "@/interfaces/IPurchases";

export default function BuyMenu(props: any){

    const purchaseClick = (purchaseOption: IPurchases) => {
        props.handlePurchaseClick(purchaseOption)
    }

    return(
        <div className="buy-menu">
            {props.purchaseOptions.map((option: IPurchases) => (
                <div className="purchase-option" key={option.id} onClick={() => {purchaseClick(option)}}>
                    <div className="purchase-info">
                        {option.purchase} : {option.nextPurchaseCost}
                    </div>
                    <div className="purchase-amount-owned">
                        {option.amount}
                    </div>
                </div>
            ))}
        </div>
    )
}