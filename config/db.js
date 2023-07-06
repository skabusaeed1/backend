const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://shaikhabusaeed1:Abusaeed1@cluster0.uiljckg.mongodb.net/evaluation")

module.exports = {connection}