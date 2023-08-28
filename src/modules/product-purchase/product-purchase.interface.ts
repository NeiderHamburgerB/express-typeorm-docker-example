export interface IProductPurchaseItem {
    productId: string;
    quantities: number;
};

export interface IProductPurchase {
    items: IProductPurchaseItem[];
};