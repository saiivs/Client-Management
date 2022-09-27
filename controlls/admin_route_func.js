const admindb = require('./admin_db')

let admin={
    email:"admin@gmail.com",
    pass:"12345678"
  }


module.exports={

    AuthAdmin:(req,res)=>{
        console.log('admin');
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
            console.log(data[0].Article);
            
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
        req.session.adminloged=false;
        res.redirect('/admin')
      }

}