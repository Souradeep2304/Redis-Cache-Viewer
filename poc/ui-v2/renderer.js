'use strict';

const { ipcRenderer, remote } = require('electron');

const redis = require('redis');
const prompt = require('prompt-sync')();

const connect = document.getElementById('connect');

connect.addEventListener('click', function () {

    const temp=document.getElementById('cstring').value.split(':');
    
    const host=temp[0];
    const port=temp[1];
   
    global.client = redis.createClient(port,host);
    const list = document.createElement('ul');

    
    client.keys('*', function (err, keys) {
        const ul = document.createElement('ul');
        document.getElementById('keydis').innerHTML = ""; 
        document.getElementById('keydis').innerHTML = "<h2>Keys Present:</h2> ";
        document.getElementById('keydis').appendChild(ul);
        keys.forEach(function(key){
			const li = document.createElement('li');
			ul.appendChild(li);
			li.innerHTML += key;
		});
    });
    //ipcRenderer.send("connect", args);
});

const set = document.getElementById('set');

set.addEventListener('click', function () { 
    document.getElementById('keyerror').innerHTML = '';
    const value=document.getElementById('value').value;
    const key=document.getElementById('key').value;
    client.set(key, value, function (err, result) {
        console.log(result);
    });

    client.keys('*', function (err, keys) {
        const ul = document.createElement('ul');
        document.getElementById('keydis').innerHTML = ""; 
        document.getElementById('keydis').innerHTML = "<h2>Keys Present:</h2> ";


        document.getElementById('keydis').appendChild(ul);
        keys.forEach(function(key){
			const li = document.createElement('li');
			ul.appendChild(li);
			li.innerHTML += key;
		});
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
            console.log('Key:', key, ' Value:', result)
            document.getElementById('keyerror').innerHTML = '';
            document.getElementById('value').value = result;
        } else {
            console.log('Key:',key, 'does not exist in Redis Cache')
            document.getElementById('keyerror').innerHTML = 'Key Not Found!';

      
            
        }
     
    });

});

document.getElementById("Close").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow()
    window.close()
})



