const {UserModel} = require('../models/user')
const bcrcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

module.exports.register = async function(req, res){
    const {name, email, phone, password } = req.body

    const passwordEncode = await bcrcrypt.hash(password, 5)

    const User = await UserModel.create({
        name: name,
        email: email,
        phone: phone,
        password: passwordEncode
    }).catch(e => {
        console.log(e)
        res.status(500).send()
        return
    })

    const token = await jsonwebtoken.sign(
        {email: email, name: name, userId: User._id },
        process.env.TOKEN
        )
    User._doc['token'] = token
    
    res.status(200).send(JSON.stringify(User))
}

module.exports.login = async function(req, res){
    const {email , password} = req.body

    var User = await UserModel.findOne({
        email: email
    }).catch(() => {
        res.status(500).send()
        return
    })

    if (!User) {
        res.send("User not exist.")
        return
    }

    const validPassword =  bcrcrypt.compareSync(password, User.password)
    if (!validPassword) {
        res.send("Password not correct.")
        return
    }

    const token = jsonwebtoken.sign(
        {
            email: User.email,
            name : User.name,
            userId: User._id
        },
        process.env.TOKEN
    )
    User._doc['token'] = token
    res.send(JSON.stringify(User))
}