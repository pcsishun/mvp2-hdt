import jwt from "jsonwebtoken"

const token = process.env.SECRET_TOKEN || "oasdkf_)(*&@!_+#akodkasiodnidj+__)((*@!!osdf492384272340213--3402o4000---5002340291283===--++_)**&^%$$$%"
// console.log("token auth => ",token);

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
            // console.log("exp => ",decode.iat, ">=" ,decode.exp)
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
                status: 403,
                text: "unauthorized",
                data: err
            }
            res.send(payload);
        }
    }
}

export default verifyToken;