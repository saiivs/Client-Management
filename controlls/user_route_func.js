const userdb=require('./user_db')

module.exports={
    registerPage:(req,res)=>{
        res.render('users/register',{ERR:req.session.ERR})
    },

    userInfodb:(req,res)=>{
       userdb.userInfo(req.body).then((response)=>{
        if(response.exist){
           req.session.ERR='This user already exist'
           res.redirect('/register') 
        }
        else{
            res.redirect('/')
        }
       })
    },

    Auth:(req,res)=>{
       userdb.AuthUser(req.body).then((response)=>{
        console.log('reached');
        if(response.status){
            req.session.logedIn=true;
            req.session.user=response.user;
            res.redirect('/home')
        }
        else{
            req.session.Error='*Invalid Credentials'
            res.redirect('/')
        }
       })
    },

    getArticle:async(req,res)=>{
        if(req.session.logedIn){
          let Array=await userdb.getArticleDb(req.session.user.email)
          let Status=false;
          if(req.session.user.firstName=="sai") {
            Status=true;
          }
          res.render('users/home',{name:req.session.user.firstName,Array,Status:Status})
        }
        
      },

      comment:(req,res)=>{
        console.log('server ajax res');
        let comment =req.body
        let id = req.params.id
        userdb.SaveComment(comment,req.session.user.email,id,req.body.status)
        res.json({status:true,comment:req.body.comment,id:id,userStatus:req.body.status})
      },

      updateYes:(req,res)=>{
        let id=req.params.id
        userdb.updateStatusYes(id,req.session.user.email)
        res.json({status:true,userStatus:"YES"})
      },

      logOut:(req,res)=>{
        req.session.logedIn=false;
        res.redirect('/')
      }

     
}