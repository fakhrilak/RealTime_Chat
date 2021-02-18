const {findAll} = require("./configmongo")

exports.getChat=async(data)=>{
    const private = await findAll("chat_app","private",{Users:data})
    const grup = await findAll("chat_app","grup",{Users:data})
    return [...private,...grup]
}