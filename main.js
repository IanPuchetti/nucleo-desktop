
const fs = require('fs')

var server='';
global.shared = {close:false, server:''};
function main (){
  fs.readFile('server', 'utf8', function (err,data) {
  server = "http://"+data+"";
  global.shared.server=data;
  createWindow();
});
}

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')


var http = require('http');
var api = http.createServer(function(req, res) {
});
var io = require('socket.io').listen(api);

io.sockets.on('connection', function(socket) {
  socket.on('disconnect', function (){
  });
  socket.on('cargar', function (data){io.sockets.emit('abrir-gestion',data);});
  socket.on('cerrar-gestion', function (data){io.sockets.emit('cerrar-gestion',data);});
  socket.on('gestionado', function (data){io.sockets.emit('gestionado',data);});
  socket.on('campania', function (data){io.sockets.emit('campania',data);});
  socket.on('telefonos', function (data){io.sockets.emit('telefonos',data);});
});

api.listen(3000);

let mainWindow

function resize(x,y){
mainWindow.setSize(x, y);
}
exports.resize= resize;

function createWindow () {
  mainWindow = new BrowserWindow({width: 0, height: 0, icon: "./build/icon.ico", frame:false, resizable:false});
  mainWindow.loadURL(server);
  mainWindow.on('close', function(event) {
    if(global.shared.close==false){
      event.preventDefault();}
  });

let contents = mainWindow.webContents;

mainWindow.setMenu(null);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', main)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
