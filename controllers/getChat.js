const {findAll} = require("./configmongo")

exports.getChat=async(data)=>{
<<<<<<< HEAD
    const private = await findAll("chat_app","private",{Users:data})
    const grup = await findAll("chat_app","grup",{Users:data})
    return [...private,...grup]
=======
    const result = await findAll("chat_app","private",{Users:data})
    console.log(result)
    return result
>>>>>>> 8437307050c8b0f815829875e95691de7ff5540f
}