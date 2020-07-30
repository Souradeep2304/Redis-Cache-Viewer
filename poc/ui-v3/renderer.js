'use strict';

const { ipcRenderer, remote } = require('electron');

const redis = require('redis');
const prompt = require('prompt-sync')();

const connect = document.getElementById('connect');
document.getElementById("closed").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow()
    window.close()
});



connect.addEventListener('click', function () {

    const temp=document.getElementById('cstring').value.split(':');
    
    const host=temp[0];
    const port=temp[1];
   
    global.client = redis.createClient(port,host);
    const ul = document.getElementById("ul")

    
    client.keys('*', function (err, keys) {
        const ul = document.getElementById("ul")
        document.getElementById('ul').innerHTML = ""; 
        document.getElementById('keydis').appendChild(ul);
        keys.forEach(function(key){
            const li = document.createElement('li');
            li.setAttribute("id", "listkey");
            li.setAttribute("value", key);
            li.setAttribute("onmousedown", "getvalue(this)");
			ul.appendChild(li);
			li.innerHTML += key;
		});
    });
    //ipcRenderer.send("connect", args);
});

const set = document.getElementById('set');

set.addEventListener('click', function () { 
    document.getElementById('value').value ='';
    const value=document.getElementById('valueset').value;
    const key=document.getElementById('keyset').value;
    client.set(key, value, function (err, result) {
        console.log(result);
    });

    client.keys('*', function (err, keys) {
        const ul = document.getElementById("ul")
        document.getElementById('ul').innerHTML = ""; 
        document.getElementById('keydis').appendChild(ul);
        keys.forEach(function(key){
			const li = document.createElement('li');
            li.setAttribute("id", "listkey");
            li.setAttribute("value", key);
            li.setAttribute("onmousedown", "getvalue(this)");
            ul.appendChild(li);
			li.innerHTML += key;
		});
    });
});

//const get = document.getElementById('listkey');

function getvalue(elm) {
    const key=elm.getAttribute('value');

    client.get(key, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log('Key:', key, ' Value:', result)
            
            document.getElementById('value').value = result;
        } else {
            console.log('Key:',key, 'does not exist in Redis Cache')
          

      
            
        }
     
    });

}



