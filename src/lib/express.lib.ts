import { IAppConfig, IRoute } from "@interfaces/app.interfaces";
import Express from 'express';
import { init as initApolloServer } from "./apollo.lib";
import { AddressInfo } from "net";

export async function start(config: IAppConfig): Promise<void> {
    const app = Express();

    initApolloServer(app);

    config.files.routes.forEach((path) => {
        const { route } = require(path) as { route: IRoute };
        app.use(route.prefix, route.r);
    });

    const server = app.listen(config.app.port, config.app.host, () => {
        const { address, port } = server.address() as AddressInfo;
        console.info('server started ar http://%s:%s/graphql', address, port);
    });
}