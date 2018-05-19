var client;
module.exports = {
    start(){
        var WebSocketServer = require('ws').Server,
            wss = new WebSocketServer({ port: 8181 });
        wss.on('connection', function (ws) {
            client = ws;
        });
    },
    notify(){
        try{
            client.send(JSON.stringify({type:"css"}));
        }catch (e) {

        }
    }
}