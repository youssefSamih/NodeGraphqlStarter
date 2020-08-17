import { IAppConfig } from '@interfaces/app.interfaces';
import { sync } from 'glob';
import { resolve } from 'path';
import '@lib/dotenv.lib';

const config: IAppConfig = {
    env: process.env.NODE_ENV || 'local',
    files: {
        models: sync(resolve(__dirname, '../models/**.model.js')),
        routes: sync(resolve(__dirname, '../routes/**.routes.js')),
    },
    app: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    },
    lib: {
        mongoose: {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    },
    db: {
        uri:
            process.env.MONGODB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.MONGOLAB_URI ||
            `mongodb://${process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'}/app-dev`,
        options: {
            authSource: process.env.MONGODB_USERNAME ? 'admin' : undefined,
            user: process.env.MONGODB_USERNAME || '',
            pass: process.env.MONGODB_PASSWORD || '',
            useNewUrlParser: true,
            autoIndex: false,
            useFindAndModify: false,
            useUnifiedTopology: true
        },
        debug: !!process.env.MONGODB_DEBUG,
    },
};

export default config;