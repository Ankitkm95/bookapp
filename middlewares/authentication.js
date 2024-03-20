const jwt = require("jsonwebtoken");
const { UserModel } = require("../modals/user.model");
require('dotenv').config();


const authenticate = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, process.env.SECRET);
        if(decoded){
            console.log(decoded);
            const userID = decoded.userID
            // req.body.userID = userID
            const user = await UserModel.findById(userID);
            if(!user){
                return res.send({"msg":"login failed"});
            }
            req.userRole = user.isAdmin;
            
            next();
        }
        else{
            res.send({"msg":"loing failed"});
        }  
    }
    else{
        res.send({"msg":"login failed"});
    }
}


module.exports = {authenticate}