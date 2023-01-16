import app from "./router/app"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 2287

app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})

