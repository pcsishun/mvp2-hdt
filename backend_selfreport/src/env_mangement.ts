import * as dotenv from 'dotenv'
dotenv.config({path:"../.env"})

function sentEnv() {
    const payload = {
        port: process.env.PORT,
        secretToken: process.env.SECRET_TOKEN,
        kind: process.env.KIND
    }
    return payload
}

export default sentEnv