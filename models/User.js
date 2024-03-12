const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
email:{
    type:String,
    require:true,
    unique:true,
    lowercase:true,
},
password:{
    type:String,
    required:true
}
})
module.exports = mongoose.model('user',userSchema)