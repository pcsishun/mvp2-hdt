import * as dotenv from 'dotenv'
dotenv.config({path:"../.env"})

function sentEnv() {
    const payload = {
        PORT: process.env.PORT || 2298,
        SECRET_TOKEN: process.env.SECRET_TOKEN || "oasdkf_)(*&@!_+#akodkasiodnidj+__)((*@!!osdf492384272340213--3402o4000---5002340291283===--++_)**&^%$$$%",
        KIND_USER_PROFILE: process.env.KIND || "userprofile",
        KIND_TENAN: process.env.KIND_TENAN || "",
        EXPIRES: process.env.EXPIRES || "7dprofiletenan"
    }
    return payload
}

export default sentEnv