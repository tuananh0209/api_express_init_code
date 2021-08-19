const FAQModel = require('../models/FAQ')

module.exports.getList = async function(req, res)
{
    var FAQ = await FAQModel.findAll({limit: 10})
    res.send(FAQ)
}

module.exports.creatList = async function(req, res)
{
    const question = req.body.question
    const answer = req.body.answer

    FAQModel.create({answer: answer , question: question})
    // res.status(200)
    res.send("")
}  