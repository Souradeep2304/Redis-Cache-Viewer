var redis = require('redis');
const prompt = require('prompt-sync')();

// by default uses 127.0.0.1 and 6379 hostname and port
var client = redis.createClient();

client.on('connect', () => {
    console.log(`Connected to Redis`);
})

client.on('error', err => {
    console.log(`Error: ${err}`);
})


console.log("Set Data to Redis Cache")
var key = prompt("Enter Key: ")
var value = prompt("Enter Value: ")

client.set(key, value, function (err, result) {
    console.log(result)
});

console.log("Get Data from Redis Cache")
var key = prompt("Enter Key: ")

client.get(key, function (err, result) {
    if (err) {
        console.log(err)
    }
    if (result) {
        console.log('Key:',key,' Value:', result)
    } else {
        console.log('Key:',key, 'does not exist in Redis Cache')
    }
});
