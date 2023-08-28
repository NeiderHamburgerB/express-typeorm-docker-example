export interface IProduct{
    id?:string,
    name:string
    category:string
    price:number
    quantity:number
};

export interface IUpdateProduct {
    name?:string
    category?:string
    price?:number
    quantity?:number
};

