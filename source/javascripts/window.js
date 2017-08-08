import {BrowserWindow} from 'electron';
import menubar from 'menubar';


export const mb = menubar({
	width: 350,
	height: 150,
	resizable: false,
	icon: process.cwd() + '/images/icon.png'

})


// mb.setOption("height", 500);

mb.on('after-create-window', function(){

	mb.window.openDevTools()


})
