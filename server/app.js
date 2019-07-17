const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const vacationsRouter = require('./controllers/vacation-controller.js');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('../client/build'));
app.use(fileUpload());

app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100,
        httpOnly: true,
        secure: false
    }
}));


app.use('/vacations',vacationsRouter);


const listen = () => new Promise((resolve, reject) => {
    app.listen(4000, err => {
        if(err) {
            return reject(err)
        }
        return resolve()
    });
});


const init = async() => {
    try{
        global.mysql = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'db_project'
        });
        await listen();
        console.log('Server Up, DB Ready');
    }
    catch (e) {
        console.log(e);
    }
};


init();


app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname,'../client/build', 'index.html'))
});


