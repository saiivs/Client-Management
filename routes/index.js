var express = require('express');
var router = express.Router();
const userRoute=require('../controlls/user_route_func')

/* GET home page. */  


// middleware
function authenticate(req,res,next){
  if(req.session.logedIn){
    console.log(req.session.logedIn); 
    res.redirect('/home')
  }
  else{
   next()
  }
}

function authenticate2(req,res,next){
  if(req.session.logedIn){
    next()
  }
  else{
    res.redirect('/')
  }
}

router.get('/',authenticate,function(req, res, next) {
  res.render('users/userLogin', { title: 'Client Management System',ERR:req.session.Error });
  req.session.Error="";
});

router.get('/register',userRoute.registerPage)

router.post('/registerInfo',userRoute.userInfodb)

router.get('/home',authenticate2,userRoute.getArticle)

router.post('/userAuth',userRoute.Auth)

router.post('/comment/:id',userRoute.comment)

router.post('/YesUpdate/:id',userRoute.updateYes)

router.get('/logout',userRoute.logOut)





module.exports = router;
