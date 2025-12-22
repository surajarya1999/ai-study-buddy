const mongoose = require('mongoose');

const connectDB = async () => {
    return mongoose.connect(process.env.MONGO_live_URl)
    // return mongoose.connect(local_url)

    .then(()=>{
        console.log('Connected to the database');
    }).catch((error)=>{
        console.log(error)
    })

}
module.exports = connectDB;