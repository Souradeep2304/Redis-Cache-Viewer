'use strict';
function showAlert() {
    alert ("Key Not Present");
  }
const { ipcRenderer, remote } = require('electron');

const redis = require('redis');
const prompt = require('prompt-sync')();

const connect = document.getElementById('connect');

connect.addEventListener('click', function () {

    const temp=document.getElementById('cstring').value.split(':');
    
    const host=temp[0];
    const port=temp[1];
   
    global.client = redis.createClient(port,host);
    
    //ipcRenderer.send("connect", args);
});

const set = document.getElementById('set');

set.addEventListener('click', function () { 
    
    const value=document.getElementById('value').value;
    const key=document.getElementById('key').value;
    client.set(key, value, function (err, result) {
        console.log(result);
    });
});

const get = document.getElementById('get');

get.addEventListener('click', function () {
    const key=document.getElementById('key').value;

    client.get(key, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log('Key:',key,' Value:', result)
            document.getElementById('value').value = result;
        } else {
            console.log('Key:',key, 'does not exist in Redis Cache')
           showAlert();
      
            
        }
     
    });

});

document.getElementById("Close").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow()
    window.close()
})



