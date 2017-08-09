// import {controls} from './controls';
// import {mb} from './window';
import {BrowserWindow, app, webContents} from 'electron';
import request from 'request';
import menubar from 'menubar';


const mb = menubar({
  width: 350,
  height: 320,
  resizable: false,
  icon: process.cwd() + '/images/icon.png'

})


app.on('ready', () => {

  // mb.on('after-create-window', function(){
  //  mb.window.openDevTools()
  // })

})
