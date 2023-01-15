import app from "./router/app"
import sentEnv from "./env_mangement"

const envData = sentEnv();
app.listen(envData.port, () => {
    // console.log("envData  => ", envData)
    console.log(`service data-sci listen on port ${envData.port}`)
})
