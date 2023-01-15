import app from "./router/app"
import dotenv from 'dotenv'

dotenv.config({path:"../.env"});
const port = process.env.PORT || 2298

app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})

