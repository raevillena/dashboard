const connectionString = {
    host: "192.168.2.254", username: 'rae', password: '@raepasswd', port: 9001, clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
}
module.exports = {
    connectionString: connectionString
}