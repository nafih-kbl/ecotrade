const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        index:true,
    },
    firstName:{
        type:String,
        required:true,
    },
      lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
    },
    isblocked:{
        type:Boolean,
        default:false,
    },
    wishList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
}],
    refreshToken:{
        type:String
    },
    usetAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addresses',
    },
    userRole:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'roles'
    },
},
{
    timestamps:true
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next()
    }
   
  
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt);
  });

  userSchema.methods.isPasswordMatched=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
module.exports = mongoose.model('User', userSchema);