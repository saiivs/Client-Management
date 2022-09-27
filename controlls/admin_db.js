const db = require('../config/connection')
const collection = require('../config/collections')

module.exports={

    clientData:()=>{
        console.log("clientdata");
        return new Promise(async(res,rej)=>{
          let client = await db.get().collection(collection.USERINFO).find().toArray()
          console.log(client);
          res(client)

        })
    }
}