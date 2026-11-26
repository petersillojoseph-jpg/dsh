const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('dshDictation', Object.freeze({ start: () => ipcRenderer.send('dsh:start-dictation') }));
