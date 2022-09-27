const admindb = require('./admin_db')
require('dotenv').config()

let admin={
    email:process.env.email,
    pass:process.env.password
  }


module.exports={

    AuthAdmin:(req,res)=>{
        console.log(admin.email);
        if(admin.email==req.body.email && admin.pass==req.body.password){
            req.session.adminLoged=true;
            res.redirect('/admin/home')
        }
        else{
            req.session.Err='*Invalid Credentials'
            res.redirect('/admin')
        }
    },

    adminHome:(req,res)=>{
        admindb.clientData().then((data)=>{
            for(let i of data){
                for(let j of i.Article){
                    if(j.status=="Select Status"){
                        j.status="Not Selected"
                        
                        }
                        if(j.comment==null||j.status=="YES"){
                            j.comment='No Comments'
                        }
                    
                }
            }
            console.log(data);
            res.render('admin/home',{data})
        })
        
      },

      Logout:(req,res)=>{
        console.log("logoputtt");
        req.session.adminLoged=false;
        res.redirect('/admin')
      }

}