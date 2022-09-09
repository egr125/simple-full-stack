if( process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
require('dotenv').config();



const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

// Intializations
const app = express();
require('./database');

app.use(cors());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect, all
    res.setHeader("Access-Control-Allow-Origin", "*");

     // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

   // Request headers you wish to allow
   res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Settings
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(morgan("dev"));
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename(req, file, cb) {
        cb(null, new Date().getTime()+ path.extname(file.originalname));

    },

});
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Routes
app.use('/api/chords', require('./routes/chords'));


// static files
app.use(express.static(path.join(__dirname, "public")));
//Static Files, public library, files to send to the explorer
// uploads
app.use(express.static(path.join(__dirname, "public/uploads")));


// Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})

