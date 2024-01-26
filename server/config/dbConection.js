const mongoose=require('mongoose');

 const connectDb = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/ecotrade');
    } catch (error) {
      console.log(error.message)
    }
  }

module.exports=connectDb;