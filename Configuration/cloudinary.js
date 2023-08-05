import cloudinary from 'cloudinary.v2';
import dotenv from 'dotenv';
dotenv.config();

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
    }catch(err){
        console.log("ERROR in cloudinary config : ",err.message);
    }
}