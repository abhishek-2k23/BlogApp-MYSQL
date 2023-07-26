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

//for login
export const login = (req,res) =>{
    try{  
        const {email,password} = req.body;

        //check the full details
        if(!email || !password){
            return res.status(402).json({
            status : false,
            message : "Fill all the details",
            })
        }

        //check for the existing user
        const q = "SELECT * from users WHERE email = (?)";
        db.query(q,[email],async (err,data) =>{
            if(err){
                return res.status(502).json({
                    status : false,
                    message : "server error during DB query",
                })
            }
            if(!data.length){
                return res.status(404).json({
                    status : false,
                    message : "No account with this email",
                    data : data,
                })
            }
            else{
                if( bcrypt.compare(data[0].password,password)){
                    console.log("Logged in ");
                    return res.status(200).json({
                        status : true,
                        message : "logged in",
                    })
                }else{
                    console.log("password not matched");
                    return res.status(401).json({
                        status : false,
                        message : "password not matched",
                    })
                }
            }
        })
    }catch(err){
        console.log("Error during login : " ,err.message);
        return res.status(500).json({
            status : false,
            message : "server error during login",
        })
    }
}