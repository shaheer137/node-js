const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://ridaa3625:ridafaisal13@cluster0.g9kgafu.mongodb.net/project'

mongoose.connect(mongoURI)

module.exports = mongoose