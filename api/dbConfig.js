const Sequelize = require('sequelize')
const mongoose = require('mongoose')

require('dotenv').config()
const sequelize = new Sequelize(process.env.DATABASE)

// sequelize.authenticate()
// .then(()=>{
//   console.log("connect DB success")
// })
// .catch(err=>{
//   console.log(err)
// })

const connectMongoDB = () => {
  mongoose.connect(process.env.DATABASE_MONGODB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 5000,
    useCreateIndex: true 
})
.then(msg => {
  console.log("Connect mongoDB success")
})
.catch(err => console.log(err)); 

mongoose.set('useFindAndModify', false);
}



module.exports = {
  sequelize,
  connectMongoDB
}