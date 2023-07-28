import bcrypt from "bcrypt";
import { db } from "../Configuration/db.js"
import jwt from "jsonwebtoken";

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
                if(await bcrypt.compare(password,data[0].password)){
                    let token = jwt.sign({id:data[0].id},"secretKey");
                    console.log("Logged in ");
                    const {password,...other} = data[0];
                    return res.cookie("userToken",token,{httpOnly:true}).status(200).json({
                         other
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

//for logout
export const logout = (req,res) =>{
    res.clearCookie("userToken",{
        sameSite : true,
        secure : true,
    }).status(200).json("User has been logged out.");
}   