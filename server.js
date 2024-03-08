const nodemailer = require('nodemailer');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');
const { emit } = require('process');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    // port:'4000',
    user: 'root',
    password: 'Sundar@03',
    database: 'task_1'
})

connection.connect(err => {
    if (err) throw err;
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })
    app.listen(PORT, () => {
        console.log(`currently running on ${PORT}`);
    })
    app.post('/User_reg', (req, res) => {
        const username = req.body.username;
        const gmail = req.body.email;
        const pass = req.body.password;
        connection.query('select User_mail from User_details where User_mail = ?', [gmail], (err, result) => {
            if (err) throw err;
            else {
                if (result.length == 0) {
                    connection.query('Insert into User_details values (?,?,?)', [username, gmail, pass], (err, RES) => {
                        if (err) throw err;
                        else {
                            res.json('SuccessFully Created');
                        }
                    })
                }
                else {
                    res.json('User alreaddy exists');
                }
            }
        })

    })
    app.post('/User_log', (req, res) => {
        // const username = req.body.username;
        const gmail = req.body.email;
        const pass = req.body.password;
        connection.query('select User_mail from User_details where User_mail = ?', [gmail], (err, result) => {
            if (err) throw err;
            else {
                if (result.length != 0) {
                    connection.query('select User_password from User_details where User_mail = ?', [gmail], (err, Res) => {
                        if (Res[0].User_password === pass) {
                            res.json('Login Successfully');
                        }
                        else {
                            res.json('Your Password is Incorrect');
                        }
                    })
                }
                else {
                    res.json('Please Signup with your mail first');
                }
            }
        })

    })
    app.post('/change_password',(req,res)=>{
        const pass = req.body.confirm_pass;
        const user_mail = req.body.email;
        connection.query('UPDATE User_details SET User_Password = ? WHERE User_mail = ?',[pass,user_mail],(err)=>{
            if(err) throw err;
            else{
                res.json('Password Changed Successfully');
            }
        })
    })
    app.post('/change_password_link', (req, res) => {
        const user_mail = req.body.email;
        
        connection.query('select User_mail from User_details where User_mail = ?', [user_mail], (err, result_1) => {
            if (err) throw err;
            
            else {
                if (result_1.length == 0) {
                    res.json('register the mail first');
                    console.log(user_mail,result_1);
                }
                else {


                    const OTP = Math.round(Math.random() * 1000000);
                    // console.log(user_mail)
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'sundarm9345@gmail.com',
                            pass: 'ibkc qwmb vtli oipf'
                        }

                    });
                    const maildetails = {
                        from: 'sundarm9345@gmail.com',
                        to: `${user_mail}`,
                        subject: 'OTP for Change password',
                        text: `Your OTP for  change password : ${OTP}`,
                    }
                    transporter.sendMail(maildetails, (err, info) => {
                        if (err) throw err;
                        else {
                            res.json(true);
                            connection.query('insert into OTP_Auth values (?,?) ',[user_mail,OTP])
                        }
                    })
                }
            }
        })
    })
    app.post('/OTP_check',(req,res)=>{
        const OTP = req.body.OTP;
        const mail = req.body.email;
        connection.query('select * from OTP_Auth where mail = ?',[mail],(err,result)=>{
            
            if((result[result.length-1].OTP) == OTP){
                res.json(true);
            }
            else{
                res.json('OTP is Incorrect');
            }
        })
    })
})


