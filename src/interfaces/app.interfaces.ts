import {
    SchemaOptions,
    ConnectionOptions
} from "mongoose";
import { Router } from "express";

export interface IDeferred {
    key: string;
    uri: string;
}

export interface IAppConfig {
    files: {
        models: string[];
        routes: string[];
    },
    env: string;
    app: {
        host: string;
        port: number;
    },
    lib: {
        mongoose: SchemaOptions;
    },
    db: {
        uri: string;
        options: ConnectionOptions,
        debug: boolean;
    }
};

export interface IRoute {
    r: Router;
    prefix: string;
}