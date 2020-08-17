import 'module-alias/register';
import mongoose from "@lib/mongoose.lib";
import config from '@config/index';
import { start } from '@lib/express.lib';

(async () => {
    await mongoose.connect();
    start(config);
})();