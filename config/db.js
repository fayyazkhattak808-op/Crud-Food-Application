const mongoose = require ( "mongoose" )

//function mongodb
const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL )
        console.log(`CONNECTION TO DATABASE ${mongoose.connection.host}`)
    } catch (error) {
        console.log("DB Error",error)
    }
}
module.exports = ConnectDB;