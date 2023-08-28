import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import env from "../environments/env";
import { join } from "path";

export const getOrmConfig = (
    customPathEntities?: string,
    synchronize = false,
) => {
    // Connection config Typeorm
    const config: PostgresConnectionOptions = {
        type: 'postgres',
        host: env.DATABASE_HOST || 'localhost',
        username: env.DATABASE_USER || "root",
        password: env.DATABASE_PASSWORD || "root",
        database: env.DATABASE_NAME || 'smartSoftDev', 
        port: Number(env.DATABASE_PORT) || 5435,
        entities: [join(__dirname, '**', '*.entity.{ts,js}'), customPathEntities],
        synchronize: synchronize,
    };

    return config;
};


