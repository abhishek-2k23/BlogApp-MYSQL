import bcrypt from "bcrypt";
import { db } from "../Configuration/db.js"

//for register
export const register = (req,res) =>{
    //extracting the user data
    const {email,password,name} = req.body;

    //check if the email exist
    const q = "SELECT * FROM users WHERE email = (?) ";
    db.query(q,[email],(err,data) =>{
        if(err){
            // if any error occurs
            console.log("Error in user searching",err.message);
            return res.status(501).json("Error in user searching");
        }
        if(data.length) {
            //if data has length means user exist
            console.log("User is already registerd.")    
            return res.status(409).json({
                status : false,
                message : "You are registered already."
            });
        }
        
        //if User is not registered
        const q = "INSERT INTO users(`name`,`email`,`password`)VALUES (?)";

        //hash the password
        const hash = bcrypt.hashSync(password,10);

        //values to store on the users table
        const values = [name,email,hash];
        db.query(q,[values],(err,data) =>{
            if(err){
                //if any error occured.
                console.log("Error during user registration",err.message);
                return res.status(501).json({
                    status : false,
                    message : "User not registered."
                })
            }else{
                //ho gya ji user registered.
                console.log("User is registered.",data);
                return res.status(201).json({
                    status : true,
                    message : "User is registered."
                })
            }
        })
    }) 



}