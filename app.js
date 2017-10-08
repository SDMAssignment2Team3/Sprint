var express = require('express'); 
var app = express(); 

var mongoose = require('mongoose');
require('./connect.js');
require('./model.js');
var User = mongoose.model('u2');  //User为model name
mongoose.Promise = global.Promise;  //
//Email setting

//Email//test=====================================================
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    
    service: '163',
    auth: {
        user: 'serlerteam3@163.com',

        pass: 'team03'
    }
});
//get login page
app.get('/',function (req,res) {
    res.sendfile(__dirname + "/" + "Login.html" );
})

//login logic
app.get('/Login',function (req,res) {
    var name=req.query.name;
    var pwd=req.query.pwd;
    User.findOne({name:name,pwd:pwd},function (error,result) {
        if (result==null)
        {
            res.sendfile(__dirname + "/" + "no.html" );
        }else
        {
            res.sendfile(__dirname + "/" + "Moderator.html" );
        }
    })
})

//Get register page
app.get('/Register.html',function (req,res) {
    res.sendfile(__dirname+"/"+"Register.html");
})


//Register page logic
app.get('/Register',function (req,res) {   
    var email = req.query.email;

 //email

    var mailOptions = {
        from: 'serlerteam3@163.com', 
        to: email,
        subject: 'Hello sir', 
        text: 'Click to finish register: http://127.0.0.1:3000/Emailcheck.html', 
        html: '<b>' + 'Click to finish register: http://127.0.0.1:3000/Emailcheck.html' + '</b>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
    //email finish*/
    res.send("Please check your email!");
})

//email cleck page
app.get('/Emailcheck.html',function (req,res) {
    res.sendfile(__dirname+"/"+"Emailcheck.html");
})

//email check logic
app.get('/Emailcheck',function (req,res) {
    var name=req.query.name;
    var pwd=req.query.pwd;   
    var user=new User(
        {name:name,
            pwd:pwd
        }
    )
    user.save(function (err,result) {
        if (result==null) {
            res.sendfile(__dirname + "/" + "no.html" );
        } else {
            res.sendfile(__dirname + "/" + "Moderator.html" );
        }
    });

})


//read forgetpassword
app.get('/forgetpassword.html',function (req,res) {
    res.sendfile(__dirname+"/"+"forgetpassword.html");
})
//forgetpassword logic

app.get('/forgetpassword',function (req,res) {
    var name=req.query.name;
    User.findOne({name:name},function (error,result) {
        if (result==null)
        {
            res.sendfile(__dirname + "/" + "no.html" );
        }else
        {
            var res = JSON.stringify(result);
            var resultarr = res.split(',');
            var pwdjson = resultarr[2];
            var pwdarr = pwdjson.split(':');
            var pwd = pwdarr[1];
            //email
            var mailOptions = {
                from: 'serlerteam3@163.com', 
                to: '544971045@qq.com', 
                subject: 'Hello sir', 
                text: 'Your password'+pwd, 
                html: '<b>Your password'+ pwd +'</b>'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);

            });
            //email finish*/
        }
    })
})
//load moderstor
app.get('/Moderstor.html',function (req,res) {
    res.sendfile(__dirname+"/"+"Moderstor.html");
})

//moderstor logic
app.get('/Moderstor',function(req,res){

	var a = req.query.a;
    var res = JSON.stringify(a);
    var s = 'Sorry, your article is rejected, reason: ';

    if(res == undefined)
    {
        s = 'Congratulations, your article is accepted!';
    }
    else
    {
        s = s+res;
    }

    //email
    var mailOptions = {
                from: 'serlerteam3@163.com', 
                to: '544971045@qq.com',//'544971045@qq.com', 
                subject: 'Hello sir', 
                text: 'Hi sir, '+s, 
                html: '<b>Hi sir, '+ s +'</b>'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);

            });

    //email finish
})


var server = app.listen(3000,function(){ 
console.log('server connect'); 
}) 
