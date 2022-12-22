import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const token:any = process.env.SECRET_TOKEN

const verifyToken = (req:any, res:any, next:any) => {
    const getToken = req.headers['access-token']
    if(getToken === undefined ||  getToken === null){
        const payload = {
            error: true,
            text: "unauthorized please login again."
        }
        res.send(payload);
    }else{
        try{
            const decode:any = jwt.verify(getToken,token);
            if(decode.iat >= decode.exp){
                const payload = {
                    status: 401,
                    text: "session expired."
                }
                res.send(payload);
            }else{
                const replyText = {
                    decode: decode,
                    token: getToken
                }
                req.authData =  replyText
                next();
            }
        }catch(err){
            const payload = {
                status: 401,
                text: "session expired."
            }
            res.send(payload);
        }
    }
}

module.exports = verifyToken;