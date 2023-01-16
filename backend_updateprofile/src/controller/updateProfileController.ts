import {Datastore} from "@google-cloud/datastore"

const datastore = new Datastore();

async function updateProfileController(req:any, res:any) {
    res.send("OK")
}

export default updateProfileController