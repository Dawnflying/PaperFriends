/**
 * Created by xiaofei on 11/2/2015.
 */

var net = require('net');
var chatserver = net.createServer();
chatserver.on('connection',function(client){
    client.write('hi!\n');
    client.write('bye\n');
    client.end();
})

chatserver.listen(9000);