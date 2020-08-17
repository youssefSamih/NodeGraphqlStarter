import { Db } from "mongodb";
import { connect, set } from "mongoose";
import config from "@config/index";
import { red } from "chalk";

export default {
    async connect (): Promise<Db> {
        let connection;

        try {
            connection = await connect(config.db.uri, config.db.options);
        } catch (e) {
            console.error(red('Could not connect to MongoDB!'));
            throw e
        }

        set('debug', config.db.debug);
        return connection.connection.db;
    }
}