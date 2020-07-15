const connectionString = {
    host: "nberic.org", username: 'rae', password: '@raepasswd', port: 9001, clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
}
module.exports = {
    connectionString: connectionString
}