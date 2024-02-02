import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO);
const cryptoSchema = new mongoose.Schema({
    // name, last, buy, Sell, volume, base_unit 
    
name: String,
last:String,
buy:String,
sell:String,
volume:String,
base_unit:String
    
    
});

 const Crypto = mongoose.model("crypto", cryptoSchema)

 export default  Crypto;