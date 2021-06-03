module.exports = (req , res , next)=>{
req.UserData.data.type == "teacher" ? next() : res.status(401).json({error : true , message : "Sorry Make Sure You Have A Teacher Account And Being The Owner Of This School To Be Able To Edit It" , date : []});
};