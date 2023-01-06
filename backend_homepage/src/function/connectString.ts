import axios from "axios";

export default async function connectString (arrayWord: any) {
    let longText = "";
    for(let i = 0;i < arrayWord.length; i++){
        longText = longText.concat(" ", arrayWord[i].word)
    }

    try{
        const payload = {
            word: longText
        }
        const base64 = await axios.post("--",payload);
        if(base64){
            return base64
        }else{
            return "word not found"
        }
    }catch(err){
        console.log("connect string function word cloud API error =>", err)
        return "word not found" 
    }
}