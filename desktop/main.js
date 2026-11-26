const { app, BrowserWindow, shell, dialog, Menu, ipcMain } = require('electron');
const { spawn } = require('node:child_process');
const path = require('node:path');
const os = require('node:os');
let child, window, quitting = false, ready = false, timeout;
const runtime = path.join(os.homedir(), 'Applications', 'DeepSeek Harness Runtime');
function stopServer() {
  if (!child || child.exitCode !== null) return;
  try { process.kill(-child.pid, 'SIGTERM'); } catch { try { child.kill('SIGTERM'); } catch {} }
}
function createWindow() {
  window = new BrowserWindow({ width: 1240, height: 820, minWidth: 390, minHeight: 500, title: 'dsh', backgroundColor: '#f8f8fa', show: false, titleBarStyle: 'default', webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'preload.js') } });
  window.on('page-title-updated', (event) => event.preventDefault());
  window.once('ready-to-show', () => window.show());
  window.on('closed', () => { window = null; app.quit(); });
  window.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:\/\//.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  window.webContents.on('will-navigate', (event, url) => { if (ready && !url.startsWith(window.serverOrigin + '/')) { event.preventDefault(); if (/^https?:\/\//.test(url)) shell.openExternal(url); } });
  window.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent('<html><body style="font:15px -apple-system;display:grid;place-items:center;height:100vh;background:#f8f8fa;color:#555"><div>Starting dsh…</div></body></html>'));
  const node = path.join(runtime, 'bin', 'node');
  const executable = path.join(runtime, 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'index.js');
  const bin = path.join(runtime, 'node_modules', '.bin', 'dsh');
  child = spawn(node, [bin, 'web', '--no-open', '--host', '127.0.0.1', '--port', '0'], { env: { ...process.env, PATH: path.join(runtime, 'bin') + ':' + (process.env.PATH || '/usr/bin:/bin') }, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let buffer = '', diagnostic = '';
  const onData = data => {
    const text = data.toString(); diagnostic = (diagnostic + text).slice(-6000); buffer = (buffer + text).slice(-12000);
    const match = buffer.match(/dsh web:\s*(http:\/\/127\.0\.0\.1:\d+\/\?token=[A-Za-z0-9_-]+)/);
    if (match && !ready && window) { ready = true; clearTimeout(timeout); window.serverOrigin = new URL(match[1]).origin; window.loadURL(match[1]); }
  };
  child.stdout.on('data', onData); child.stderr.on('data', onData);
  child.on('error', error => { if (!quitting) { dialog.showErrorBox('Could not start dsh', error.message); app.quit(); } });
  child.on('exit', (code) => { clearTimeout(timeout); if (!quitting) { dialog.showErrorBox('dsh stopped', `The background service stopped unexpectedly (code ${code}).\n\n${diagnostic.replace(/token=[A-Za-z0-9_-]+/g, 'token=[hidden]')}`); app.quit(); } });
  timeout = setTimeout(() => { if (!ready && !quitting) { dialog.showErrorBox('dsh could not start', 'The background service did not become ready. Please try opening the app again.'); app.quit(); } }, 60000);
}
ipcMain.on('dsh:start-dictation', (event) => {
  if (!window || event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame) return;
  try { if (new URL(event.senderFrame.url).origin !== window.serverOrigin) return; } catch { return; }
  Menu.sendActionToFirstResponder('startDictation:');
});
app.setName('dsh');
if (!app.requestSingleInstanceLock()) app.quit();
else { app.on('second-instance', () => { if (window) { if (window.isMinimized()) window.restore(); window.focus(); } }); app.whenReady().then(createWindow); }
app.on('before-quit', () => { quitting = true; clearTimeout(timeout); stopServer(); });
app.on('window-all-closed', () => app.quit());
