const log = require("electron-log");

export function logNewData(object) {
    log.info(`Novo registro: ${JSON.stringify(object)}`);
}
