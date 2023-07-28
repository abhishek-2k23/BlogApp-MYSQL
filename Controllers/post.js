import { db } from "../Configuration/db.js";
export const addPost = (req,res) =>{

}
export const getPosts = (req,res) =>{
    try{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = (?)" : "SELECT * FROM posts ";
    db.query(q,[req.query.cat],(err,data) =>{
        if(err){
         return   res.status(401).json("Error during fetching posts")
        }else{
            console.log("post fetched : ",data)
            return res.status(200).json(data);
        }
    })
    }catch(Err){
        res.status(401).json("Sever Error during fetching posts")
    
    }
}
export const getPost = (req,res) =>{
    res.send("From the controller");
}
export const deletePost = (req,res) =>{
    res.send("From the controller");
}
export const updatePost = (req,res) =>{
    res.send("From the controller");
}