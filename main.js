/**
 * app 控制应用程序的事件生命周期
 * BrowserWindow 创建和管理应用程序窗口
 */
const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
	// 创建新的窗口
	const win = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	// 窗口中 需要加载的文件
	const loadFile = path.join(__dirname, 'index.html');
	win.loadFile(loadFile);
};

// app模块的ready事件 被激发后才能创建浏览器窗口
app.whenReady().then(() => {
	createWindow();

	// 如果没有新的窗口打开则打开一个新窗口
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// 窗口的生命周期
// 退出窗口
app.on('window-all-closed', () => {
	// console.log('process--->>>', process);
	// console.log('process.platform--->>>', process.platform);
	// 如果用户不是在macOS-darwin 上运行程序
	if (process.platform !== 'darwin') app.quit();
});
