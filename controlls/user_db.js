const bcrypt = require('bcrypt')
const db =require('../config/connection')
const collection =require('../config/collections')
const ObjectId = require('mongodb').ObjectId

module.exports={

    userInfo:(userInfo)=>{
        return new Promise(async(res,rej)=>{
            let Article=[
                {
                    id:1,
                    status:"Select Status",
                    try_here:"https://charpstar.se/FullStackTest/Images/1.jpg",
                    comment:null
                },
                {
                    id:2,
                    status:"Select Status",
                    try_here:"https://charpstar.se/FullStackTest/Images/2.jpg",
                    comment:null
                },
                {
                    id:3,
                    status:"Select Status",
                    try_here:"https://charpstar.se/FullStackTest/Images/3.jpg",
                    comment:null
                }
            ]
            let Art=[
                {
                    id:1,
                    status:"Select Status",
                    try_here:"https://charpstar.se/FullStackTest/Images/4.jpeg",
                    comment:null
                },
                {
                    id:2,
                    status:"Select Status",
                    try_here:"https://charpstar.se/FullStackTest/Images/5.jpeg",
                    comment:null
                },
                {
                    id:3,
                    status:"Select Status",
                    try_here:"https://charpstar.se/FullStackTest/Images/6.jpeg",
                    comment:null
                }
            ]
            let dataInsert= await db.get().collection(collection.USERINFO).find().toArray()
            console.log(dataInsert);
            let insert=false;
            if(dataInsert[0]?.email){
                console.log("enter loop");
                insert=true;
            }
            userExist=await db.get().collection(collection.USERINFO).findOne({email:userInfo.email,})
            if(!userExist){
                userInfo.password = await bcrypt.hash(userInfo.password,10)
                if(!insert){
                    userInfo.Article=Article
                    db.get().collection(collection.USERINFO).insertOne(userInfo).then((response)=>{
                        res({exist:false})
                    })
                }
                else{
                    userInfo.Article=Art
                    db.get().collection(collection.USERINFO).insertOne(userInfo).then((response)=>{
                    res({exist:false})
                })
                }
                
            }
            else{
                res({exist:true})
            }
        })
    },

    AuthUser:(userData)=>{
        return new Promise(async(res,rej)=>{
            let userInfoRes={
                Exist:true
            }
            let user= await db.get().collection(collection.USERINFO).findOne({email:userData.email})
            console.log(user);
            if(user){
                bcrypt.compare(userData.password,user.password).then((verify)=>{
                    if(verify){
                        console.log("login success");
                        userInfoRes.user=user;
                        userInfoRes.status=true;
                        res(userInfoRes)
                    }
                    else{
                        console.log("invalid password");
                        userInfoRes.status=false;
                        res(userInfoRes)
                    }
                })
            }
            else{
                console.log("user not exist");
                userInfoRes.Exist=false;
                res(userInfoRes)
            }
        })
    },

    getArticleDb:(email)=>{
        return new Promise(async(res,rej)=>{
            let ArticleData=[]
            let data=await db.get().collection(collection.USERINFO).findOne({email:email})
            if(data){
                for(let i of data.Article){
                    ArticleData.push(i)
                }
                res(ArticleData)
            }
        })
    },

    SaveComment:(data,email,id,No)=>{
        let ID=parseInt(id)
        console.log(email);
        console.log(No);
        return new Promise(async(res,rej)=>{
           let a= await db.get().collection(collection.USERINFO).updateOne({email:email,"Article.id":ID},{$set:{"Article.$.comment":data.comment,"Article.$.status":No}})
           console.log(a);
            res()
        })
    },

    updateStatusYes:(id,email)=>{
        let ID=parseInt(id)
        return new Promise(async(res,rej)=>{
           let a=await db.get().collection(collection.USERINFO).updateOne({email:email,"Article.id":ID},{$set:{"Article.$.status":"YES"}})
            console.log(a);
            res()
        })
    }
}