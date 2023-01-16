async function replyController(req:any, res:any) {
    const {status} = req.authData
    res.send(status)
}
export default replyController