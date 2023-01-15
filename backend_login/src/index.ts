import app from "./router/app"
import sentEnv from "./env_mangement"

const envData = sentEnv();
const port = envData.PORT

app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})

