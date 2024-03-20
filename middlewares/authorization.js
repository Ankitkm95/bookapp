const authorization = (userRole) => (req,res,next)=>{
    try {
        if(userRole === req.userRole){
            next();
        }else{
          return  res.send({"msg":"protected route"})
        }
    } catch (err) {
       return res.send({"msg":"sometthing went wrong.."})
    }
};

module.exports = {
    authorization
}