const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');

function createWindow() {
    const windowWidth = 1200;
    const windowHeight = 850;

    const win = new BrowserWindow({
        width: 1200,
        height: 850,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadFile('index.html');

    const view = new BrowserView();
    win.addBrowserView(view);
    view.setBounds({ x: 0, y: 0, width: windowWidth/2, height: windowHeight });
    view.setAutoResize({ width: true, height: true, horizontal: true, vertical: true });
    view.webContents.loadURL('http://orteil.dashnet.org/cookieclicker/');

    const view2 = new BrowserView();
    win.addBrowserView(view2);
    view2.setBounds({ x: windowWidth/2, y: 0, width: windowWidth/2, height: windowHeight });
    view2.setAutoResize({ width: true, height: true, horizontal: true, vertical: true });
    view2.webContents.loadURL('https://ducdat0507.github.io/prestreestuck/');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
