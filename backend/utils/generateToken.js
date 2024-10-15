import jwt from 'jsonwebtoken';

export const generateToken = (res,userID) =>{
    const token = jwt.sign({userId:userID},process.env.JWT_SECRET
        ,{
            expiresIn: '30d'
        });

    //set JWT as HTTP-Only cookie
    res.cookie('jwt', token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge:30 * 24 * 60 * 1000 //30days
    })

}