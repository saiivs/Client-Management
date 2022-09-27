var express = require('express');
var router = express.Router();
const adminRouter = require('../controlls/admin_route_func')

// admin credentials
let admin={
  email:"admin@gmail.com",
  pass:"12345678"
}

// middleWare

function authenticate(req,res,next){
    if(req.session.adminLoged){
      res.redirect('/admin/home')
    }
    else{
      next()
    }
}

function auth(req,res,next){
  if(req.session.adminLoged){
    next()
  }
  else{
    res.redirect('/admin')
   
  }
}

/* GET users listing. */
router.get('/',authenticate,function(req, res, next) {
  res.render('admin/admin_login')
});

router.post('/loginUSer',adminRouter.AuthAdmin)

router.get('/home',auth,adminRouter.adminHome)

router.get('/logOut',adminRouter.Logout)



module.exports = router;
