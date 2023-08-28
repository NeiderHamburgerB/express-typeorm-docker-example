import { getOrmConfig } from "./config/database/ormconfig";
import { DataSource } from "typeorm";
import { entities } from "./models";
import app from ".";

const PORT = process.env.PORT || 3000;

let AppDataSource: DataSource | null = null;

const initializeAppDataSource = async () => {
    try {
        const config = getOrmConfig(entities, true);
        AppDataSource = new DataSource(config);

        await AppDataSource.initialize();

        console.log('App connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Inicializar AppDataSource
initializeAppDataSource();

export { AppDataSource };

