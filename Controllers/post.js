import { db } from "../Configuration/db.js";
import jwt from "jsonwebtoken";

//TO add a new post
export const addPost = (req,res) =>{
    try{
    //extract the token
    const token = req.cookies.userToken;

    // extract data from the body
    const {title,desc,img,cat,date} = req.body;

    //check all the details
    if(!title || !desc || !cat || !date){
        return res.status(405).json({
            status : false,
            message : "Not all the details"
        })
    }

    //if token is missing
    if(!token){
        return res.status(401).json("Token Missing!");
    }

    //if token available then verigy with token name and SecretKey passed
    jwt.verify(token,"secretKey",(err,userInfo) =>{
        if(err) return res.status(401).json("Token is invalid!");
        const q = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)"

        const value = [title,desc,img,cat,date,userInfo.id];

        db.query(q,[value],(err,data) =>{
            if(err) return res.status(500).json("Error in post submission : ",err.message);

            console.log("New Post Created...");
            return res.status(200).json({
                status : true,
                message : "Post created",
            });
        })
    })
    }catch(err){
        return res.status(500).json("Internal Server Error : ",err.message);
    }
}

// TO update the post
export const updatePost = (req,res) =>{
    try{
    //extract the token
    const token = req.cookies.userToken;

    //if token is missing
    if(!token){
        return res.status(401).json("Token Missing!");
    }

    // extract data from the body
    const {title,desc,img,cat} = req.body;

    //check all the details
    if(!title || !desc || !cat || !req.params.id){

        console.log("not all the details");
        return res.status(405).json({
            status : false,
            message : "Not all the details"
        })
    }

    //if token available then verigy with token name and SecretKey passed
    jwt.verify(token,"secretKey",(err,userInfo) =>{
        console.log(img)
        if(err) return res.status(401).json("Token is invalid!");
        
        if(img === " "){
                
            const q = "UPDATE posts SET `title`=?,`desc`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
            const value = [title,desc,cat];
            db.query(q,[...value,req.params.id,userInfo.id],(err,data) =>{
                if(err){
                    console.log("Error in mysql: ",err.message);
                    return res.status(500).json({
                        staus : false,
                        message : "mysql error : "+err.message
                    });
                } 
    
                console.log("Post Updated.");
                return res.status(200).json({
                    status : true,
                    message : "updated",
                });
            })
        }else{
            const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
        
            const value = [title,desc,img,cat];
            db.query(q,[...value,req.params.id,userInfo.id],(err,data) =>{
            if(err){
                console.log("Error in mysql: ",err.message);
                return res.status(500).json({
                    staus : false,
                    message : "mysql error : "+err.message
                });
            } 

            console.log("Post Updated.");
            return res.status(200).json({
                status : true,
                message : "updated",
            });
        })}
    })
    }catch(err){
        return res.status(500).json({
            status : false,
            message : "server Error : "+err.message,
        });
    }
}

//To fetch all the posts for the Home Page
export const getPosts = (req,res) =>{
    try{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = (?)" : "SELECT * FROM posts ";
    db.query(q,[req.query.cat],(err,data) =>{
        if(err){
         return   res.status(401).json("Error during fetching posts")
        }else{
            console.log("All posts fetched Successfully!")
            return res.status(200).json(data);
        }
    })
    }catch(Err){
        res.status(401).json("Sever Error during fetching posts")
    
    }
}

//TO fetch the single Post for the Single Page
export const getPost = (req,res) =>{

    // post id
    const postId =  req.params.id;

    // query for fetching from both the tables by JOINing them
    const q ="SELECT p.id, `name`, `title`, `desc`,p.uid, p.img as postImg, u.image as userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q,[postId],(err,data) =>{
        if(err) return res.status(400).json(err);
        console.log("Post fetched for the single post")
        return (res.status(200).json(data));
    })
}

//TO delelte the post 
export const deletePost = (req,res) =>{

    try{
        
    //extract the token
    const token = req.cookies.userToken;

    //if token is missing
    if(!token){
        return res.status(401).json("Token Missing!");
    }

    //if token available then verigy with token name and SecretKey passed
    jwt.verify(token,"secretKey",(err,userInfo) =>{
        if(err) return res.status(401).json("Token is invalid!");

        // if token verified
        const q = "DELETE FROM posts WHERE `id` = (?) AND `uid` = (?)";

        const postId = req.params.id;
        const uId = userInfo.id; //we passed id during token creation so userInfo have the uid

        db.query(q,[postId,uId],(err,data) =>{
            if(err) {return res.status(500).json("You can delete only your post..");}
            console.log("deleted Successfully",uId,data);
            return (
                res.status(200).json("Successfully Deleted.."))
        })
    })
    }catch(err){
        console.log("Error in deleting : ",err.message);
    }
}
