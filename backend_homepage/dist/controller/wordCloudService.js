"use strict";
// import axios from "axios";
// async function wordCloudService (arrayWord: any) {
//     let longText = "";
//     for(let i = 0;i < arrayWord.length; i++){
//         longText = longText + " " + arrayWord[i].answer
//     }
//     try{
//         const payload = {
//             word: longText
//         }
//         console.log("long text => ",payload)
//         const base64 = await axios.post("https://backend-hdt-wordcloud-zt27agut7a-as.a.run.app/api/wordcloud",payload);
//         if(payload){
//             return payload
//         }else{
//             return "word not found"
//         }
//     }catch(err){
//         console.log("connect string function word cloud API error =>", err)
//         return "word not found" 
//     }
// }
// export default wordCloudService
