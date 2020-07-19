const electron = require('electron')
const dialog = electron.dialog
const log = require('electron-log')

// Current version of the app
const APP_VERSION = require('../package.json').version

// The url that the application is going to query for new release
const AUTO_UPDATE_URL =
    'https://api.update.rocks/update/github.com/emilnakao/suzu3/stable/' + process.platform + '/' + APP_VERSION

function init() {
    if (process.platform === 'linux') {
        console.log('Auto updates not available on linux')
    } else {
        console.log(AUTO_UPDATE_URL)
        initDarwinWin32()
    }
}

function initDarwinWin32() {
    electron.autoUpdater.on(
        'error',
        (err) => log.error(`Update error: ${err.message}`))

    electron.autoUpdater.on(
        'checking-for-update',
        () => log.info('Checking for update'))

    electron.autoUpdater.on(
        'update-available',
        () => log.info('Update available'))

    electron.autoUpdater.on(
        'update-not-available',
        () => log.info('No update available'))

    // Ask the user if update is available
    electron.autoUpdater.on(
        'update-downloaded',
        (event, releaseNotes, releaseName) => {
            log.info('Update downloaded')
            dialog.showMessageBox({
                type: 'question',
                buttons: ['Atualizar', 'Cancelar'],
                defaultId: 0,
                message: `Versão ${releaseName} disponível, gostaria de instalar agora?`,
                title: 'Atualização disponível'
            }, response => {
                if (response === 0) {
                    electron.autoUpdater.quitAndInstall()
                }
            })
        }
    )

    electron.autoUpdater.setFeedURL(AUTO_UPDATE_URL)
    electron.autoUpdater.checkForUpdates()
}

module.exports = {
    init
}