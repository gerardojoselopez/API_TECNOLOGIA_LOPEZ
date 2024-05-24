//dependencias//
const express = require ("express");
const { get } = require("mongoose");
const multer = require ("multer"); 
const path = require ("path");
const morgan = require("morgan");
const ejs = require ("ejs"); 
const uuid = require("uuid");
const result = uuid.v4(); 
const { format } = require('timeago.js'); 
const { v4: uuidv4 } = require('uuid');


//initializations
const app = express();
require ("./database");


//motor de vistas//
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');


//puerto//
app.set("port", process.env.PORT || 4000);


//middelwares, save image// 
app.use(morgan("dev")); 
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage:storage}).single('image'));


//global variables//
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

//Rutas//
app.use(require("./routes/index"));






//static files// 
app.use(express.static(path.join(__dirname, "./public")));


//star the server//
app.listen(app.get("port"), () => {
    console.log("SERVER IN LIVE");
});