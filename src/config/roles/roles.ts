import { AccessControl } from "accesscontrol";
export enum RolesApp {
    ADMIN    = 'ADMIN',
    USUARIO  = 'USUARIO'
};

export enum ResourcesApp {
    PRODUCT = 'PRODUCT',
    USER = 'USER',
    PRODUCT_PURCHASE = 'PRODUCT_PURCHASE'
};

const ac = new AccessControl();
export const roles = (function() {
    ac
        //ROL DE USUARIO
        .grant(RolesApp.USUARIO)
            .readAny([ResourcesApp.PRODUCT])
            .createOwn([ResourcesApp.PRODUCT_PURCHASE])
            .readOwn([ResourcesApp.PRODUCT_PURCHASE])  
            
        // ROL DE ADMIN
        .grant(RolesApp.ADMIN)
            .readAny([ResourcesApp.PRODUCT])    
            .createAny([ResourcesApp.PRODUCT])
            .updateAny([ResourcesApp.PRODUCT])
            .deleteAny([ResourcesApp.PRODUCT])
            .readAny([ResourcesApp.PRODUCT_PURCHASE])  

    return ac
})();

