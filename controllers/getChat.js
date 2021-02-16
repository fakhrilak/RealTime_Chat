const {findAll} = require("./configmongo")

exports.getChat=async(data)=>{
    const result = await findAll("chat_app","private",{Users:data})
    console.log(result)
    return result
}