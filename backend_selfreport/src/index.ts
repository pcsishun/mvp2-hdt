import * as dotenv from 'dotenv'
import app from "./router/app"
dotenv.config({path:"../.env"})

const port = process.env.PORT || 3396
app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})
