export interface IUser {
    id?:any,
    document:{
        type:string,
        value:string
    }
    name:string
    lastname:string
    email:string
    password?:string,
    roles:string[]
}

export interface IUserCreate{
    document:{
        type:string,
        value:string
    }
    name:string
    lastname:string
    email:string
    password:string
    roles:string[]
}

export interface IUserUpdate {
    document?:{
        type:string,
        value:string
    }
    name?:string
    lastname?:string
    email?:string
}


export interface IUserSearch{
    email?:string ,
    id?:string
}