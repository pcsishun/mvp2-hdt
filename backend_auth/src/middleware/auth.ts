import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path:"../../.env"})

const token:any = process.env.SECRET_TOKEN || "oasdkf_)(*&@!_+#akodkasiodnidj+__)((*@!!osdf492384272340213--3402o4000---5002340291283===--++_)**&^%$$$%"

const verifyToken = (req:any, res:any, next:any) => {
    const getToken = req.headers['access-token']
    if(getToken === undefined ||  getToken === null){
        const payload = {
            status: 403,
            text: "unauthorized"
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
                    status: 200
                }
                req.authData =  replyText
                next();
            }
        }catch(err){
            const payload = {
                status: 403,
                text: "unauthorized",
                data: err
            }
            res.send(payload);
        }
    }
}

export default verifyToken;