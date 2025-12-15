const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email : {type:String, require:true, unique:true},
    password: {type:String, requ}
})