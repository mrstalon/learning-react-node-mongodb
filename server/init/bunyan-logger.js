import fs from 'fs';
import path from 'path';

import bunyan from 'bunyan';

const LOG_PATH = path.resolve(__dirname, '../../logs');

if (!fs.existsSync(LOG_PATH)) {
    fs.mkdirSync(LOG_PATH);
}

const logger = bunyan.createLogger({
    name: 'server',
    streams: [
        {
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'info',
            path: path.resolve(LOG_PATH, 'server-info.log'),
        },
    ],
});

export default logger;
