import app from "./router/app"
import dotenv from "dotenv"
dotenv.config({path:"../.env"})


const port = process.env.PORT || 3154

app.listen(port, () => {
    console.log(`service homepage listen on port ${port}`)
})

