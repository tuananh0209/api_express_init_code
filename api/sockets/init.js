const option = {
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Access-Control-Allow-Origin:*",'Access-Control-Allow-Methods:HEAD, GET, POST, PUT, PATCH, DELETE' ],
    credentials: true
  }
}

const socket = require('socket.io')

module.exports = socket